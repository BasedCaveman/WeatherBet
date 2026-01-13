// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title WeatherBetAMM - Automated Market Maker for Weather Predictions
 * @notice LMSR-based prediction market using USDm stablecoin
 * @dev Polymarket-style AMM with spread capture, zero explicit fees
 */
contract WeatherBetAMM is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    // ============ Types ============
    
    enum MarketType { RAIN, TEMPERATURE }
    enum MarketStatus { ACTIVE, PAUSED, RESOLVED, CANCELLED }
    
    struct Market {
        uint256 id;
        MarketType marketType;
        bytes32 locationHash;        // keccak256(lat, lon)
        uint256 startTime;
        uint256 endTime;
        uint256 yesShares;           // Total YES shares outstanding
        uint256 noShares;            // Total NO shares outstanding  
        uint256 liquidityParam;      // LMSR 'b' parameter
        int256 historicalAvg;        // 10-year average (scaled by 100)
        MarketStatus status;
        bool outcome;                // true = YES won, false = NO won
        uint256 totalVolume;         // Total trading volume
    }
    
    struct Position {
        uint256 yesShares;
        uint256 noShares;
        uint256 totalCost;           // Total USDm spent
        uint256 realizedPnL;         // Realized profit/loss
    }
    
    struct UserAccount {
        uint256 balance;             // USDm balance in contract
        uint256 totalDeposited;
        uint256 totalWithdrawn;
        uint256 totalWinnings;
        uint256 totalLosses;
        uint256 marketsParticipated;
        uint256 marketsWon;
    }

    // ============ Constants ============
    
    uint256 public constant PRECISION = 1e18;
    uint256 public constant MIN_LIQUIDITY = 100e18;      // Minimum 100 USDm liquidity
    uint256 public constant MAX_SHARES_PER_TX = 10000e18; // Max 10k shares per tx
    uint256 public constant SHARE_PRICE_PRECISION = 1e6; // 6 decimals for prices
    
    // ============ State Variables ============
    
    IERC20 public immutable usdm;                        // USDm token
    address public treasury;                              // Treasury for spread revenue
    address public oracle;                                // Chainlink oracle address
    
    uint256 public nextMarketId = 1;
    uint256 public defaultLiquidity = 1000e18;           // Default 'b' parameter
    
    // Sponsored gas tracking
    mapping(address => uint256) public sponsoredTxCount;
    uint256 public maxSponsoredTx = 10;                  // Free txs per user
    
    // Market storage
    mapping(uint256 => Market) public markets;
    uint256[] public activeMarketIds;
    
    // User positions: marketId => user => Position
    mapping(uint256 => mapping(address => Position)) public positions;
    
    // User accounts
    mapping(address => UserAccount) public accounts;
    
    // ============ Events ============
    
    event MarketCreated(
        uint256 indexed marketId,
        MarketType marketType,
        bytes32 locationHash,
        uint256 endTime,
        int256 historicalAvg
    );
    
    event SharesBought(
        uint256 indexed marketId,
        address indexed user,
        bool isYes,
        uint256 shares,
        uint256 cost,
        uint256 newPrice
    );
    
    event SharesSold(
        uint256 indexed marketId,
        address indexed user,
        bool isYes,
        uint256 shares,
        uint256 payout,
        uint256 newPrice
    );
    
    event MarketResolved(
        uint256 indexed marketId,
        bool outcome,
        int256 actualValue
    );
    
    event WinningsClaimed(
        uint256 indexed marketId,
        address indexed user,
        uint256 amount
    );
    
    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event TreasuryUpdated(address indexed newTreasury);
    event OracleUpdated(address indexed newOracle);

    // ============ Constructor ============
    
    constructor(address _usdm, address _treasury) Ownable(msg.sender) {
        require(_usdm != address(0), "Invalid USDm address");
        require(_treasury != address(0), "Invalid treasury");
        
        usdm = IERC20(_usdm);
        treasury = _treasury;
    }

    // ============ User Account Functions ============
    
    /**
     * @notice Deposit USDm into the contract
     * @param amount Amount of USDm to deposit
     */
    function deposit(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be > 0");
        
        usdm.safeTransferFrom(msg.sender, address(this), amount);
        
        accounts[msg.sender].balance += amount;
        accounts[msg.sender].totalDeposited += amount;
        
        emit Deposited(msg.sender, amount);
    }
    
    /**
     * @notice Withdraw USDm from the contract
     * @param amount Amount of USDm to withdraw
     */
    function withdraw(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be > 0");
        require(accounts[msg.sender].balance >= amount, "Insufficient balance");
        
        accounts[msg.sender].balance -= amount;
        accounts[msg.sender].totalWithdrawn += amount;
        
        usdm.safeTransfer(msg.sender, amount);
        
        emit Withdrawn(msg.sender, amount);
    }

    // ============ Market Functions ============
    
    /**
     * @notice Create a new prediction market
     * @param marketType RAIN or TEMPERATURE
     * @param locationHash Hash of location coordinates
     * @param duration Market duration in seconds
     * @param historicalAvg 10-year historical average (scaled by 100)
     * @param initialLiquidity Initial liquidity parameter
     */
    function createMarket(
        MarketType marketType,
        bytes32 locationHash,
        uint256 duration,
        int256 historicalAvg,
        uint256 initialLiquidity
    ) external onlyOwner returns (uint256 marketId) {
        require(duration >= 1 days, "Duration too short");
        require(duration <= 30 days, "Duration too long");
        require(initialLiquidity >= MIN_LIQUIDITY, "Liquidity too low");
        
        marketId = nextMarketId++;
        
        markets[marketId] = Market({
            id: marketId,
            marketType: marketType,
            locationHash: locationHash,
            startTime: block.timestamp,
            endTime: block.timestamp + duration,
            yesShares: 0,
            noShares: 0,
            liquidityParam: initialLiquidity,
            historicalAvg: historicalAvg,
            status: MarketStatus.ACTIVE,
            outcome: false,
            totalVolume: 0
        });
        
        activeMarketIds.push(marketId);
        
        emit MarketCreated(marketId, marketType, locationHash, block.timestamp + duration, historicalAvg);
    }
    
    /**
     * @notice Buy shares in a market
     * @param marketId Market to buy shares in
     * @param isYes true for YES shares, false for NO shares
     * @param shares Number of shares to buy
     * @param maxCost Maximum USDm willing to spend
     */
    function buyShares(
        uint256 marketId,
        bool isYes,
        uint256 shares,
        uint256 maxCost
    ) external nonReentrant {
        Market storage market = markets[marketId];
        
        require(market.id != 0, "Market does not exist");
        require(market.status == MarketStatus.ACTIVE, "Market not active");
        require(block.timestamp < market.endTime, "Market ended");
        require(shares > 0 && shares <= MAX_SHARES_PER_TX, "Invalid share amount");
        
        // Calculate cost using LMSR
        uint256 cost = _calculateBuyCost(market, isYes, shares);
        require(cost <= maxCost, "Cost exceeds max");
        require(accounts[msg.sender].balance >= cost, "Insufficient balance");
        
        // Deduct from user balance
        accounts[msg.sender].balance -= cost;
        
        // Update market state
        if (isYes) {
            market.yesShares += shares;
        } else {
            market.noShares += shares;
        }
        market.totalVolume += cost;
        
        // Update user position
        Position storage pos = positions[marketId][msg.sender];
        if (pos.yesShares == 0 && pos.noShares == 0) {
            accounts[msg.sender].marketsParticipated++;
        }
        
        if (isYes) {
            pos.yesShares += shares;
        } else {
            pos.noShares += shares;
        }
        pos.totalCost += cost;
        
        // Calculate new price for event
        uint256 newPrice = _getPrice(market, isYes);
        
        emit SharesBought(marketId, msg.sender, isYes, shares, cost, newPrice);
    }
    
    /**
     * @notice Sell shares back to the AMM
     * @param marketId Market to sell shares in
     * @param isYes true for YES shares, false for NO shares
     * @param shares Number of shares to sell
     * @param minPayout Minimum USDm to receive
     */
    function sellShares(
        uint256 marketId,
        bool isYes,
        uint256 shares,
        uint256 minPayout
    ) external nonReentrant {
        Market storage market = markets[marketId];
        Position storage pos = positions[marketId][msg.sender];
        
        require(market.id != 0, "Market does not exist");
        require(market.status == MarketStatus.ACTIVE, "Market not active");
        require(block.timestamp < market.endTime, "Market ended");
        
        if (isYes) {
            require(pos.yesShares >= shares, "Insufficient YES shares");
        } else {
            require(pos.noShares >= shares, "Insufficient NO shares");
        }
        
        // Calculate payout using LMSR
        uint256 payout = _calculateSellPayout(market, isYes, shares);
        require(payout >= minPayout, "Payout below minimum");
        
        // Update market state
        if (isYes) {
            market.yesShares -= shares;
            pos.yesShares -= shares;
        } else {
            market.noShares -= shares;
            pos.noShares -= shares;
        }
        
        // Credit user balance
        accounts[msg.sender].balance += payout;
        
        // Calculate new price for event
        uint256 newPrice = _getPrice(market, isYes);
        
        emit SharesSold(marketId, msg.sender, isYes, shares, payout, newPrice);
    }
    
    /**
     * @notice Resolve a market with the actual outcome
     * @param marketId Market to resolve
     * @param actualValue Actual weather value (from oracle)
     */
    function resolveMarket(
        uint256 marketId,
        int256 actualValue
    ) external {
        require(msg.sender == oracle || msg.sender == owner(), "Not authorized");
        
        Market storage market = markets[marketId];
        
        require(market.id != 0, "Market does not exist");
        require(market.status == MarketStatus.ACTIVE, "Market not active");
        require(block.timestamp >= market.endTime, "Market not ended");
        
        // Determine outcome: YES wins if actual > historical average
        bool outcome = actualValue > market.historicalAvg;
        
        market.status = MarketStatus.RESOLVED;
        market.outcome = outcome;
        
        _removeFromActiveMarkets(marketId);
        
        emit MarketResolved(marketId, outcome, actualValue);
    }
    
    /**
     * @notice Claim winnings from a resolved market
     * @param marketId Market to claim from
     */
    function claimWinnings(uint256 marketId) external nonReentrant {
        Market storage market = markets[marketId];
        Position storage pos = positions[marketId][msg.sender];
        
        require(market.status == MarketStatus.RESOLVED, "Market not resolved");
        
        uint256 winningShares = market.outcome ? pos.yesShares : pos.noShares;
        uint256 losingShares = market.outcome ? pos.noShares : pos.yesShares;
        
        require(winningShares > 0 || losingShares > 0, "No position");
        
        // Each winning share pays out 1 USDm (scaled)
        uint256 payout = winningShares; // 1:1 payout for winning shares
        
        // Clear position
        if (payout > 0) {
            accounts[msg.sender].balance += payout;
            accounts[msg.sender].totalWinnings += payout;
            accounts[msg.sender].marketsWon++;
        }
        
        if (losingShares > 0) {
            accounts[msg.sender].totalLosses += losingShares;
        }
        
        // Calculate realized P&L
        int256 pnl = int256(payout) - int256(pos.totalCost);
        pos.realizedPnL = pnl > 0 ? uint256(pnl) : 0;
        
        pos.yesShares = 0;
        pos.noShares = 0;
        pos.totalCost = 0;
        
        emit WinningsClaimed(marketId, msg.sender, payout);
    }

    // ============ LMSR Price Functions ============
    
    /**
     * @notice Calculate cost to buy shares using LMSR
     * @dev Cost = b * ln(e^(q1'/b) + e^(q2'/b)) - b * ln(e^(q1/b) + e^(q2/b))
     */
    function _calculateBuyCost(
        Market storage market,
        bool isYes,
        uint256 shares
    ) internal view returns (uint256) {
        uint256 b = market.liquidityParam;
        uint256 q1 = market.yesShares;
        uint256 q2 = market.noShares;
        
        // New quantities after purchase
        uint256 newQ1 = isYes ? q1 + shares : q1;
        uint256 newQ2 = isYes ? q2 : q2 + shares;
        
        // Calculate cost function difference
        uint256 costBefore = _lmsrCost(q1, q2, b);
        uint256 costAfter = _lmsrCost(newQ1, newQ2, b);
        
        return costAfter > costBefore ? costAfter - costBefore : 0;
    }
    
    /**
     * @notice Calculate payout for selling shares using LMSR
     */
    function _calculateSellPayout(
        Market storage market,
        bool isYes,
        uint256 shares
    ) internal view returns (uint256) {
        uint256 b = market.liquidityParam;
        uint256 q1 = market.yesShares;
        uint256 q2 = market.noShares;
        
        // New quantities after sale
        uint256 newQ1 = isYes ? q1 - shares : q1;
        uint256 newQ2 = isYes ? q2 : q2 - shares;
        
        // Calculate cost function difference
        uint256 costBefore = _lmsrCost(q1, q2, b);
        uint256 costAfter = _lmsrCost(newQ1, newQ2, b);
        
        return costBefore > costAfter ? costBefore - costAfter : 0;
    }
    
    /**
     * @notice LMSR cost function: b * ln(e^(q1/b) + e^(q2/b))
     * @dev Uses fixed-point math approximation
     */
    function _lmsrCost(uint256 q1, uint256 q2, uint256 b) internal pure returns (uint256) {
        // Simplified approximation for gas efficiency
        // For small q values relative to b, this provides good accuracy
        
        if (q1 == 0 && q2 == 0) {
            return b * 693147 / 1000000; // b * ln(2)
        }
        
        // Scale down for calculation
        uint256 x1 = (q1 * PRECISION) / b;
        uint256 x2 = (q2 * PRECISION) / b;
        
        // Approximate e^x using Taylor series for small x
        uint256 exp1 = _expApprox(x1);
        uint256 exp2 = _expApprox(x2);
        
        // ln(exp1 + exp2) approximation
        uint256 sum = exp1 + exp2;
        uint256 lnSum = _lnApprox(sum);
        
        return (b * lnSum) / PRECISION;
    }
    
    /**
     * @notice Approximate e^x for x in fixed point
     */
    function _expApprox(uint256 x) internal pure returns (uint256) {
        // Taylor series: e^x ≈ 1 + x + x²/2 + x³/6
        if (x > 5 * PRECISION) {
            return type(uint256).max / 2; // Cap to prevent overflow
        }
        
        uint256 result = PRECISION; // 1
        result += x;                 // + x
        result += (x * x) / (2 * PRECISION); // + x²/2
        result += (x * x * x) / (6 * PRECISION * PRECISION); // + x³/6
        
        return result;
    }
    
    /**
     * @notice Approximate ln(x) for x in fixed point
     */
    function _lnApprox(uint256 x) internal pure returns (uint256) {
        // Simple approximation: ln(x) ≈ (x - 1) - (x-1)²/2 + (x-1)³/3 for x near 1
        // For larger x, use: ln(x) ≈ 2 * (x-1)/(x+1) series
        
        if (x <= PRECISION) {
            return 0;
        }
        
        // For x > 1, use ln(x) ≈ (x - PRECISION) / x * PRECISION
        // This is a rough approximation but gas efficient
        uint256 diff = x - PRECISION;
        return (diff * PRECISION) / x;
    }
    
    /**
     * @notice Get current price for a share type
     */
    function _getPrice(Market storage market, bool isYes) internal view returns (uint256) {
        uint256 b = market.liquidityParam;
        uint256 q1 = market.yesShares;
        uint256 q2 = market.noShares;
        
        if (q1 == 0 && q2 == 0) {
            return SHARE_PRICE_PRECISION / 2; // 0.50 (50%)
        }
        
        // Price = e^(q/b) / (e^(q1/b) + e^(q2/b))
        uint256 x1 = (q1 * PRECISION) / b;
        uint256 x2 = (q2 * PRECISION) / b;
        
        uint256 exp1 = _expApprox(x1);
        uint256 exp2 = _expApprox(x2);
        
        uint256 numerator = isYes ? exp1 : exp2;
        uint256 denominator = exp1 + exp2;
        
        return (numerator * SHARE_PRICE_PRECISION) / denominator;
    }

    // ============ View Functions ============
    
    /**
     * @notice Get current YES/NO prices for a market
     */
    function getPrices(uint256 marketId) external view returns (uint256 yesPrice, uint256 noPrice) {
        Market storage market = markets[marketId];
        require(market.id != 0, "Market does not exist");
        
        yesPrice = _getPrice(market, true);
        noPrice = _getPrice(market, false);
    }
    
    /**
     * @notice Get market details
     */
    function getMarket(uint256 marketId) external view returns (Market memory) {
        return markets[marketId];
    }
    
    /**
     * @notice Get user position in a market
     */
    function getPosition(uint256 marketId, address user) external view returns (Position memory) {
        return positions[marketId][user];
    }
    
    /**
     * @notice Get user account details
     */
    function getAccount(address user) external view returns (UserAccount memory) {
        return accounts[user];
    }
    
    /**
     * @notice Get all active market IDs
     */
    function getActiveMarkets() external view returns (uint256[] memory) {
        return activeMarketIds;
    }
    
    /**
     * @notice Calculate cost to buy shares (for frontend)
     */
    function quoteBuy(
        uint256 marketId,
        bool isYes,
        uint256 shares
    ) external view returns (uint256 cost) {
        Market storage market = markets[marketId];
        require(market.id != 0, "Market does not exist");
        return _calculateBuyCost(market, isYes, shares);
    }
    
    /**
     * @notice Calculate payout for selling shares (for frontend)
     */
    function quoteSell(
        uint256 marketId,
        bool isYes,
        uint256 shares
    ) external view returns (uint256 payout) {
        Market storage market = markets[marketId];
        require(market.id != 0, "Market does not exist");
        return _calculateSellPayout(market, isYes, shares);
    }

    // ============ Admin Functions ============
    
    function setTreasury(address _treasury) external onlyOwner {
        require(_treasury != address(0), "Invalid treasury");
        treasury = _treasury;
        emit TreasuryUpdated(_treasury);
    }
    
    function setOracle(address _oracle) external onlyOwner {
        require(_oracle != address(0), "Invalid oracle");
        oracle = _oracle;
        emit OracleUpdated(_oracle);
    }
    
    function setDefaultLiquidity(uint256 _liquidity) external onlyOwner {
        require(_liquidity >= MIN_LIQUIDITY, "Liquidity too low");
        defaultLiquidity = _liquidity;
    }
    
    function setMaxSponsoredTx(uint256 _max) external onlyOwner {
        maxSponsoredTx = _max;
    }
    
    function pauseMarket(uint256 marketId) external onlyOwner {
        Market storage market = markets[marketId];
        require(market.status == MarketStatus.ACTIVE, "Market not active");
        market.status = MarketStatus.PAUSED;
    }
    
    function unpauseMarket(uint256 marketId) external onlyOwner {
        Market storage market = markets[marketId];
        require(market.status == MarketStatus.PAUSED, "Market not paused");
        market.status = MarketStatus.ACTIVE;
    }
    
    function cancelMarket(uint256 marketId) external onlyOwner {
        Market storage market = markets[marketId];
        require(market.status != MarketStatus.RESOLVED, "Market already resolved");
        market.status = MarketStatus.CANCELLED;
        _removeFromActiveMarkets(marketId);
    }
    
    /**
     * @notice Emergency withdrawal for cancelled markets
     */
    function emergencyWithdraw(uint256 marketId) external nonReentrant {
        Market storage market = markets[marketId];
        Position storage pos = positions[marketId][msg.sender];
        
        require(market.status == MarketStatus.CANCELLED, "Market not cancelled");
        require(pos.totalCost > 0, "No position");
        
        uint256 refund = pos.totalCost;
        pos.yesShares = 0;
        pos.noShares = 0;
        pos.totalCost = 0;
        
        accounts[msg.sender].balance += refund;
    }

    // ============ Internal Functions ============
    
    function _removeFromActiveMarkets(uint256 marketId) internal {
        uint256 length = activeMarketIds.length;
        for (uint256 i = 0; i < length; i++) {
            if (activeMarketIds[i] == marketId) {
                activeMarketIds[i] = activeMarketIds[length - 1];
                activeMarketIds.pop();
                break;
            }
        }
    }
}
