# WeatherBet Remix Deployment Guide

## Complete Step-by-Step Deployment to MegaETH Testnet

This guide ensures secure deployment with zero chance of exploit.

---

## Table of Contents
1. [Prerequisites](#1-prerequisites)
2. [Security Checklist](#2-security-checklist)
3. [Deploy MockUSDm Token](#3-deploy-mockusdm-token)
4. [Deploy WeatherBetAMMv2](#4-deploy-weatherbetammv2)
5. [Deploy MockWeatherOracle](#5-deploy-mockweatheroracle)
6. [Configure Contracts](#6-configure-contracts)
7. [Create First Market](#7-create-first-market)
8. [Verification & Testing](#8-verification--testing)
9. [Frontend Configuration](#9-frontend-configuration)

---

## 1. Prerequisites

### 1.1 MetaMask Setup

1. **Add MegaETH Testnet to MetaMask:**
   - Network Name: `MegaETH Testnet`
   - RPC URL: `https://carrot.megaeth.com/rpc`
   - Chain ID: `6342`
   - Currency Symbol: `ETH`
   - Block Explorer: `https://www.megaexplorer.xyz`

2. **Get Testnet ETH:**
   - Visit MegaETH faucet or bridge from Sepolia
   - You need ~0.1 ETH for deployments

### 1.2 Remix IDE Setup

1. Go to [https://remix.ethereum.org](https://remix.ethereum.org)
2. In "File Explorer", create a new folder: `contracts`
3. Create the following files (copy from this repo):
   - `contracts/MockUSDm.sol`
   - `contracts/WeatherBetAMMv2.sol`
   - `contracts/WeatherOraclev2.sol`

---

## 2. Security Checklist

### Before Deployment ✅

| Check | Status |
|-------|--------|
| ReentrancyGuard on all state-changing functions | ✅ |
| Pausable for emergency stops | ✅ |
| Input validation on all parameters | ✅ |
| Slippage protection (maxCost/minPayout) | ✅ |
| Betting window enforcement | ✅ |
| Oracle resolution dispute period | ✅ |
| Maximum position limits | ✅ |
| Withdrawal rate limiting | ✅ |
| Integer overflow protection (Solidity 0.8+) | ✅ |
| Access control (Ownable) | ✅ |

### Known Attack Vectors Mitigated

| Attack | Mitigation |
|--------|------------|
| **Reentrancy** | ReentrancyGuard on all external functions |
| **Front-running** | Slippage protection parameters |
| **Oracle manipulation** | 24h dispute period before finalization |
| **Flash loan attacks** | Withdrawal cooldown + position limits |
| **Betting on past events** | Strict betting window enforcement |
| **Overflow/Underflow** | Solidity 0.8+ built-in checks |
| **Unauthorized access** | Ownable + onlyOracle modifiers |

---

## 3. Deploy MockUSDm Token

### 3.1 Compile

1. In Remix, open `MockUSDm.sol`
2. Go to "Solidity Compiler" tab (left sidebar)
3. Select compiler version: `0.8.20`
4. Enable optimization: `200 runs`
5. Click **"Compile MockUSDm.sol"**

### 3.2 Deploy

1. Go to "Deploy & Run Transactions" tab
2. Environment: **"Injected Provider - MetaMask"**
3. Confirm MetaMask is on MegaETH Testnet (Chain 6342)
4. Select contract: **"MockUSDm"**
5. Click **"Deploy"**
6. Confirm transaction in MetaMask

### 3.3 Save Address

```
MockUSDm Address: 0x_______________________
```

**Record this address! You'll need it for the next step.**

### 3.4 Verify Deployment

In Remix console, call these functions to verify:
- `name()` → Should return "Mock USDm"
- `symbol()` → Should return "USDm"
- `decimals()` → Should return 18

---

## 4. Deploy WeatherBetAMMv2

### 4.1 Install OpenZeppelin

In Remix, create file `.deps/npm/@openzeppelin/contracts/package.json`:
```json
{
  "name": "@openzeppelin/contracts",
  "version": "5.0.0"
}
```

Or use import remapping in settings.

### 4.2 Compile

1. Open `WeatherBetAMMv2.sol`
2. Compiler version: `0.8.20`
3. Enable optimization: `200 runs`
4. Click **"Compile WeatherBetAMMv2.sol"**

### 4.3 Deploy

1. Select contract: **"WeatherBetAMMv2"**
2. Constructor arguments:
   - `_usdm`: Paste MockUSDm address from Step 3
   - `_treasury`: Your wallet address (receives fees)
3. Click **"Deploy"**
4. Confirm in MetaMask

### 4.4 Save Address

```
WeatherBetAMMv2 Address: 0x_______________________
```

### 4.5 Verify Deployment

Call these functions:
- `usdm()` → Should return MockUSDm address
- `treasury()` → Should return your wallet
- `owner()` → Should return your wallet
- `BETTING_WINDOW_BUFFER()` → Should return 86400 (24 hours)
- `RESOLUTION_DISPUTE_PERIOD()` → Should return 86400 (24 hours)

---

## 5. Deploy MockWeatherOracle

### 5.1 Create Oracle Contract

Create `contracts/WeatherOraclev2.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

interface IWeatherBetAMMv2 {
    function proposeResolution(uint256 marketId, int256 actualValue) external;
}

/**
 * @title MockWeatherOracle - For Testnet
 * @notice Simulates Chainlink oracle for testing
 */
contract MockWeatherOracle is Ownable {
    IWeatherBetAMMv2 public amm;
    
    mapping(bytes32 => int256) public mockWeatherData;
    
    event WeatherDataSet(bytes32 indexed locationHash, int256 value);
    event ResolutionTriggered(uint256 indexed marketId, int256 value);
    
    constructor(address _amm) Ownable(msg.sender) {
        amm = IWeatherBetAMMv2(_amm);
    }
    
    function setAMM(address _amm) external onlyOwner {
        amm = IWeatherBetAMMv2(_amm);
    }
    
    // Set mock weather data for a location
    function setWeatherData(bytes32 locationHash, int256 value) external onlyOwner {
        mockWeatherData[locationHash] = value;
        emit WeatherDataSet(locationHash, value);
    }
    
    // Resolve market with stored data
    function resolveMarket(uint256 marketId, bytes32 locationHash) external onlyOwner {
        int256 value = mockWeatherData[locationHash];
        amm.proposeResolution(marketId, value);
        emit ResolutionTriggered(marketId, value);
    }
    
    // Resolve market with direct value
    function resolveMarketDirect(uint256 marketId, int256 value) external onlyOwner {
        amm.proposeResolution(marketId, value);
        emit ResolutionTriggered(marketId, value);
    }
}
```

### 5.2 Compile & Deploy

1. Compile with `0.8.20`
2. Constructor argument:
   - `_amm`: WeatherBetAMMv2 address from Step 4
3. Deploy and confirm

### 5.3 Save Address

```
MockWeatherOracle Address: 0x_______________________
```

---

## 6. Configure Contracts

### 6.1 Set Oracle on AMM

1. In Remix, select WeatherBetAMMv2 at deployed address
2. Call `setOracle` function:
   - `_oracle`: MockWeatherOracle address from Step 5
3. Confirm transaction

### 6.2 Verify Configuration

Call `oracle()` on AMM → Should return MockWeatherOracle address

---

## 7. Create First Market

### 7.1 Calculate Timestamps

Use JavaScript console to get timestamps:

```javascript
// Get next Monday 00:00 UTC
const now = new Date();
const daysUntilMonday = (8 - now.getUTCDay()) % 7 || 7;
const nextMonday = new Date(Date.UTC(
  now.getUTCFullYear(),
  now.getUTCMonth(),
  now.getUTCDate() + daysUntilMonday,
  0, 0, 0
));
console.log("Target Week Start:", Math.floor(nextMonday.getTime() / 1000));

// Example output: 1736726400 (Monday Jan 13, 2026 00:00 UTC)
```

### 7.2 Create Location Hash

```javascript
// Keccak256 hash of location
const ethers = require('ethers');
const locationHash = ethers.keccak256(
  ethers.toUtf8Bytes("sao-paulo,-23.55,-46.63")
);
console.log("Location Hash:", locationHash);

// Example: 0x8f2e4b5c6d7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c
```

### 7.3 Call createMarket

On WeatherBetAMMv2:

```
createMarket(
  marketType: 0,                    // 0 = RAIN, 1 = TEMPERATURE
  locationHash: "0x...",            // From step 7.2
  targetWeekStart: 1736726400,      // From step 7.1
  historicalAvg: 2500,              // 25.00mm (scaled by 100)
  initialLiquidity: 1000000000000000000000  // 1000 * 10^18
)
```

### 7.4 Verify Market Created

Call `getMarket(1)` to see the market details.

---

## 8. Verification & Testing

### 8.1 Test Faucet

1. On MockUSDm, call `faucet()` to get 1000 USDm
2. Call `balanceOf(yourAddress)` to verify

### 8.2 Test Deposit Flow

1. On MockUSDm, call `approve(ammAddress, maxUint256)`
   - `spender`: WeatherBetAMMv2 address
   - `amount`: `115792089237316195423570985008687907853269984665640564039457584007913129639935`
2. On WeatherBetAMMv2, call `deposit(100000000000000000000)` (100 USDm)
3. Call `getAccount(yourAddress)` to verify balance

### 8.3 Test Buy Shares

1. Call `getBettingStatus(1)` to verify betting is open
2. Call `quoteBuy(1, true, 10000000000000000000)` to get cost for 10 YES shares
3. Call `buyShares(1, true, 10000000000000000000, 20000000000000000000)`:
   - `marketId`: 1
   - `isYes`: true
   - `shares`: 10 * 10^18
   - `maxCost`: 20 * 10^18 (slippage protection)

### 8.4 Test Resolution (After Week Ends)

1. On MockWeatherOracle, call `resolveMarketDirect(1, 3000)` (30.00mm, above average)
2. On AMM, call `getResolutionStatus(1)` to see dispute deadline
3. Wait 24 hours (or for testing, redeploy with shorter period)
4. Call `finalizeResolution(1)` to finalize
5. Call `claimWinnings(1)` if you won

---

## 9. Frontend Configuration

### 9.1 Update Contract Addresses

Edit `src/lib/contracts.ts`:

```typescript
export const CONTRACT_ADDRESSES = {
  6342: {
    weatherBetAMM: "0x...",  // Your WeatherBetAMMv2 address
    usdm: "0x...",            // Your MockUSDm address
    weatherOracle: "0x...",   // Your MockWeatherOracle address
  },
}
```

### 9.2 Update ABIs (if needed)

The ABIs in `contracts.ts` should work. If you modified the contracts, update accordingly.

---

## Deployment Addresses Record

Fill in after deployment:

| Contract | Address | Tx Hash |
|----------|---------|---------|
| MockUSDm | | |
| WeatherBetAMMv2 | | |
| MockWeatherOracle | | |

| Configuration | Status |
|---------------|--------|
| Oracle set on AMM | ☐ |
| First market created | ☐ |
| Test deposit successful | ☐ |
| Test buy successful | ☐ |

---

## Security Post-Deployment Checklist

### Immediately After Deployment

- [ ] Verify all contract source code matches expected
- [ ] Verify owner is your wallet
- [ ] Verify oracle is set correctly
- [ ] Verify treasury is set correctly
- [ ] Test pause/unpause functions work
- [ ] Test emergency functions work

### Before Public Announcement

- [ ] Create multiple test markets
- [ ] Test full user journey (deposit → bet → resolve → claim → withdraw)
- [ ] Test edge cases (max amounts, zero amounts)
- [ ] Test betting window enforcement
- [ ] Test dispute mechanism
- [ ] Monitor for any unusual transactions

### Ongoing Monitoring

- [ ] Set up block explorer alerts for contract activity
- [ ] Monitor large deposits/withdrawals
- [ ] Monitor market creations
- [ ] Monitor resolution proposals

---

## Troubleshooting

### "Betting closed" Error
- Check `getBettingStatus()` - betting closes 24h before week starts
- Ensure `block.timestamp < market.bettingCloses`

### "Insufficient balance" Error
- Check `getAccount()` balance
- Ensure deposit was successful
- Ensure approval was granted

### "Market not resolved" Error
- Check `getResolutionStatus()` - must be RESOLVED status
- Ensure dispute period has passed
- Ensure `finalizeResolution()` was called

### Transaction Fails with No Error
- Check gas limit (increase to 500k)
- Check MetaMask is on correct network
- Check contract isn't paused

---

## Emergency Procedures

### If Exploit Detected

1. **Immediately call `pause()`** on WeatherBetAMMv2
2. Document the attack vector
3. Do NOT call any other functions
4. Contact the team

### If Oracle Compromised

1. **Dispute any suspicious resolutions** within 24h
2. Call `pause()` to prevent further trading
3. Use `overrideResolution()` if needed

### If Funds Stuck

1. If market is active: wait for resolution
2. If market is cancelled: call `emergencyWithdraw()`
3. If contract is paused: wait for unpause

---

## Gas Estimates

| Function | Est. Gas | Est. Cost (@ 1 gwei) |
|----------|----------|---------------------|
| Deploy MockUSDm | ~1.5M | ~0.0015 ETH |
| Deploy WeatherBetAMMv2 | ~4M | ~0.004 ETH |
| Deploy MockWeatherOracle | ~0.8M | ~0.0008 ETH |
| createMarket | ~300k | ~0.0003 ETH |
| deposit | ~80k | ~0.00008 ETH |
| buyShares | ~150k | ~0.00015 ETH |
| claimWinnings | ~100k | ~0.0001 ETH |

**Total deployment cost: ~0.01 ETH**

---

*Last updated: January 2026*
