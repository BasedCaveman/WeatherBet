# WeatherBet Protocol v2.0 - Technical Design

## Executive Summary

WeatherBet is a weather prediction market protocol built on MegaETH, designed for rural communities to hedge against adverse weather conditions. The protocol uses an AMM (Automated Market Maker) model similar to Polymarket for zero-fee trading while capturing spread revenue.

---

## Key Design Decisions

### 1. Stablecoin: USDm (MegaETH Native)

**Why USDm over ETH/USDC:**

| Feature | USDm | ETH | USDC |
|---------|------|-----|------|
| Volatility | ✅ None | ❌ High | ✅ None |
| Native to MegaETH | ✅ Yes | ⚠️ Bridged | ⚠️ Bridged |
| Yield backing | ✅ BlackRock BUIDL | ❌ No | ❌ No |
| Sub-cent gas fees | ✅ Optimized | ⚠️ Variable | ⚠️ Variable |

**USDm Benefits:**
- Backed by Ethena/BlackRock BUIDL (U.S. Treasuries)
- Native stablecoin = lowest fees on MegaETH
- Yield from reserves can subsidize protocol operations
- Users see stable USD values (no conversion confusion)

### 2. Authentication: Social-First with Wallet Fallback

**Primary Options (One-Click):**
- 🌐 Google (most universal)
- 🍎 Apple ID (iOS users)

**Advanced Options (Dropdown):**
- 📧 Email
- 𝕏 X (Twitter)
- 📘 Facebook
- 🎵 TikTok (via email)
- 👛 Connect Wallet (for crypto natives)

**Technical Implementation:**
- Reown AppKit handles all auth
- Creates Smart Account (ERC-4337) automatically
- Gas sponsorship = users never need ETH for gas
- Users can upgrade to self-custody later

### 3. Oracle: Chainlink Data Streams (Native Precompile)

MegaETH has Chainlink Data Streams as a **native precompile**, meaning:
- Sub-second latency oracle data
- Zero integration overhead
- Direct smart contract access to weather data
- No external calls needed

**Weather Resolution Flow:**
```
1. Market ends (7-day period closes)
2. Smart contract reads Chainlink weather data
3. Compare actual vs historical average
4. Auto-resolve market
5. Distribute winnings
```

---

## AMM & Revenue Model (Polymarket Style)

### Zero-Fee Trading with Implicit Revenue

Instead of charging explicit fees, WeatherBet captures value through AMM spread:

```
┌─────────────────────────────────────────────────────────┐
│                    AMM MECHANICS                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Constant Product AMM: x * y = k                        │
│                                                         │
│  Where:                                                 │
│  - x = YES share liquidity                              │
│  - y = NO share liquidity                               │
│  - k = constant product                                 │
│                                                         │
│  Example Trade:                                         │
│  User buys YES at $0.52                                 │
│  Curve adjusts, next sell would be at $0.51            │
│  $0.01 spread stays in pool = PROTOCOL REVENUE         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Treasury Management

```
┌─────────────────────────────────────────────────────────┐
│                  TREASURY FLOWS                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  INFLOWS:                                               │
│  ├── AMM spread accumulation (primary)                  │
│  ├── USDm yield from reserves                           │
│  └── Liquidity provision fees (future)                  │
│                                                         │
│  OUTFLOWS:                                              │
│  ├── Gas sponsorship for users                          │
│  ├── Oracle costs (minimal on MegaETH)                  │
│  ├── Liquidity incentives                               │
│  └── Protocol development                               │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Pricing Curve

Using LMSR (Logarithmic Market Scoring Rule) like Polymarket:

```solidity
// Price calculation
price_yes = e^(q_yes/b) / (e^(q_yes/b) + e^(q_no/b))

// Where:
// q_yes = quantity of YES shares outstanding
// q_no = quantity of NO shares outstanding  
// b = liquidity parameter (controls spread)
```

---

## Smart Contract Architecture

### Core Contracts

```
contracts/
├── WeatherBetAMM.sol          # Main AMM logic
├── MarketFactory.sol          # Creates new markets
├── WeatherOracle.sol          # Chainlink integration
├── Treasury.sol               # Revenue management
├── UserAccount.sol            # Position tracking
└── interfaces/
    ├── IWeatherBetAMM.sol
    ├── IChainlinkWeather.sol
    └── IUSDm.sol
```

### WeatherBetAMM.sol - Core Functions

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/IUSDm.sol";
import "./interfaces/IChainlinkWeather.sol";

contract WeatherBetAMM {
    // Market structure
    struct Market {
        uint256 id;
        bytes32 locationHash;      // keccak256(lat, lon)
        MarketType marketType;     // RAIN or TEMPERATURE
        uint256 startTime;
        uint256 endTime;
        uint256 yesShares;         // Total YES shares outstanding
        uint256 noShares;          // Total NO shares outstanding
        uint256 liquidityParam;    // 'b' in LMSR
        bool resolved;
        bool outcome;
        uint256 historicalAvg;     // 10-year average from oracle
    }

    // User position
    struct Position {
        uint256 yesShares;
        uint256 noShares;
        uint256 avgBuyPrice;       // For P&L calculation
    }

    // State
    IUSDm public usdm;
    IChainlinkWeather public oracle;
    address public treasury;
    
    mapping(uint256 => Market) public markets;
    mapping(uint256 => mapping(address => Position)) public positions;
    mapping(address => uint256) public userBalance;  // USDm balance
    
    uint256 public nextMarketId;
    uint256 public constant PRECISION = 1e18;
    
    // Events
    event SharesPurchased(uint256 indexed marketId, address indexed user, bool isYes, uint256 shares, uint256 cost);
    event SharesSold(uint256 indexed marketId, address indexed user, bool isYes, uint256 shares, uint256 payout);
    event MarketResolved(uint256 indexed marketId, bool outcome);
    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);

    // ============ CORE AMM FUNCTIONS ============

    /// @notice Buy shares in a market
    /// @param marketId The market to trade
    /// @param isYes True for YES shares, false for NO
    /// @param maxCost Maximum USDm willing to spend
    /// @param shares Number of shares to buy
    function buyShares(
        uint256 marketId,
        bool isYes,
        uint256 shares,
        uint256 maxCost
    ) external returns (uint256 cost) {
        Market storage market = markets[marketId];
        require(!market.resolved, "Market resolved");
        require(block.timestamp < market.endTime, "Market ended");

        // Calculate cost using LMSR
        cost = _calculateBuyCost(market, isYes, shares);
        require(cost <= maxCost, "Cost exceeds max");
        require(userBalance[msg.sender] >= cost, "Insufficient balance");

        // Update balances
        userBalance[msg.sender] -= cost;
        
        // Update market state
        if (isYes) {
            market.yesShares += shares;
            positions[marketId][msg.sender].yesShares += shares;
        } else {
            market.noShares += shares;
            positions[marketId][msg.sender].noShares += shares;
        }

        // Spread goes to treasury implicitly (stays in pool)
        emit SharesPurchased(marketId, msg.sender, isYes, shares, cost);
    }

    /// @notice Sell shares back to the AMM
    function sellShares(
        uint256 marketId,
        bool isYes,
        uint256 shares,
        uint256 minPayout
    ) external returns (uint256 payout) {
        Market storage market = markets[marketId];
        require(!market.resolved, "Market resolved");

        Position storage pos = positions[marketId][msg.sender];
        if (isYes) {
            require(pos.yesShares >= shares, "Insufficient shares");
            pos.yesShares -= shares;
            market.yesShares -= shares;
        } else {
            require(pos.noShares >= shares, "Insufficient shares");
            pos.noShares -= shares;
            market.noShares -= shares;
        }

        // Calculate payout using LMSR
        payout = _calculateSellPayout(market, isYes, shares);
        require(payout >= minPayout, "Payout below min");

        userBalance[msg.sender] += payout;
        emit SharesSold(marketId, msg.sender, isYes, shares, payout);
    }

    /// @notice Resolve market using Chainlink oracle
    function resolveMarket(uint256 marketId) external {
        Market storage market = markets[marketId];
        require(!market.resolved, "Already resolved");
        require(block.timestamp >= market.endTime, "Market not ended");

        // Get actual weather data from Chainlink precompile
        uint256 actualValue = oracle.getWeatherData(
            market.locationHash,
            market.marketType,
            market.startTime,
            market.endTime
        );

        // Compare to historical average
        market.outcome = actualValue > market.historicalAvg;
        market.resolved = true;

        emit MarketResolved(marketId, market.outcome);
    }

    /// @notice Claim winnings after resolution
    function claimWinnings(uint256 marketId) external returns (uint256 payout) {
        Market storage market = markets[marketId];
        require(market.resolved, "Not resolved");

        Position storage pos = positions[marketId][msg.sender];
        
        uint256 winningShares = market.outcome ? pos.yesShares : pos.noShares;
        require(winningShares > 0, "No winning position");

        // Each winning share pays out $1
        payout = winningShares * PRECISION;
        
        // Clear position
        pos.yesShares = 0;
        pos.noShares = 0;

        userBalance[msg.sender] += payout;
    }

    // ============ LMSR PRICING ============

    function _calculateBuyCost(
        Market storage market,
        bool isYes,
        uint256 shares
    ) internal view returns (uint256) {
        uint256 b = market.liquidityParam;
        
        uint256 oldCost = _lmsrCost(market.yesShares, market.noShares, b);
        
        uint256 newYes = isYes ? market.yesShares + shares : market.yesShares;
        uint256 newNo = isYes ? market.noShares : market.noShares + shares;
        
        uint256 newCost = _lmsrCost(newYes, newNo, b);
        
        return newCost - oldCost;
    }

    function _calculateSellPayout(
        Market storage market,
        bool isYes,
        uint256 shares
    ) internal view returns (uint256) {
        uint256 b = market.liquidityParam;
        
        uint256 oldCost = _lmsrCost(market.yesShares, market.noShares, b);
        
        uint256 newYes = isYes ? market.yesShares - shares : market.yesShares;
        uint256 newNo = isYes ? market.noShares : market.noShares - shares;
        
        uint256 newCost = _lmsrCost(newYes, newNo, b);
        
        return oldCost - newCost;
    }

    /// @notice LMSR cost function: b * ln(e^(q_yes/b) + e^(q_no/b))
    function _lmsrCost(uint256 qYes, uint256 qNo, uint256 b) internal pure returns (uint256) {
        // Implementation uses fixed-point math library
        // Simplified for illustration
        int256 expYes = _exp(int256(qYes * PRECISION / b));
        int256 expNo = _exp(int256(qNo * PRECISION / b));
        return uint256(_ln(expYes + expNo)) * b / PRECISION;
    }

    // ============ USER ACCOUNT ============

    function deposit(uint256 amount) external {
        usdm.transferFrom(msg.sender, address(this), amount);
        userBalance[msg.sender] += amount;
        emit Deposited(msg.sender, amount);
    }

    function withdraw(uint256 amount) external {
        require(userBalance[msg.sender] >= amount, "Insufficient balance");
        userBalance[msg.sender] -= amount;
        usdm.transfer(msg.sender, amount);
        emit Withdrawn(msg.sender, amount);
    }

    // ============ VIEW FUNCTIONS ============

    function getPrice(uint256 marketId, bool isYes) external view returns (uint256) {
        Market storage market = markets[marketId];
        uint256 b = market.liquidityParam;
        
        int256 expYes = _exp(int256(market.yesShares * PRECISION / b));
        int256 expNo = _exp(int256(market.noShares * PRECISION / b));
        
        if (isYes) {
            return uint256(expYes * int256(PRECISION) / (expYes + expNo));
        } else {
            return uint256(expNo * int256(PRECISION) / (expYes + expNo));
        }
    }

    function getVolume(uint256 marketId) external view returns (uint256 yesVol, uint256 noVol) {
        Market storage market = markets[marketId];
        return (market.yesShares, market.noShares);
    }

    function getUserPosition(
        uint256 marketId,
        address user
    ) external view returns (
        uint256 yesShares,
        uint256 noShares,
        uint256 yesValue,
        uint256 noValue
    ) {
        Position storage pos = positions[marketId][user];
        Market storage market = markets[marketId];
        
        yesShares = pos.yesShares;
        noShares = pos.noShares;
        
        // Current value at market prices
        uint256 yesPrice = this.getPrice(marketId, true);
        uint256 noPrice = this.getPrice(marketId, false);
        
        yesValue = yesShares * yesPrice / PRECISION;
        noValue = noShares * noPrice / PRECISION;
    }

    // Math helpers (would use PRBMath or similar in production)
    function _exp(int256 x) internal pure returns (int256) {
        // Exponential approximation
        // Use PRBMathSD59x18.exp() in production
    }

    function _ln(int256 x) internal pure returns (int256) {
        // Natural log approximation
        // Use PRBMathSD59x18.ln() in production
    }
}
```

---

## User Account System

### Account Dashboard Features

```
┌─────────────────────────────────────────────────────────┐
│  👤 Account                                    [Logout] │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  💰 Balance: $125.50 USDm                              │
│  [Deposit] [Withdraw]                                   │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  📊 Open Positions (2)                                  │
│                                                         │
│  São Paulo Rain - YES                                   │
│  Shares: 50 @ $0.52 avg                                │
│  Current: $0.58 (+$3.00 / +11.5%)                      │
│                                                         │
│  London Temp - NO                                       │
│  Shares: 25 @ $0.45 avg                                │
│  Current: $0.42 (-$0.75 / -6.7%)                       │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  📈 Performance                                         │
│                                                         │
│  This Week:     +$12.50 (+8.2%)                        │
│  This Month:    +$45.00 (+22.1%)                       │
│  All Time:      +$125.50 (+150.6%)                     │
│                                                         │
│  Win Rate: 68% (17/25 markets)                         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Position Tracking Schema

```typescript
interface UserAccount {
  address: string;
  socialProvider?: 'google' | 'apple' | 'email' | 'x' | 'wallet';
  email?: string;
  
  // Balances
  usdmBalance: bigint;
  
  // Positions
  openPositions: Position[];
  closedPositions: Position[];
  
  // Performance
  totalDeposited: bigint;
  totalWithdrawn: bigint;
  totalWinnings: bigint;
  totalLosses: bigint;
  
  // Stats
  marketsParticipated: number;
  marketsWon: number;
  marketsLost: number;
}

interface Position {
  marketId: number;
  side: 'YES' | 'NO';
  shares: bigint;
  avgEntryPrice: bigint;
  currentPrice: bigint;
  unrealizedPnL: bigint;
  realizedPnL: bigint;
  openedAt: Date;
  closedAt?: Date;
}
```

---

## Market Card UI with Volume

```
┌─────────────────────────────────────────────────────────┐
│  📍 São Paulo, Brazil                        [Change]   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│         💧 🌧️ 💧                                        │
│                                                         │
│   More rain than average this week?                     │
│                                                         │
│   Forecast: 45mm  |  10y Avg: 38mm                     │
│                                                         │
│  ┌─────────────────┬─────────────────┐                 │
│  │   🌧️ YES        │    ☀️ NO        │                 │
│  │                 │                 │                 │
│  │    $0.58       │    $0.42       │                 │
│  │   58% chance   │   42% chance   │                 │
│  │                 │                 │                 │
│  │  Vol: $12,450  │  Vol: $8,920   │                 │
│  └─────────────────┴─────────────────┘                 │
│                                                         │
│  Total Volume: $21,370          ⏰ 5 days left          │
│                                                         │
│  ━━━━━━━━━━━━━━━━━░░░░░░░░                             │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Implementation Phases

### Phase 3A: Social Login & USDm (This Sprint)
- [ ] Update Reown config for social login (Google, Apple primary)
- [ ] Add "Advanced" dropdown for wallet connect
- [ ] Integrate USDm token contract
- [ ] Update all displays to show USDm ($) values
- [ ] Add deposit/withdraw flows

### Phase 3B: Account System
- [ ] Create Account page/modal
- [ ] Show balance, positions, P&L
- [ ] Add deposit/withdraw buttons
- [ ] Transaction history

### Phase 3C: AMM Integration
- [ ] Deploy WeatherBetAMM contract
- [ ] Connect frontend to contract
- [ ] Show real-time prices and volume
- [ ] Implement buy/sell flows

### Phase 3D: Oracle & Resolution
- [ ] Integrate Chainlink weather precompile
- [ ] Auto-resolution system
- [ ] Claim winnings flow

---

## Security Considerations

1. **Smart Account Security**
   - Reown handles key management
   - Users can export/upgrade to self-custody
   - Social recovery via email

2. **AMM Security**
   - Maximum position limits
   - Circuit breakers for unusual activity
   - Time-weighted average price (TWAP) for large trades

3. **Oracle Security**
   - Chainlink provides decentralized data
   - Multiple data sources aggregated
   - Dispute period before final resolution

---

## Gas & Cost Structure

| Action | Estimated Gas | Cost (MegaETH) |
|--------|--------------|----------------|
| Buy Shares | ~100k | < $0.01 |
| Sell Shares | ~80k | < $0.01 |
| Claim Winnings | ~60k | < $0.01 |
| Deposit USDm | ~50k | < $0.01 |

**Gas Sponsorship:**
- First 10 transactions free per user
- Protocol covers gas from treasury
- Heavy users pay own gas

---

## Conclusion

WeatherBet v2.0 leverages MegaETH's unique capabilities:
- **USDm** for stable, yield-backed currency
- **Chainlink precompile** for native oracle access
- **Sub-cent fees** for accessible trading
- **Social login** for mass adoption
- **AMM spread** for sustainable revenue

This positions WeatherBet as the go-to weather hedging platform for global rural communities.
