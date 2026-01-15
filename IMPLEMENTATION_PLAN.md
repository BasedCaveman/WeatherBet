# 🌦️ WeatherBet - Climate Prediction Market dApp

## Project Overview

A decentralized prediction market focused on simple weather outcomes, designed for accessibility by rural communities worldwide. Built on MegaETH with Reown chain abstraction for seamless multi-chain wallet connectivity.

### Core Principles
- **Visual-first**: Icons and colors over text
- **Two-tap UX**: Connect wallet → Make prediction
- **Universal**: No language barriers, intuitive symbols
- **Mobile-first**: Optimized for basic smartphones

---

## Phase 1: Project Setup & Configuration
**Status**: [x] COMPLETE

### 1.1 Initialize Project
- [x] Create Next.js 14 project with TypeScript
- [x] Configure Tailwind CSS with custom theme
- [x] Set up project structure
- [x] Initialize Git repository

### 1.2 Install Dependencies
```bash
# Core
next react react-dom typescript

# Web3
@reown/appkit @reown/appkit-adapter-wagmi wagmi viem @tanstack/react-query

# UI
tailwindcss framer-motion lucide-react

# Contracts
hardhat @openzeppelin/contracts
```

### 1.3 Environment Configuration
- [x] Create `.env.local` with required variables
- [x] Configure MegaETH network (Chain ID: 6342)
- [x] Set up Reown Project ID (from cloud.reown.com)

---

## Phase 2: Smart Contract Development
**Status**: [x] COMPLETE (Contract Written)

### 2.1 PredictionMarket.sol
- [x] Market struct (id, type, startTime, endTime, totalYes, totalNo, resolved, outcome)
- [x] User prediction mapping
- [x] Create market function (admin only)
- [x] Place prediction function (payable)
- [x] Resolve market function (oracle/admin)
- [x] Claim winnings function
- [x] Emergency withdraw function

### 2.2 Contract Features
```solidity
// Market Types
enum MarketType { RAIN, TEMPERATURE }

// Prediction
struct Prediction {
    bool position;      // true = YES, false = NO
    uint256 amount;
    bool claimed;
}

// Market
struct Market {
    uint256 id;
    MarketType marketType;
    uint256 startTime;
    uint256 endTime;
    uint256 totalYesAmount;
    uint256 totalNoAmount;
    bool resolved;
    bool outcome;
    string region;      // For location-based markets
}
```

### 2.3 Testing & Deployment
- [ ] Write unit tests
- [ ] Deploy to MegaETH testnet
- [ ] Verify contract
- [ ] Deploy to MegaETH mainnet

---

## Phase 3: Frontend - Wallet Connection
**Status**: [x] COMPLETE

### 3.1 Reown AppKit Setup
- [x] Configure AppKit with MegaETH chain
- [x] Create Web3Provider wrapper
- [x] Implement chain abstraction (allow any chain, bridge to MegaETH)
- [x] Add wallet connection button

### 3.2 Chain Configuration
```typescript
// MegaETH Mainnet
const megaeth = {
  id: 6342,
  name: 'MegaETH',
  network: 'megaeth',
  nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.megaeth.com'] },
  },
  blockExplorers: {
    default: { name: 'MegaETH Explorer', url: 'https://explorer.megaeth.com' },
  },
}
```

---

## Phase 4: Frontend - Core UI
**Status**: [x] COMPLETE

### 4.1 Design System
- [x] Color palette (earth tones - greens, browns, blues)
- [x] Icon system (rain drop, sun, thermometer)
- [x] Typography (large, clear, minimal)
- [x] Responsive breakpoints

### 4.2 Visual Language (No-Text Design)
```
Rain Market:
  🌧️ = Rain prediction
  ☀️ = No rain prediction
  💧 = Rain icon
  
Temperature Market:
  🔥 = Hot (above average)
  ❄️ = Cool (below average)
  🌡️ = Temperature icon

Universal:
  ✓ = Yes/Confirm
  ✗ = No/Cancel
  👛 = Wallet
  💰 = Earnings
  ⏰ = Time remaining
```

### 4.3 Components
- [x] Header with wallet button
- [x] Market Card (visual, minimal text)
- [x] Prediction Modal (amount input + confirm)
- [x] Results Display
- [x] Loading/Transaction states

### 4.4 Pages
- [x] Home (2 market cards)
- [ ] Market Detail (optional - can be modal)
- [ ] My Predictions (user history)

---

## Phase 5: Market Cards UI
**Status**: [x] COMPLETE

### 5.1 Rain Market Card
```
┌─────────────────────────────────┐
│         💧 🌧️ 💧                │
│                                 │
│    [🌧️ YES]    [☀️ NO]         │
│                                 │
│  Pool: ◎ 150    ⏰ 5 days       │
│  ━━━━━━━━━━━░░░░                │
│  65% YES                        │
└─────────────────────────────────┘
```

### 5.2 Temperature Market Card
```
┌─────────────────────────────────┐
│         🌡️ 🔥 🌡️                │
│                                 │
│    [🔥 YES]    [❄️ NO]         │
│                                 │
│  Pool: ◎ 200    ⏰ 5 days       │
│  ━━━━━━━━━━━━━░░░               │
│  72% YES                        │
└─────────────────────────────────┘
```

---

## Phase 6: Smart Contract Integration
**Status**: [x] COMPLETE (Hooks Ready)

### 6.1 Contract Hooks
- [x] useMarkets() - fetch all markets
- [x] useMarket(id) - fetch single market
- [x] usePrediction(marketId) - user's prediction
- [x] usePlacePrediction() - mutation hook
- [x] useClaimWinnings() - claim mutation

### 6.2 Transaction Flow
1. User clicks YES or NO
2. Amount selection modal (preset amounts: 0.001, 0.005, 0.01, 0.05 ETH)
3. Confirm transaction
4. Show pending state with animation
5. Success/Error feedback

---

## Phase 7: Polish & Animations
**Status**: [x] COMPLETE

### 7.1 Animations
- [ ] Card hover effects
- [ ] Button press feedback
- [ ] Transaction pending spinner
- [ ] Success celebration (confetti/particles)
- [ ] Pool bar animation

### 7.2 Mobile Optimization
- [ ] Touch targets (min 44px)
- [ ] Swipe gestures (optional)
- [ ] Haptic feedback hints
- [ ] PWA configuration

---

## Phase 8: Testing & Deployment
**Status**: [ ] Not Started

### 8.1 Testing
- [ ] E2E tests (connect wallet, place prediction, claim)
- [ ] Mobile device testing
- [ ] Slow network testing
- [ ] Error state handling

### 8.2 Deployment
- [ ] Deploy frontend to Vercel
- [ ] Configure custom domain
- [ ] Set up analytics
- [ ] Monitor contract events

---

## Ideas for Later 💡
*Features to consider after MVP*

- [ ] Location-based markets (GPS detection)
- [ ] Multi-language support (icon tooltips)
- [ ] Push notifications for results
- [ ] Leaderboard
- [ ] Historical accuracy display
- [ ] Weather API integration for auto-resolution
- [ ] Social sharing of predictions
- [ ] NFT badges for accurate predictors
- [ ] Governance token for oracle decisions
- [ ] Additional market types (wind, humidity)

---

## Technical Notes

### MegaETH Specifics
- High throughput L2 (100k+ TPS)
- EVM compatible
- Low gas fees ideal for micro-predictions

### Reown Chain Abstraction
- Users can pay from any chain
- Automatic bridging handled by Reown
- Supports 300+ chains

### Oracle Considerations
- Initial: Admin-resolved (trust-based)
- Future: Chainlink weather oracle or API3
- Consider: UMA optimistic oracle

---

## File Structure
```
weatherbet/
├── contracts/
│   ├── PredictionMarket.sol
│   └── test/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── MarketCard.tsx
│   │   ├── PredictionModal.tsx
│   │   ├── WalletButton.tsx
│   │   └── ui/
│   ├── hooks/
│   │   ├── useMarkets.ts
│   │   └── usePrediction.ts
│   ├── lib/
│   │   ├── wagmi.ts
│   │   ├── contracts.ts
│   │   └── constants.ts
│   └── providers/
│       └── Web3Provider.tsx
├── public/
│   └── icons/
├── .env.local
├── package.json
└── README.md
```

---

## Current Progress

**Last Updated**: Phase 1-7 Complete (Frontend MVP)

**Current Phase**: Phase 8 - Testing & Deployment

**Completed**:
- ✅ Project setup with Next.js 14 + TypeScript
- ✅ Reown/Wagmi integration for wallet connection
- ✅ MegaETH chain configuration
- ✅ Smart contract (WeatherBet.sol) written
- ✅ Market card components with animations
- ✅ Prediction modal with amount selection
- ✅ Visual-first design with minimal text
- ✅ Mobile-responsive layout
- ✅ Mock data for development

**Next Steps**:
1. Get Reown Project ID from cloud.reown.com
2. Deploy smart contract to MegaETH testnet
3. Update contract address in .env.local
4. Test wallet connection and predictions
5. Deploy frontend to Vercel

**Blockers**: None

**Notes**: 
- App uses mock data until NEXT_PUBLIC_USE_MOCK=false
- Need real Reown Project ID for wallet connection to work
