# 🌦️ WeatherBet

**Simple weather prediction markets for everyone.**

A decentralized prediction market dApp focused on climate/weather outcomes, designed for accessibility by rural communities worldwide. Built on MegaETH with Reown chain abstraction.

## ✨ Features

- **🎯 Two Weather Markets**
  - **Rain Market**: Will it rain more than the 10-year average this week?
  - **Temperature Market**: Will daily high exceed the 10-year average?

- **📍 Location-Based**
  - Auto-detect via GPS or IP
  - Search any city worldwide
  - Real weather forecasts from Open-Meteo
  - Compare forecasts vs historical averages

- **💰 Fiat Currency Display**
  - See amounts in your local currency (USD, EUR, BRL, INR, etc.)
  - Auto-detect based on location
  - ETH conversion shown for transparency

- **🌍 Designed for Everyone**
  - Visual-first interface with minimal text
  - Mobile-optimized for basic smartphones
  - 15+ supported currencies

- **⚡ Built on MegaETH**
  - High throughput (100k+ TPS)
  - Ultra-low gas fees
  - EVM compatible

## 🎯 Use Cases

| User | Hedge Against |
|------|---------------|
| 🌾 Farmers | Bad weather affecting crops |
| 🎉 Event Planners | Rain ruining outdoor events |
| 🧥 Seasonal Retailers | Warm winters reducing sales |
| 🏖️ Tourism | Bad weather during peak season |

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- A Reown Project ID (get one at [cloud.reown.com](https://cloud.reown.com))

### Installation

```bash
# Clone the repository
git clone https://github.com/BasedCaveman/WeatherBet.git
cd WeatherBet

# Install dependencies
npm install

# Run development server
npm run dev
```

### Configuration

Create `.env.local`:

```env
NEXT_PUBLIC_REOWN_PROJECT_ID=ff6342f0134a0af6e9f7b972fb1c0afa
NEXT_PUBLIC_USE_MOCK=true
```

Open http://localhost:3000

## 📁 Project Structure

```
weatherbet/
├── contracts/
│   └── WeatherBet.sol      # Prediction market contract
├── src/
│   ├── app/                # Next.js pages
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── MarketCard.tsx
│   │   ├── PredictionModal.tsx
│   │   ├── LocationSelector.tsx
│   │   └── CurrencySelector.tsx
│   ├── hooks/
│   │   └── useMarkets.ts
│   ├── lib/
│   │   ├── wagmi.ts        # Web3 config
│   │   ├── weather.ts      # Open-Meteo API
│   │   ├── currency.ts     # Fiat conversion
│   │   └── constants.ts
│   └── providers/
│       ├── Web3Provider.tsx
│       ├── LocationProvider.tsx
│       └── CurrencyProvider.tsx
└── public/
```

## 🔗 APIs Used (All Free)

| Service | Purpose |
|---------|---------|
| Open-Meteo | Weather forecasts & historical data |
| CoinGecko | ETH to fiat exchange rates |
| ip-api.com | IP-based geolocation fallback |

## 🛣️ Roadmap

- [x] Core UI with market cards
- [x] Wallet connection (Reown)
- [x] Geolocation & city search
- [x] Real weather data integration
- [x] Fiat currency display
- [ ] Deploy smart contract to MegaETH
- [ ] Weather oracle integration
- [ ] Push notifications
- [ ] Governance token

## 📄 License

MIT License

---

**Made with ☀️ and 🌧️ for farmers everywhere**
