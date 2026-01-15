// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/token/ERC20/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/token/ERC20/utils/SafeERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/utils/ReentrancyGuard.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/utils/Pausable.sol";

/**
 * @title WeatherBetAMM v2 - Security Hardened
 * @notice LMSR-based prediction market with betting windows and oracle verification
 */
contract WeatherBetAMMv2 is Ownable, ReentrancyGuard, Pausable {
    using SafeERC20 for IERC20;

    // ============ Constants ============
    
    uint256 public constant PRECISION = 1e18;
    uint256 public constant SHARE_PRICE_PRECISION = 1e6;
    uint256 public constant MIN_LIQUIDITY = 100e18;
    uint256 public constant MAX_SHARES_PER_TX = 10000e18;
    uint256 public constant MAX_POSITION_PER_USER = 100000e18;
    uint256 public constant BETTING_WINDOW_BUFFER = 24 hours;
    uint256 public constant RESOLUTION_DISPUTE_PERIOD = 24 hours;
    uint256 public constant MIN_MARKET_DURATION = 1 days;
    uint256 public constant MAX_MARKET_DURATION = 30 days;
    uint256 public constant WITHDRAWAL_COOLDOWN = 1 hours;
    
    // ============ Types ============
    
    enum MarketType { RAIN, TEMPERATURE }
    enum MarketStatus { PENDING, ACTIVE, BETTING_CLOSED, PENDING_RESOLUTION, DISPUTED, RESOLVED, CANCELLED }
    
    struct Market {
        uint256 id;
        MarketType marketType;
        bytes32 locationHash;
        uint256 createdAt;
        uint256 bettingOpens;
        uint256 bettingCloses;
        uint256 targetWeekStart;
        uint256 targetWeekEnd;
        uint256 yesShares;
        uint256 noShares;
        uint256 liquidityParam;
        int256 historicalAvg;
        MarketStatus status;
        int256 proposedOutcome;
        uint256 resolutionProposedAt;
        bool finalOutcome;
        uint256 totalVolume;
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
        uint256 lastWithdrawalTime;
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
    
    function deposit(uint256 amount) external nonReentrant whenNotPaused {
        require(amount > 0, "Amount must be > 0");
        require(amount <= 1000000e18, "Amount too large");
        
        usdm.safeTransferFrom(msg.sender, address(this), amount);
        
        accounts[msg.sender].balance += amount;
        accounts[msg.sender].totalDeposited += amount;
        
        emit Deposited(msg.sender, amount);
    }
    
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
    
    function createMarket(
        MarketType marketType,
        bytes32 locationHash,
        uint256 targetWeekStart,
        int256 historicalAvg,
        uint256 initialLiquidity
    ) external onlyOwner returns (uint256 marketId) {
        require(locationHash != bytes32(0), "Invalid location");
        require(initialLiquidity >= MIN_LIQUIDITY, "Liquidity too low");
        require(targetWeekStart > block.timestamp, "Target week must be in future");
        
        uint256 bettingCloses = targetWeekStart - BETTING_WINDOW_BUFFER;
        require(bettingCloses > block.timestamp, "Betting window already closed");
        
        uint256 targetWeekEnd = targetWeekStart + 7 days;
        
        marketId = nextMarketId++;
        
        markets[marketId] = Market({
            id: marketId,
            marketType: marketType,
            locationHash: locationHash,
            createdAt: block.timestamp,
            bettingOpens: block.timestamp,
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
        
        uint256 newTotalShares = isYes 
            ? pos.yesShares + shares 
            : pos.noShares + shares;
        require(newTotalShares <= MAX_POSITION_PER_USER, "Exceeds max position");
        
        uint256 cost = _calculateBuyCost(market, isYes, shares);
        require(cost > 0, "Invalid cost calculation");
        require(cost <= maxCost, "Cost exceeds maximum (slippage)");
        require(account.balance >= cost, "Insufficient balance");
        
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
        
        if (pos.yesShares == shares || pos.noShares == shares) {
            account.marketsParticipated++;
        }
        
        (uint256 yesPrice, uint256 noPrice) = _getPrices(market);
        
        emit SharesBought(marketId, msg.sender, isYes, shares, cost, yesPrice, noPrice);
    }
    
    function sellShares(
        uint256 marketId,
        bool isYes,
        uint256 shares,
        uint256 minPayout
    ) external nonReentrant whenNotPaused marketExists(marketId) bettingOpen(marketId) {
        require(shares > 0, "Shares must be > 0");
        
        Market storage market = markets[marketId];
        Position storage pos = positions[marketId][msg.sender];
        
        if (isYes) {
            require(pos.yesShares >= shares, "Insufficient YES shares");
        } else {
            require(pos.noShares >= shares, "Insufficient NO shares");
        }
        
        uint256 payout = _calculateSellPayout(market, isYes, shares);
        require(payout >= minPayout, "Payout below minimum (slippage)");
        
        if (isYes) {
            market.yesShares -= shares;
            pos.yesShares -= shares;
        } else {
            market.noShares -= shares;
            pos.noShares -= shares;
        }
        
        accounts[msg.sender].balance += payout;
        
        (uint256 yesPrice, uint256 noPrice) = _getPrices(market);
        
        emit SharesSold(marketId, msg.sender, isYes, shares, payout, yesPrice, noPrice);
    }

    // ============ Resolution Functions ============
    
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
        
        market.proposedOutcome = actualValue;
        market.resolutionProposedAt = block.timestamp;
        market.status = MarketStatus.PENDING_RESOLUTION;
        
        bool outcome = actualValue > market.historicalAvg;
        
        emit ResolutionProposed(
            marketId,
            actualValue,
            outcome,
            block.timestamp + RESOLUTION_DISPUTE_PERIOD
        );
    }
    
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
        
        Position storage pos = positions[marketId][msg.sender];
        require(pos.yesShares > 0 || pos.noShares > 0, "Must have position to dispute");
        
        market.status = MarketStatus.DISPUTED;
        
        emit ResolutionDisputed(marketId, msg.sender, reason);
    }
    
    function finalizeResolution(uint256 marketId) external marketExists(marketId) {
        Market storage market = markets[marketId];
        
        require(market.status == MarketStatus.PENDING_RESOLUTION, "Not pending resolution");
        require(
            block.timestamp >= market.resolutionProposedAt + RESOLUTION_DISPUTE_PERIOD,
            "Dispute period not ended"
        );
        
        market.finalOutcome = market.proposedOutcome > market.historicalAvg;
        market.status = MarketStatus.RESOLVED;
        
        _removeFromActiveMarkets(marketId);
        
        emit MarketResolved(marketId, market.finalOutcome, market.proposedOutcome);
    }
    
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
    
    function claimWinnings(uint256 marketId) external nonReentrant marketExists(marketId) {
        Market storage market = markets[marketId];
        Position storage pos = positions[marketId][msg.sender];
        UserAccount storage account = accounts[msg.sender];
        
        require(market.status == MarketStatus.RESOLVED, "Market not resolved");
        require(!pos.claimed, "Already claimed");
        require(pos.yesShares > 0 || pos.noShares > 0, "No position");
        
        pos.claimed = true;
        
        uint256 winningShares = market.finalOutcome ? pos.yesShares : pos.noShares;
        uint256 losingShares = market.finalOutcome ? pos.noShares : pos.yesShares;
        
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
    
    function getPrices(uint256 marketId) external view returns (uint256 yesPrice, uint256 noPrice) {
        Market storage market = markets[marketId];
        require(market.id != 0, "Market does not exist");
        return _getPrices(market);
    }
    
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
    
    function getMarket(uint256 marketId) external view returns (Market memory) {
        return markets[marketId];
    }
    
    function getPosition(uint256 marketId, address user) external view returns (Position memory) {
        return positions[marketId][user];
    }
    
    function getAccount(address user) external view returns (UserAccount memory) {
        return accounts[user];
    }
    
    function getActiveMarkets() external view returns (uint256[] memory) {
        return activeMarketIds;
    }
    
    function quoteBuy(uint256 marketId, bool isYes, uint256 shares) external view returns (uint256) {
        Market storage market = markets[marketId];
        require(market.id != 0, "Market does not exist");
        return _calculateBuyCost(market, isYes, shares);
    }
    
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
            return (b * 693147) / 1000000;
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
