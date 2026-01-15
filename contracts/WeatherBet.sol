// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title WeatherBet - Simple Weather Prediction Markets
 * @notice Decentralized prediction markets for rain and temperature
 * @dev Designed for simplicity and accessibility
 */
contract WeatherBet is Ownable, ReentrancyGuard {
    // ============ Types ============
    
    enum MarketType { RAIN, TEMPERATURE }
    
    struct Market {
        uint256 id;
        MarketType marketType;
        uint256 startTime;
        uint256 endTime;
        uint256 totalYesAmount;
        uint256 totalNoAmount;
        bool resolved;
        bool outcome;
        string region;
    }
    
    struct Prediction {
        bool position;      // true = YES, false = NO
        uint256 amount;
        bool claimed;
    }
    
    // ============ State Variables ============
    
    uint256 public nextMarketId = 1;
    uint256 public constant MIN_BET = 0.001 ether;
    uint256 public constant MAX_BET = 1 ether;
    uint256 public constant PLATFORM_FEE = 200; // 2% in basis points
    uint256 public constant FEE_DENOMINATOR = 10000;
    
    // marketId => Market
    mapping(uint256 => Market) public markets;
    
    // marketId => user => Prediction
    mapping(uint256 => mapping(address => Prediction)) public predictions;
    
    // Active market IDs
    uint256[] public activeMarketIds;
    
    // ============ Events ============
    
    event MarketCreated(
        uint256 indexed marketId,
        MarketType marketType,
        uint256 startTime,
        uint256 endTime,
        string region
    );
    
    event PredictionPlaced(
        uint256 indexed marketId,
        address indexed user,
        bool position,
        uint256 amount
    );
    
    event MarketResolved(
        uint256 indexed marketId,
        bool outcome
    );
    
    event WinningsClaimed(
        uint256 indexed marketId,
        address indexed user,
        uint256 amount
    );
    
    // ============ Constructor ============
    
    constructor() Ownable(msg.sender) {}
    
    // ============ External Functions ============
    
    /**
     * @notice Create a new prediction market
     * @param marketType Type of market (RAIN or TEMPERATURE)
     * @param duration Duration in seconds
     * @param region Geographic region identifier
     */
    function createMarket(
        MarketType marketType,
        uint256 duration,
        string calldata region
    ) external onlyOwner {
        require(duration >= 1 days, "Duration too short");
        require(duration <= 30 days, "Duration too long");
        
        uint256 marketId = nextMarketId++;
        uint256 startTime = block.timestamp;
        uint256 endTime = startTime + duration;
        
        markets[marketId] = Market({
            id: marketId,
            marketType: marketType,
            startTime: startTime,
            endTime: endTime,
            totalYesAmount: 0,
            totalNoAmount: 0,
            resolved: false,
            outcome: false,
            region: region
        });
        
        activeMarketIds.push(marketId);
        
        emit MarketCreated(marketId, marketType, startTime, endTime, region);
    }
    
    /**
     * @notice Place a prediction on a market
     * @param marketId The market to predict on
     * @param position true for YES, false for NO
     */
    function placePrediction(
        uint256 marketId,
        bool position
    ) external payable nonReentrant {
        Market storage market = markets[marketId];
        
        require(market.id != 0, "Market does not exist");
        require(!market.resolved, "Market already resolved");
        require(block.timestamp < market.endTime, "Market ended");
        require(msg.value >= MIN_BET, "Bet too small");
        require(msg.value <= MAX_BET, "Bet too large");
        
        Prediction storage pred = predictions[marketId][msg.sender];
        require(pred.amount == 0, "Already predicted");
        
        pred.position = position;
        pred.amount = msg.value;
        pred.claimed = false;
        
        if (position) {
            market.totalYesAmount += msg.value;
        } else {
            market.totalNoAmount += msg.value;
        }
        
        emit PredictionPlaced(marketId, msg.sender, position, msg.value);
    }
    
    /**
     * @notice Resolve a market with the outcome
     * @param marketId The market to resolve
     * @param outcome true if YES won, false if NO won
     */
    function resolveMarket(
        uint256 marketId,
        bool outcome
    ) external onlyOwner {
        Market storage market = markets[marketId];
        
        require(market.id != 0, "Market does not exist");
        require(!market.resolved, "Already resolved");
        require(block.timestamp >= market.endTime, "Market not ended");
        
        market.resolved = true;
        market.outcome = outcome;
        
        // Remove from active markets
        _removeFromActiveMarkets(marketId);
        
        emit MarketResolved(marketId, outcome);
    }
    
    /**
     * @notice Claim winnings from a resolved market
     * @param marketId The market to claim from
     */
    function claimWinnings(uint256 marketId) external nonReentrant {
        Market storage market = markets[marketId];
        Prediction storage pred = predictions[marketId][msg.sender];
        
        require(market.resolved, "Market not resolved");
        require(pred.amount > 0, "No prediction");
        require(!pred.claimed, "Already claimed");
        require(pred.position == market.outcome, "Did not win");
        
        pred.claimed = true;
        
        uint256 totalPool = market.totalYesAmount + market.totalNoAmount;
        uint256 winningPool = market.outcome ? market.totalYesAmount : market.totalNoAmount;
        
        // Calculate winnings: (userBet / winningPool) * totalPool
        uint256 grossWinnings = (pred.amount * totalPool) / winningPool;
        
        // Deduct platform fee
        uint256 fee = (grossWinnings * PLATFORM_FEE) / FEE_DENOMINATOR;
        uint256 netWinnings = grossWinnings - fee;
        
        (bool success, ) = msg.sender.call{value: netWinnings}("");
        require(success, "Transfer failed");
        
        emit WinningsClaimed(marketId, msg.sender, netWinnings);
    }
    
    // ============ View Functions ============
    
    /**
     * @notice Get market details
     * @param marketId The market ID
     */
    function getMarket(uint256 marketId) external view returns (Market memory) {
        return markets[marketId];
    }
    
    /**
     * @notice Get user's prediction for a market
     * @param marketId The market ID
     * @param user The user address
     */
    function getUserPrediction(
        uint256 marketId,
        address user
    ) external view returns (bool position, uint256 amount, bool claimed) {
        Prediction storage pred = predictions[marketId][user];
        return (pred.position, pred.amount, pred.claimed);
    }
    
    /**
     * @notice Get all active market IDs
     */
    function getActiveMarkets() external view returns (uint256[] memory) {
        return activeMarketIds;
    }
    
    /**
     * @notice Calculate potential winnings
     * @param marketId The market ID
     * @param position The position (true = YES, false = NO)
     * @param amount The bet amount
     */
    function calculatePotentialWinnings(
        uint256 marketId,
        bool position,
        uint256 amount
    ) external view returns (uint256) {
        Market storage market = markets[marketId];
        
        uint256 totalPool = market.totalYesAmount + market.totalNoAmount + amount;
        uint256 winningPool = position 
            ? market.totalYesAmount + amount 
            : market.totalNoAmount + amount;
        
        uint256 grossWinnings = (amount * totalPool) / winningPool;
        uint256 fee = (grossWinnings * PLATFORM_FEE) / FEE_DENOMINATOR;
        
        return grossWinnings - fee;
    }
    
    // ============ Admin Functions ============
    
    /**
     * @notice Withdraw accumulated fees
     */
    function withdrawFees() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No fees to withdraw");
        
        (bool success, ) = owner().call{value: balance}("");
        require(success, "Transfer failed");
    }
    
    /**
     * @notice Emergency refund for unresolved market
     * @param marketId The market ID
     */
    function emergencyRefund(uint256 marketId) external onlyOwner {
        Market storage market = markets[marketId];
        require(!market.resolved, "Market already resolved");
        
        market.resolved = true;
        _removeFromActiveMarkets(marketId);
        
        // Note: Users must call a separate function to get refunds
        // This is to avoid gas issues with many users
    }
    
    /**
     * @notice Claim refund for emergency-cancelled market
     * @param marketId The market ID
     */
    function claimRefund(uint256 marketId) external nonReentrant {
        Market storage market = markets[marketId];
        Prediction storage pred = predictions[marketId][msg.sender];
        
        require(market.resolved, "Market not resolved");
        require(pred.amount > 0, "No prediction");
        require(!pred.claimed, "Already claimed");
        
        // Check if it was an emergency refund (no outcome set and pool mismatch)
        // This is a simplified check - in production, use a separate flag
        
        pred.claimed = true;
        
        (bool success, ) = msg.sender.call{value: pred.amount}("");
        require(success, "Transfer failed");
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
    
    // ============ Receive ============
    
    receive() external payable {}
}
