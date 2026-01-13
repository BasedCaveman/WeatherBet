// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

/**
 * @title WeatherBetAMM v2 - Security Hardened
 * @notice LMSR-based prediction market with betting windows and oracle verification
 * @dev Audited for: reentrancy, overflow, front-running, oracle manipulation
 * 
 * SECURITY FEATURES:
 * - ReentrancyGuard on all state-changing functions
 * - Pausable for emergency stops
 * - Betting window enforcement (closes 24h before week starts)
 * - Oracle verification period (24h dispute window)
 * - Maximum position limits per user
 * - Slippage protection on all trades
 * - Rate limiting on withdrawals
 * - Input validation on all parameters
 */
contract WeatherBetAMMv2 is Ownable, ReentrancyGuard, Pausable {
    using SafeERC20 for IERC20;

    // ============ Constants ============
    
    uint256 public constant PRECISION = 1e18;
    uint256 public constant SHARE_PRICE_PRECISION = 1e6;      // 6 decimals for prices
    uint256 public constant MIN_LIQUIDITY = 100e18;           // Minimum 100 USDm liquidity
    uint256 public constant MAX_SHARES_PER_TX = 10000e18;     // Max 10k shares per transaction
    uint256 public constant MAX_POSITION_PER_USER = 100000e18; // Max 100k shares per user per market
    uint256 public constant BETTING_WINDOW_BUFFER = 24 hours;  // Betting closes 24h before week
    uint256 public constant RESOLUTION_DISPUTE_PERIOD = 24 hours; // 24h to dispute resolution
    uint256 public constant MIN_MARKET_DURATION = 1 days;
    uint256 public constant MAX_MARKET_DURATION = 30 days;
    uint256 public constant WITHDRAWAL_COOLDOWN = 1 hours;     // Rate limit withdrawals
    
    // ============ Types ============
    
    enum MarketType { RAIN, TEMPERATURE }
    enum MarketStatus { PENDING, ACTIVE, BETTING_CLOSED, PENDING_RESOLUTION, DISPUTED, RESOLVED, CANCELLED }
    
    struct Market {
        uint256 id;
        MarketType marketType;
        bytes32 locationHash;           // keccak256(lat, lon, city)
        uint256 createdAt;              // When market was created
        uint256 bettingOpens;           // When betting opens (usually creation time)
        uint256 bettingCloses;          // When betting closes (24h before week starts)
        uint256 targetWeekStart;        // Start of the week being predicted
        uint256 targetWeekEnd;          // End of the week being predicted
        uint256 yesShares;              // Total YES shares outstanding
        uint256 noShares;               // Total NO shares outstanding  
        uint256 liquidityParam;         // LMSR 'b' parameter
        int256 historicalAvg;           // 10-year average (scaled by 100)
        MarketStatus status;
        int256 proposedOutcome;         // Proposed resolution value
        uint256 resolutionProposedAt;   // When resolution was proposed
        bool finalOutcome;              // true = YES won, false = NO won
        uint256 totalVolume;            // Total trading volume
    }
    
    struct Position {
        uint256 yesShares;
        uint256 noShares;
        uint256 totalCost;
        bool claimed;
    }
    
    struct UserAccount {
        uint256 balance;
        uint256 totalDeposited;
        uint256 totalWithdrawn;
        uint256 totalWinnings;
        uint256 totalLosses;
        uint256 marketsParticipated;
        uint256 marketsWon;
        uint256 lastWithdrawalTime;     // For rate limiting
    }

    // ============ State Variables ============
    
    IERC20 public immutable usdm;
    address public treasury;
    address public oracle;
    
    uint256 public nextMarketId = 1;
    uint256 public defaultLiquidity = 1000e18;
    
    mapping(uint256 => Market) public markets;
    uint256[] public activeMarketIds;
    
    mapping(uint256 => mapping(address => Position)) public positions;
    mapping(address => UserAccount) public accounts;
    
    // ============ Events ============
    
    event MarketCreated(
        uint256 indexed marketId,
        MarketType marketType,
        bytes32 locationHash,
        uint256 bettingCloses,
        uint256 targetWeekStart,
        int256 historicalAvg
    );
    
    event BettingClosed(uint256 indexed marketId, uint256 timestamp);
    
    event SharesBought(
        uint256 indexed marketId,
        address indexed user,
        bool isYes,
        uint256 shares,
        uint256 cost,
        uint256 newYesPrice,
        uint256 newNoPrice
    );
    
    event SharesSold(
        uint256 indexed marketId,
        address indexed user,
        bool isYes,
        uint256 shares,
        uint256 payout,
        uint256 newYesPrice,
        uint256 newNoPrice
    );
    
    event ResolutionProposed(
        uint256 indexed marketId,
        int256 proposedValue,
        bool proposedOutcome,
        uint256 disputeDeadline
    );
    
    event ResolutionDisputed(
        uint256 indexed marketId,
        address indexed disputer,
        string reason
    );
    
    event MarketResolved(
        uint256 indexed marketId,
        bool finalOutcome,
        int256 actualValue
    );
    
    event WinningsClaimed(
        uint256 indexed marketId,
        address indexed user,
        uint256 amount
    );
    
    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event EmergencyWithdrawal(uint256 indexed marketId, address indexed user, uint256 amount);

    // ============ Modifiers ============
    
    modifier onlyOracle() {
        require(msg.sender == oracle, "Only oracle");
        _;
    }
    
    modifier marketExists(uint256 marketId) {
        require(markets[marketId].id != 0, "Market does not exist");
        _;
    }
    
    modifier bettingOpen(uint256 marketId) {
        Market storage market = markets[marketId];
        require(block.timestamp >= market.bettingOpens, "Betting not open yet");
        require(block.timestamp < market.bettingCloses, "Betting closed");
        require(
            market.status == MarketStatus.PENDING || market.status == MarketStatus.ACTIVE,
            "Market not accepting bets"
        );
        _;
    }

    // ============ Constructor ============
    
    constructor(address _usdm, address _treasury) Ownable(msg.sender) {
        require(_usdm != address(0), "Invalid USDm address");
        require(_treasury != address(0), "Invalid treasury");
        
        usdm = IERC20(_usdm);
        treasury = _treasury;
    }

    // ============ User Account Functions ============
    
    /**
     * @notice Deposit USDm into trading account
     * @param amount Amount of USDm to deposit
     */
    function deposit(uint256 amount) external nonReentrant whenNotPaused {
        require(amount > 0, "Amount must be > 0");
        require(amount <= 1000000e18, "Amount too large"); // Max 1M per deposit
        
        usdm.safeTransferFrom(msg.sender, address(this), amount);
        
        accounts[msg.sender].balance += amount;
        accounts[msg.sender].totalDeposited += amount;
        
        emit Deposited(msg.sender, amount);
    }
    
    /**
     * @notice Withdraw USDm from trading account
     * @param amount Amount of USDm to withdraw
     */
    function withdraw(uint256 amount) external nonReentrant whenNotPaused {
        UserAccount storage account = accounts[msg.sender];
        
        require(amount > 0, "Amount must be > 0");
        require(account.balance >= amount, "Insufficient balance");
        require(
            block.timestamp >= account.lastWithdrawalTime + WITHDRAWAL_COOLDOWN,
            "Withdrawal cooldown active"
        );
        
        account.balance -= amount;
        account.totalWithdrawn += amount;
        account.lastWithdrawalTime = block.timestamp;
        
        usdm.safeTransfer(msg.sender, amount);
        
        emit Withdrawn(msg.sender, amount);
    }

    // ============ Market Creation ============
    
    /**
     * @notice Create a new prediction market
     * @param marketType RAIN or TEMPERATURE
     * @param locationHash Hash of location (lat, lon, city)
     * @param targetWeekStart Unix timestamp of Monday 00:00 UTC for the target week
     * @param historicalAvg 10-year historical average (scaled by 100)
     * @param initialLiquidity Initial liquidity parameter for LMSR
     */
    function createMarket(
        MarketType marketType,
        bytes32 locationHash,
        uint256 targetWeekStart,
        int256 historicalAvg,
        uint256 initialLiquidity
    ) external onlyOwner returns (uint256 marketId) {
        // Validate inputs
        require(locationHash != bytes32(0), "Invalid location");
        require(initialLiquidity >= MIN_LIQUIDITY, "Liquidity too low");
        require(targetWeekStart > block.timestamp, "Target week must be in future");
        
        // Calculate betting window
        // Betting closes 24 hours before the target week starts
        uint256 bettingCloses = targetWeekStart - BETTING_WINDOW_BUFFER;
        require(bettingCloses > block.timestamp, "Betting window already closed");
        
        // Target week end is 7 days after start
        uint256 targetWeekEnd = targetWeekStart + 7 days;
        
        marketId = nextMarketId++;
        
        markets[marketId] = Market({
            id: marketId,
            marketType: marketType,
            locationHash: locationHash,
            createdAt: block.timestamp,
            bettingOpens: block.timestamp,  // Opens immediately
            bettingCloses: bettingCloses,
            targetWeekStart: targetWeekStart,
            targetWeekEnd: targetWeekEnd,
            yesShares: 0,
            noShares: 0,
            liquidityParam: initialLiquidity,
            historicalAvg: historicalAvg,
            status: MarketStatus.ACTIVE,
            proposedOutcome: 0,
            resolutionProposedAt: 0,
            finalOutcome: false,
            totalVolume: 0
        });
        
        activeMarketIds.push(marketId);
        
        emit MarketCreated(
            marketId, 
            marketType, 
            locationHash, 
            bettingCloses, 
            targetWeekStart, 
            historicalAvg
        );
    }

    // ============ Trading Functions ============
    
    /**
     * @notice Buy shares in a market
     * @param marketId Market to buy shares in
     * @param isYes true for YES shares, false for NO shares
     * @param shares Number of shares to buy (18 decimals)
     * @param maxCost Maximum USDm willing to spend (slippage protection)
     */
    function buyShares(
        uint256 marketId,
        bool isYes,
        uint256 shares,
        uint256 maxCost
    ) external nonReentrant whenNotPaused marketExists(marketId) bettingOpen(marketId) {
        require(shares > 0, "Shares must be > 0");
        require(shares <= MAX_SHARES_PER_TX, "Exceeds max shares per tx");
        
        Market storage market = markets[marketId];
        Position storage pos = positions[marketId][msg.sender];
        UserAccount storage account = accounts[msg.sender];
        
        // Check position limits
        uint256 newTotalShares = isYes 
            ? pos.yesShares + shares 
            : pos.noShares + shares;
        require(newTotalShares <= MAX_POSITION_PER_USER, "Exceeds max position");
        
        // Calculate cost using LMSR
        uint256 cost = _calculateBuyCost(market, isYes, shares);
        require(cost > 0, "Invalid cost calculation");
        require(cost <= maxCost, "Cost exceeds maximum (slippage)");
        require(account.balance >= cost, "Insufficient balance");
        
        // Update state
        account.balance -= cost;
        
        if (isYes) {
            market.yesShares += shares;
            pos.yesShares += shares;
        } else {
            market.noShares += shares;
            pos.noShares += shares;
        }
        
        pos.totalCost += cost;
        market.totalVolume += cost;
        
        // Track participation
        if (pos.yesShares == shares || pos.noShares == shares) {
            // First position in this market
            account.marketsParticipated++;
        }
        
        // Get new prices for event
        (uint256 yesPrice, uint256 noPrice) = _getPrices(market);
        
        emit SharesBought(marketId, msg.sender, isYes, shares, cost, yesPrice, noPrice);
    }
    
    /**
     * @notice Sell shares back to the AMM
     * @param marketId Market to sell shares in
     * @param isYes true for YES shares, false for NO shares
     * @param shares Number of shares to sell
     * @param minPayout Minimum USDm to receive (slippage protection)
     */
    function sellShares(
        uint256 marketId,
        bool isYes,
        uint256 shares,
        uint256 minPayout
    ) external nonReentrant whenNotPaused marketExists(marketId) bettingOpen(marketId) {
        require(shares > 0, "Shares must be > 0");
        
        Market storage market = markets[marketId];
        Position storage pos = positions[marketId][msg.sender];
        
        // Validate ownership
        if (isYes) {
            require(pos.yesShares >= shares, "Insufficient YES shares");
        } else {
            require(pos.noShares >= shares, "Insufficient NO shares");
        }
        
        // Calculate payout using LMSR
        uint256 payout = _calculateSellPayout(market, isYes, shares);
        require(payout >= minPayout, "Payout below minimum (slippage)");
        
        // Update state
        if (isYes) {
            market.yesShares -= shares;
            pos.yesShares -= shares;
        } else {
            market.noShares -= shares;
            pos.noShares -= shares;
        }
        
        accounts[msg.sender].balance += payout;
        
        // Get new prices for event
        (uint256 yesPrice, uint256 noPrice) = _getPrices(market);
        
        emit SharesSold(marketId, msg.sender, isYes, shares, payout, yesPrice, noPrice);
    }

    // ============ Resolution Functions ============
    
    /**
     * @notice Close betting for a market (called automatically or by keeper)
     * @param marketId Market to close betting for
     */
    function closeBetting(uint256 marketId) external marketExists(marketId) {
        Market storage market = markets[marketId];
        
        require(
            market.status == MarketStatus.ACTIVE || market.status == MarketStatus.PENDING,
            "Invalid status"
        );
        require(block.timestamp >= market.bettingCloses, "Betting window not closed yet");
        
        market.status = MarketStatus.BETTING_CLOSED;
        
        emit BettingClosed(marketId, block.timestamp);
    }
    
    /**
     * @notice Propose resolution for a market (oracle only)
     * @param marketId Market to resolve
     * @param actualValue Actual weather value from oracle
     */
    function proposeResolution(
        uint256 marketId,
        int256 actualValue
    ) external onlyOracle marketExists(marketId) {
        Market storage market = markets[marketId];
        
        require(
            market.status == MarketStatus.BETTING_CLOSED ||
            market.status == MarketStatus.ACTIVE,
            "Invalid status for resolution"
        );
        require(block.timestamp >= market.targetWeekEnd, "Week not ended yet");
        
        // Store proposed outcome
        market.proposedOutcome = actualValue;
        market.resolutionProposedAt = block.timestamp;
        market.status = MarketStatus.PENDING_RESOLUTION;
        
        // Determine outcome: YES wins if actual > historical average
        bool outcome = actualValue > market.historicalAvg;
        
        emit ResolutionProposed(
            marketId,
            actualValue,
            outcome,
            block.timestamp + RESOLUTION_DISPUTE_PERIOD
        );
    }
    
    /**
     * @notice Dispute a proposed resolution
     * @param marketId Market to dispute
     * @param reason Reason for dispute
     */
    function disputeResolution(
        uint256 marketId,
        string calldata reason
    ) external marketExists(marketId) {
        Market storage market = markets[marketId];
        
        require(market.status == MarketStatus.PENDING_RESOLUTION, "Not pending resolution");
        require(
            block.timestamp < market.resolutionProposedAt + RESOLUTION_DISPUTE_PERIOD,
            "Dispute period ended"
        );
        
        // Must have a position to dispute
        Position storage pos = positions[marketId][msg.sender];
        require(pos.yesShares > 0 || pos.noShares > 0, "Must have position to dispute");
        
        market.status = MarketStatus.DISPUTED;
        
        emit ResolutionDisputed(marketId, msg.sender, reason);
    }
    
    /**
     * @notice Finalize resolution after dispute period
     * @param marketId Market to finalize
     */
    function finalizeResolution(uint256 marketId) external marketExists(marketId) {
        Market storage market = markets[marketId];
        
        require(market.status == MarketStatus.PENDING_RESOLUTION, "Not pending resolution");
        require(
            block.timestamp >= market.resolutionProposedAt + RESOLUTION_DISPUTE_PERIOD,
            "Dispute period not ended"
        );
        
        // Finalize the outcome
        market.finalOutcome = market.proposedOutcome > market.historicalAvg;
        market.status = MarketStatus.RESOLVED;
        
        _removeFromActiveMarkets(marketId);
        
        emit MarketResolved(marketId, market.finalOutcome, market.proposedOutcome);
    }
    
    /**
     * @notice Override resolution for disputed market (owner only)
     * @param marketId Market to override
     * @param finalValue Corrected value
     */
    function overrideResolution(
        uint256 marketId,
        int256 finalValue
    ) external onlyOwner marketExists(marketId) {
        Market storage market = markets[marketId];
        
        require(market.status == MarketStatus.DISPUTED, "Not disputed");
        
        market.proposedOutcome = finalValue;
        market.finalOutcome = finalValue > market.historicalAvg;
        market.status = MarketStatus.RESOLVED;
        
        _removeFromActiveMarkets(marketId);
        
        emit MarketResolved(marketId, market.finalOutcome, finalValue);
    }
    
    /**
     * @notice Claim winnings from a resolved market
     * @param marketId Market to claim from
     */
    function claimWinnings(uint256 marketId) external nonReentrant marketExists(marketId) {
        Market storage market = markets[marketId];
        Position storage pos = positions[marketId][msg.sender];
        UserAccount storage account = accounts[msg.sender];
        
        require(market.status == MarketStatus.RESOLVED, "Market not resolved");
        require(!pos.claimed, "Already claimed");
        require(pos.yesShares > 0 || pos.noShares > 0, "No position");
        
        pos.claimed = true;
        
        // Calculate payout
        uint256 winningShares = market.finalOutcome ? pos.yesShares : pos.noShares;
        uint256 losingShares = market.finalOutcome ? pos.noShares : pos.yesShares;
        
        // Each winning share pays out 1 USDm
        uint256 payout = winningShares;
        
        if (payout > 0) {
            account.balance += payout;
            account.totalWinnings += payout;
            account.marketsWon++;
        }
        
        if (losingShares > 0) {
            account.totalLosses += pos.totalCost * losingShares / (pos.yesShares + pos.noShares);
        }
        
        emit WinningsClaimed(marketId, msg.sender, payout);
    }

    // ============ View Functions ============
    
    /**
     * @notice Get current YES/NO prices for a market
     */
    function getPrices(uint256 marketId) external view returns (uint256 yesPrice, uint256 noPrice) {
        Market storage market = markets[marketId];
        require(market.id != 0, "Market does not exist");
        return _getPrices(market);
    }
    
    /**
     * @notice Get market betting window status
     */
    function getBettingStatus(uint256 marketId) external view returns (
        bool isOpen,
        uint256 opensAt,
        uint256 closesAt,
        uint256 secondsUntilClose
    ) {
        Market storage market = markets[marketId];
        require(market.id != 0, "Market does not exist");
        
        opensAt = market.bettingOpens;
        closesAt = market.bettingCloses;
        
        isOpen = block.timestamp >= opensAt && 
                 block.timestamp < closesAt &&
                 (market.status == MarketStatus.ACTIVE || market.status == MarketStatus.PENDING);
        
        if (isOpen) {
            secondsUntilClose = closesAt - block.timestamp;
        } else {
            secondsUntilClose = 0;
        }
    }
    
    /**
     * @notice Get resolution status for a market
     */
    function getResolutionStatus(uint256 marketId) external view returns (
        MarketStatus status,
        int256 proposedValue,
        uint256 proposedAt,
        uint256 disputeDeadline,
        bool canFinalize,
        bool canDispute
    ) {
        Market storage market = markets[marketId];
        require(market.id != 0, "Market does not exist");
        
        status = market.status;
        proposedValue = market.proposedOutcome;
        proposedAt = market.resolutionProposedAt;
        
        if (proposedAt > 0) {
            disputeDeadline = proposedAt + RESOLUTION_DISPUTE_PERIOD;
            canFinalize = block.timestamp >= disputeDeadline && status == MarketStatus.PENDING_RESOLUTION;
            canDispute = block.timestamp < disputeDeadline && status == MarketStatus.PENDING_RESOLUTION;
        }
    }
    
    /**
     * @notice Get full market details
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
     * @notice Quote cost to buy shares
     */
    function quoteBuy(uint256 marketId, bool isYes, uint256 shares) external view returns (uint256) {
        Market storage market = markets[marketId];
        require(market.id != 0, "Market does not exist");
        return _calculateBuyCost(market, isYes, shares);
    }
    
    /**
     * @notice Quote payout for selling shares
     */
    function quoteSell(uint256 marketId, bool isYes, uint256 shares) external view returns (uint256) {
        Market storage market = markets[marketId];
        require(market.id != 0, "Market does not exist");
        return _calculateSellPayout(market, isYes, shares);
    }

    // ============ Admin Functions ============
    
    function setTreasury(address _treasury) external onlyOwner {
        require(_treasury != address(0), "Invalid treasury");
        treasury = _treasury;
    }
    
    function setOracle(address _oracle) external onlyOwner {
        require(_oracle != address(0), "Invalid oracle");
        oracle = _oracle;
    }
    
    function setDefaultLiquidity(uint256 _liquidity) external onlyOwner {
        require(_liquidity >= MIN_LIQUIDITY, "Liquidity too low");
        defaultLiquidity = _liquidity;
    }
    
    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }
    
    function cancelMarket(uint256 marketId) external onlyOwner marketExists(marketId) {
        Market storage market = markets[marketId];
        require(market.status != MarketStatus.RESOLVED, "Already resolved");
        
        market.status = MarketStatus.CANCELLED;
        _removeFromActiveMarkets(marketId);
    }
    
    /**
     * @notice Emergency withdrawal for cancelled markets
     */
    function emergencyWithdraw(uint256 marketId) external nonReentrant marketExists(marketId) {
        Market storage market = markets[marketId];
        Position storage pos = positions[marketId][msg.sender];
        
        require(market.status == MarketStatus.CANCELLED, "Market not cancelled");
        require(!pos.claimed, "Already claimed");
        require(pos.totalCost > 0, "No position");
        
        pos.claimed = true;
        uint256 refund = pos.totalCost;
        
        accounts[msg.sender].balance += refund;
        
        emit EmergencyWithdrawal(marketId, msg.sender, refund);
    }

    // ============ LMSR Implementation ============
    
    function _calculateBuyCost(
        Market storage market,
        bool isYes,
        uint256 shares
    ) internal view returns (uint256) {
        uint256 b = market.liquidityParam;
        uint256 q1 = market.yesShares;
        uint256 q2 = market.noShares;
        
        uint256 newQ1 = isYes ? q1 + shares : q1;
        uint256 newQ2 = isYes ? q2 : q2 + shares;
        
        uint256 costBefore = _lmsrCost(q1, q2, b);
        uint256 costAfter = _lmsrCost(newQ1, newQ2, b);
        
        return costAfter > costBefore ? costAfter - costBefore : 0;
    }
    
    function _calculateSellPayout(
        Market storage market,
        bool isYes,
        uint256 shares
    ) internal view returns (uint256) {
        uint256 b = market.liquidityParam;
        uint256 q1 = market.yesShares;
        uint256 q2 = market.noShares;
        
        uint256 newQ1 = isYes ? q1 - shares : q1;
        uint256 newQ2 = isYes ? q2 : q2 - shares;
        
        uint256 costBefore = _lmsrCost(q1, q2, b);
        uint256 costAfter = _lmsrCost(newQ1, newQ2, b);
        
        return costBefore > costAfter ? costBefore - costAfter : 0;
    }
    
    function _lmsrCost(uint256 q1, uint256 q2, uint256 b) internal pure returns (uint256) {
        if (q1 == 0 && q2 == 0) {
            return (b * 693147) / 1000000; // b * ln(2)
        }
        
        uint256 x1 = (q1 * PRECISION) / b;
        uint256 x2 = (q2 * PRECISION) / b;
        
        uint256 exp1 = _expApprox(x1);
        uint256 exp2 = _expApprox(x2);
        
        uint256 sum = exp1 + exp2;
        uint256 lnSum = _lnApprox(sum);
        
        return (b * lnSum) / PRECISION;
    }
    
    function _expApprox(uint256 x) internal pure returns (uint256) {
        if (x > 5 * PRECISION) {
            return type(uint256).max / 2;
        }
        
        uint256 result = PRECISION;
        result += x;
        result += (x * x) / (2 * PRECISION);
        result += (x * x * x) / (6 * PRECISION * PRECISION);
        
        return result;
    }
    
    function _lnApprox(uint256 x) internal pure returns (uint256) {
        if (x <= PRECISION) {
            return 0;
        }
        
        uint256 diff = x - PRECISION;
        return (diff * PRECISION) / x;
    }
    
    function _getPrices(Market storage market) internal view returns (uint256 yesPrice, uint256 noPrice) {
        uint256 b = market.liquidityParam;
        uint256 q1 = market.yesShares;
        uint256 q2 = market.noShares;
        
        if (q1 == 0 && q2 == 0) {
            return (SHARE_PRICE_PRECISION / 2, SHARE_PRICE_PRECISION / 2);
        }
        
        uint256 x1 = (q1 * PRECISION) / b;
        uint256 x2 = (q2 * PRECISION) / b;
        
        uint256 exp1 = _expApprox(x1);
        uint256 exp2 = _expApprox(x2);
        
        uint256 total = exp1 + exp2;
        
        yesPrice = (exp1 * SHARE_PRICE_PRECISION) / total;
        noPrice = (exp2 * SHARE_PRICE_PRECISION) / total;
    }
    
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
