# 🌦️ WeatherBet

**Simple weather prediction markets for everyone.**

A decentralized prediction market dApp focused on climate/weather outcomes, designed for accessibility by rural communities worldwide. Built on MegaETH with Reown chain abstraction.

## ✨ Features

- **🎯 Two Simple Markets**
  - **Rain Market**: Will it rain more than the 10-year average this week?
  - **Temperature Market**: Will daily high exceed the 10-year average this week?

- **🌍 Designed for Everyone**
  - Visual-first interface with minimal text
  - Universal icons and symbols
  - Mobile-optimized for basic smartphones
  - Two-tap UX: Connect → Predict

- **⚡ Built on MegaETH**
  - High throughput (100k+ TPS)
  - Ultra-low gas fees
  - EVM compatible

- **🔗 Reown Chain Abstraction**
  - Connect from any chain
  - Automatic bridging handled
  - 300+ chains supported

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- A Reown Project ID (get one at [cloud.reown.com](https://cloud.reown.com))

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/weatherbet.git
cd weatherbet

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local
```

### Configuration

Edit `.env.local` with your values:

```env
# Required: Get from https://cloud.reown.com
NEXT_PUBLIC_REOWN_PROJECT_ID=your_project_id_here

# Development mode (uses mock data)
NEXT_PUBLIC_USE_MOCK=true

# Contract address (update after deployment)
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

### Production Build

```bash
npm run build
npm start
```

## 📁 Project Structure

```
weatherbet/
├── contracts/
│   └── WeatherBet.sol      # Solidity smart contract
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout with providers
│   │   ├── page.tsx        # Home page with markets
│   │   └── globals.css     # Custom styles
│   ├── components/
│   │   ├── Header.tsx      # App header with wallet
│   │   ├── MarketCard.tsx  # Market display card
│   │   └── PredictionModal.tsx
│   ├── hooks/
│   │   └── useMarkets.ts   # Market data hooks
│   ├── lib/
│   │   ├── wagmi.ts        # Wagmi/Reown config
│   │   └── constants.ts    # Contract ABI & addresses
│   └── providers/
│       └── Web3Provider.tsx
└── public/
```

## 🔧 Smart Contract

The `WeatherBet.sol` contract handles:

- Market creation (admin only)
- Prediction placement (payable)
- Market resolution (oracle/admin)
- Winnings calculation and claim
- 2% platform fee

### Deploying the Contract

1. Set up Hardhat or Foundry
2. Configure MegaETH network
3. Deploy `WeatherBet.sol`
4. Update `NEXT_PUBLIC_CONTRACT_ADDRESS` in `.env.local`

### MegaETH Network Config

```javascript
{
  chainId: 6342,
  name: "MegaETH",
  rpcUrl: "https://carrot.megaeth.com/rpc",
  explorer: "https://www.megaexplorer.xyz"
}
```

## 🎨 Design Principles

1. **Visual > Text**: Icons and colors communicate meaning
2. **Two-Tap UX**: Minimize steps to place a prediction
3. **Mobile-First**: Optimized for smartphones
4. **Universal**: No language barriers
5. **Accessible**: Large touch targets, clear contrasts

## 🛣️ Roadmap

### MVP (Current)
- [x] Basic market display
- [x] Wallet connection
- [x] Prediction placement
- [x] Visual-first design

### Phase 2
- [ ] GPS-based location detection
- [ ] Weather API integration for auto-resolution
- [ ] Push notifications
- [ ] Multi-language tooltips

### Phase 3
- [ ] Governance token
- [ ] DAO for oracle decisions
- [ ] Additional market types
- [ ] NFT badges for accuracy

## 📄 License

MIT License

---

**Made with ☀️ and 🌧️ for farmers everywhere**
