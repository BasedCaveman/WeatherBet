# WeatherBet Phase 3: Smart Contract Integration

## Overview

This document tracks the implementation of Phase 3 features:
1. ✅ USDm integration
2. ✅ AMM contract with LMSR pricing
3. ✅ Weather Oracle (Chainlink)
4. ✅ Deposit/Withdraw flows
5. 🔄 Gas sponsorship (Paymaster)

---

## Completed Components

### Smart Contracts

#### 1. WeatherBetAMM.sol
**Location:** `/contracts/WeatherBetAMM.sol`

Full AMM implementation with:
- LMSR (Logarithmic Market Scoring Rule) pricing
- USDm token integration
- User account system (balance, positions, P&L)
- Market lifecycle (create, trade, resolve)
- Position tracking per user per market

**Key Functions:**
```solidity
// User Account
deposit(uint256 amount)
withdraw(uint256 amount)
getAccount(address user) returns (UserAccount)

// Trading
buyShares(uint256 marketId, bool isYes, uint256 shares, uint256 maxCost)
sellShares(uint256 marketId, bool isYes, uint256 shares, uint256 minPayout)
claimWinnings(uint256 marketId)

// View Functions
getPrices(uint256 marketId) returns (yesPrice, noPrice)
getPosition(uint256 marketId, address user) returns (Position)
quoteBuy(uint256 marketId, bool isYes, uint256 shares) returns (cost)
quoteSell(uint256 marketId, bool isYes, uint256 shares) returns (payout)
```

#### 2. MockUSDm.sol
**Location:** `/contracts/MockUSDm.sol`

Test token with:
- Standard ERC20 functionality
- Public faucet (1000 USDm per claim, 1 hour cooldown)
- Owner mint function

#### 3. WeatherOracle.sol
**Location:** `/contracts/WeatherOracle.sol`

Chainlink integration with:
- MegaETH native Data Streams precompile support
- Location-based feed configuration
- Automatic market resolution
- Manual resolution fallback
- MockWeatherOracle for testing

---

### Frontend Integration

#### Contract Configuration
**Location:** `/src/lib/contracts.ts`

- Contract addresses for MegaETH testnet and local development
- Simplified ABIs for all contracts
- Type definitions for contract return values
- Utility functions (formatUsdm, parseUsdm, priceToPercent)

#### Hooks

##### useUsdm.ts
```typescript
// Get USDm balance
useUsdmBalance()

// Get allowance for AMM
useUsdmAllowance()

// Approve spending
useUsdmApprove() // approve(), approveMax()

// Testnet faucet
useUsdmFaucet() // claim(), canClaim, timeUntilClaim

// Combined hook
useUsdm() // All of the above
```

##### useAmm.ts
```typescript
// User account from contract
useAmmAccount() // balance, totalDeposited, winRate, etc.

// Deposit/Withdraw
useDeposit() // deposit(amount)
useWithdraw() // withdraw(amount)

// Market data
useMarket(marketId) // Full market details + prices
usePosition(marketId) // User's position in market

// Trading quotes
useQuoteBuy(marketId, isYes, shares)
useQuoteSell(marketId, isYes, shares)

// Trading actions
useBuyShares() // buyShares(marketId, isYes, shares, maxCost)
useSellShares() // sellShares(marketId, isYes, shares, minPayout)
useClaimWinnings() // claimWinnings(marketId)

// Active markets
useActiveMarkets() // List of active market IDs
```

#### Components

##### DepositWithdraw.tsx
Full deposit/withdraw modal with:
- Tab switching between deposit/withdraw
- Amount input with quick select buttons
- Automatic USDm approval when needed
- Faucet integration for testnet
- Success state with confirmation

##### Account.tsx (Updated)
Now connected to real contract data:
- Trading balance from AMM contract
- Wallet balance from USDm token
- Real P&L and win rate
- Deposit/Withdraw buttons that open modal
- Position cards (still mock data - needs usePositions)

---

## Deployment Steps

### 1. Deploy Contracts to MegaETH Testnet

```bash
# Install Foundry if not already
curl -L https://foundry.paradigm.xyz | bash
foundryup

# Create deployment script
cd contracts

# Deploy MockUSDm
forge create MockUSDm --rpc-url https://6342.rpc.thirdweb.com --private-key $PRIVATE_KEY

# Deploy WeatherBetAMM (with USDm and treasury addresses)
forge create WeatherBetAMM --rpc-url https://6342.rpc.thirdweb.com --private-key $PRIVATE_KEY --constructor-args $USDM_ADDRESS $TREASURY_ADDRESS

# Deploy MockWeatherOracle
forge create MockWeatherOracle --rpc-url https://6342.rpc.thirdweb.com --private-key $PRIVATE_KEY --constructor-args $AMM_ADDRESS

# Set oracle on AMM
cast send $AMM_ADDRESS "setOracle(address)" $ORACLE_ADDRESS --rpc-url https://6342.rpc.thirdweb.com --private-key $PRIVATE_KEY
```

### 2. Update Contract Addresses

Edit `/src/lib/contracts.ts`:
```typescript
6342: {
  weatherBetAMM: "0x...", // Deployed address
  usdm: "0x...",          // Deployed address
  weatherOracle: "0x...", // Deployed address
},
```

### 3. Create Initial Markets

```bash
# Create a rain market for São Paulo (7 days, 25mm historical avg)
cast send $AMM_ADDRESS "createMarket(uint8,bytes32,uint256,int256,uint256)" \
  0 \  # RAIN
  $(cast keccak256 "sao-paulo") \
  604800 \  # 7 days
  2500 \    # 25mm scaled by 100
  1000000000000000000000 \  # 1000 USDm liquidity
  --rpc-url https://6342.rpc.thirdweb.com --private-key $PRIVATE_KEY
```

---

## Remaining Tasks

### High Priority

- [ ] **Deploy contracts to MegaETH testnet**
- [ ] **Update contract addresses in frontend**
- [ ] **Test full deposit → trade → withdraw flow**
- [ ] **Add real position tracking** (usePositions hook)
- [ ] **Connect MarketCard to real contract data**

### Medium Priority

- [ ] **Gas sponsorship / Paymaster integration**
  - Research MegaETH paymaster options
  - Implement sponsoredTxCount tracking
  - Auto-sponsor first 10 transactions

- [ ] **Transaction history**
  - Index events from contract
  - Display in Account modal

- [ ] **Error handling improvements**
  - User-friendly error messages
  - Transaction failure recovery

### Low Priority

- [ ] **Market creation UI** (admin only)
- [ ] **Oracle configuration UI** (admin only)
- [ ] **Analytics dashboard**

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                │
│  Next.js 14 + TypeScript + Reown AppKit + Wagmi                │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │  useUsdm    │  │   useAmm    │  │     Components          │ │
│  │  - balance  │  │  - account  │  │  - DepositWithdraw     │ │
│  │  - approve  │  │  - deposit  │  │  - Account             │ │
│  │  - faucet   │  │  - buyShares│  │  - MarketCard          │ │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      SMART CONTRACTS                            │
│                     MegaETH (Chain ID: 6342)                   │
│                                                                 │
│  ┌──────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │   MockUSDm   │  │  WeatherBetAMM   │  │  WeatherOracle   │  │
│  │  - transfer  │  │  - deposit       │  │  - resolve       │  │
│  │  - approve   │  │  - buyShares     │  │  - configFeed    │  │
│  │  - faucet    │  │  - sellShares    │  │                  │  │
│  └──────────────┘  └──────────────────┘  └──────────────────┘  │
│                              │                    │             │
│                              └────────────────────┘             │
│                                      ▼                          │
│                           ┌──────────────────┐                  │
│                           │ Chainlink Oracle │                  │
│                           │   (Precompile)   │                  │
│                           └──────────────────┘                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Testing Checklist

### Unit Tests (Contracts)
- [ ] MockUSDm: mint, transfer, faucet
- [ ] WeatherBetAMM: deposit, withdraw, buyShares, sellShares
- [ ] WeatherBetAMM: LMSR pricing accuracy
- [ ] WeatherOracle: resolution flow

### Integration Tests (Frontend)
- [ ] Connect wallet via social login
- [ ] Claim from faucet
- [ ] Approve USDm spending
- [ ] Deposit USDm to AMM
- [ ] Buy YES/NO shares
- [ ] View position and P&L
- [ ] Sell shares
- [ ] Claim winnings after resolution
- [ ] Withdraw USDm

### E2E Tests
- [ ] Full user journey: signup → deposit → trade → withdraw
- [ ] Multi-user scenario: two users trading same market
- [ ] Market resolution and payout distribution

---

## Notes

### LMSR Pricing

The AMM uses LMSR (Logarithmic Market Scoring Rule) for price discovery:

```
Price(YES) = e^(q_yes/b) / (e^(q_yes/b) + e^(q_no/b))
```

Where:
- `q_yes` = total YES shares outstanding
- `q_no` = total NO shares outstanding
- `b` = liquidity parameter (higher = more stable prices)

Initial state (q_yes = q_no = 0): Price = 50% for both YES and NO

### Gas Costs (Estimated)

| Operation | Gas | Cost (@ $0.001/100k gas) |
|-----------|-----|--------------------------|
| Deposit | ~70k | $0.0007 |
| Buy Shares | ~120k | $0.0012 |
| Sell Shares | ~100k | $0.001 |
| Claim Winnings | ~80k | $0.0008 |
| Withdraw | ~60k | $0.0006 |

MegaETH's sub-cent fees make micro-transactions viable.
