// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title WeatherOracle - Chainlink Integration for Weather Data
 * @notice Fetches weather data from Chainlink oracles and resolves markets
 * @dev MegaETH has native Chainlink Data Streams precompile for sub-second latency
 */
interface IWeatherBetAMM {
    function resolveMarket(uint256 marketId, int256 actualValue) external;
}

interface IChainlinkDataStreams {
    // MegaETH native precompile interface for Chainlink Data Streams
    function getLatestValue(bytes32 feedId) external view returns (int256 value, uint256 timestamp);
}

contract WeatherOracle is Ownable {
    // ============ Types ============
    
    struct WeatherRequest {
        uint256 marketId;
        bytes32 locationHash;
        uint256 requestTime;
        bool fulfilled;
        int256 actualValue;
    }
    
    struct LocationFeed {
        bytes32 rainFeedId;      // Chainlink feed ID for precipitation
        bytes32 tempFeedId;      // Chainlink feed ID for temperature
        bool active;
    }
    
    // ============ State Variables ============
    
    IWeatherBetAMM public weatherBetAMM;
    IChainlinkDataStreams public chainlinkDataStreams;
    
    // MegaETH Chainlink Data Streams precompile address
    address public constant CHAINLINK_PRECOMPILE = 0x0000000000000000000000000000000000000808;
    
    // Location => Feed configuration
    mapping(bytes32 => LocationFeed) public locationFeeds;
    
    // Request tracking
    mapping(uint256 => WeatherRequest) public requests;
    uint256 public requestCount;
    
    // Authorized resolvers (for manual resolution if needed)
    mapping(address => bool) public authorizedResolvers;
    
    // ============ Events ============
    
    event WeatherDataRequested(uint256 indexed requestId, uint256 indexed marketId, bytes32 locationHash);
    event WeatherDataFulfilled(uint256 indexed requestId, uint256 indexed marketId, int256 actualValue);
    event LocationFeedConfigured(bytes32 indexed locationHash, bytes32 rainFeedId, bytes32 tempFeedId);
    event ResolverAuthorized(address indexed resolver, bool authorized);
    
    // ============ Constructor ============
    
    constructor(address _weatherBetAMM) Ownable(msg.sender) {
        weatherBetAMM = IWeatherBetAMM(_weatherBetAMM);
        chainlinkDataStreams = IChainlinkDataStreams(CHAINLINK_PRECOMPILE);
    }
    
    // ============ Oracle Functions ============
    
    /**
     * @notice Configure Chainlink feeds for a location
     * @param locationHash Keccak256 hash of location coordinates
     * @param rainFeedId Chainlink feed ID for precipitation data
     * @param tempFeedId Chainlink feed ID for temperature data
     */
    function configureLocationFeed(
        bytes32 locationHash,
        bytes32 rainFeedId,
        bytes32 tempFeedId
    ) external onlyOwner {
        locationFeeds[locationHash] = LocationFeed({
            rainFeedId: rainFeedId,
            tempFeedId: tempFeedId,
            active: true
        });
        
        emit LocationFeedConfigured(locationHash, rainFeedId, tempFeedId);
    }
    
    /**
     * @notice Request weather data and resolve market
     * @param marketId Market to resolve
     * @param locationHash Location hash for feed lookup
     * @param isRainMarket true for rain market, false for temperature
     */
    function requestResolution(
        uint256 marketId,
        bytes32 locationHash,
        bool isRainMarket
    ) external {
        require(
            msg.sender == owner() || authorizedResolvers[msg.sender],
            "Not authorized"
        );
        
        LocationFeed storage feed = locationFeeds[locationHash];
        require(feed.active, "Location feed not configured");
        
        uint256 requestId = ++requestCount;
        
        requests[requestId] = WeatherRequest({
            marketId: marketId,
            locationHash: locationHash,
            requestTime: block.timestamp,
            fulfilled: false,
            actualValue: 0
        });
        
        emit WeatherDataRequested(requestId, marketId, locationHash);
        
        // Fetch data from Chainlink Data Streams
        bytes32 feedId = isRainMarket ? feed.rainFeedId : feed.tempFeedId;
        
        try chainlinkDataStreams.getLatestValue(feedId) returns (int256 value, uint256 timestamp) {
            // Ensure data is fresh (within last hour)
            require(block.timestamp - timestamp < 1 hours, "Stale data");
            
            requests[requestId].fulfilled = true;
            requests[requestId].actualValue = value;
            
            // Resolve the market
            weatherBetAMM.resolveMarket(marketId, value);
            
            emit WeatherDataFulfilled(requestId, marketId, value);
        } catch {
            // If Chainlink fails, allow manual resolution
            revert("Chainlink fetch failed - use manual resolution");
        }
    }
    
    /**
     * @notice Manual resolution for when Chainlink is unavailable
     * @param marketId Market to resolve
     * @param actualValue Actual weather value (verified off-chain)
     */
    function manualResolve(
        uint256 marketId,
        int256 actualValue
    ) external {
        require(
            msg.sender == owner() || authorizedResolvers[msg.sender],
            "Not authorized"
        );
        
        weatherBetAMM.resolveMarket(marketId, actualValue);
    }
    
    /**
     * @notice Get latest weather data for a location (view only)
     * @param locationHash Location hash
     * @param isRainMarket true for rain, false for temperature
     */
    function getLatestWeatherData(
        bytes32 locationHash,
        bool isRainMarket
    ) external view returns (int256 value, uint256 timestamp) {
        LocationFeed storage feed = locationFeeds[locationHash];
        require(feed.active, "Location feed not configured");
        
        bytes32 feedId = isRainMarket ? feed.rainFeedId : feed.tempFeedId;
        
        return chainlinkDataStreams.getLatestValue(feedId);
    }
    
    // ============ Admin Functions ============
    
    function setWeatherBetAMM(address _weatherBetAMM) external onlyOwner {
        weatherBetAMM = IWeatherBetAMM(_weatherBetAMM);
    }
    
    function setAuthorizedResolver(address resolver, bool authorized) external onlyOwner {
        authorizedResolvers[resolver] = authorized;
        emit ResolverAuthorized(resolver, authorized);
    }
    
    function deactivateLocationFeed(bytes32 locationHash) external onlyOwner {
        locationFeeds[locationHash].active = false;
    }
}


/**
 * @title MockWeatherOracle - For testing without Chainlink
 * @notice Simulates oracle behavior on testnet
 */
contract MockWeatherOracle is Ownable {
    IWeatherBetAMM public weatherBetAMM;
    
    // Simulated weather data: locationHash => (isRain => value)
    mapping(bytes32 => mapping(bool => int256)) public mockData;
    
    event MockDataSet(bytes32 indexed locationHash, bool isRain, int256 value);
    
    constructor(address _weatherBetAMM) Ownable(msg.sender) {
        weatherBetAMM = IWeatherBetAMM(_weatherBetAMM);
    }
    
    /**
     * @notice Set mock weather data for testing
     */
    function setMockData(bytes32 locationHash, bool isRain, int256 value) external onlyOwner {
        mockData[locationHash][isRain] = value;
        emit MockDataSet(locationHash, isRain, value);
    }
    
    /**
     * @notice Resolve market with mock data
     */
    function resolveWithMockData(
        uint256 marketId,
        bytes32 locationHash,
        bool isRainMarket
    ) external onlyOwner {
        int256 value = mockData[locationHash][isRainMarket];
        weatherBetAMM.resolveMarket(marketId, value);
    }
    
    /**
     * @notice Direct resolution with any value
     */
    function resolveMarket(uint256 marketId, int256 actualValue) external onlyOwner {
        weatherBetAMM.resolveMarket(marketId, actualValue);
    }
    
    function setWeatherBetAMM(address _weatherBetAMM) external onlyOwner {
        weatherBetAMM = IWeatherBetAMM(_weatherBetAMM);
    }
}
