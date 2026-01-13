# WeatherBet Phase 2: Geolocation & Fiat Currency

## Overview

Transform WeatherBet into a practical hedging tool for:
- **Farmers**: Hedge against bad weather affecting crops
- **Event planners**: Protect outdoor events from rain
- **Seasonal businesses**: Winter clothing retailers hedging warm winters

---

## Feature 1: Location-Based Weather Markets

### User Journey

```
1. User opens dApp
   ↓
2. Auto-detect location (GPS or IP fallback)
   ↓
3. Show nearby city with weather markets
   ↓
4. Option to:
   - Confirm location → Set as default
   - Search/select different city
   - Browse popular cities
   ↓
5. See markets specific to that location
   - "Will São Paulo rain more than average this week?"
   - "Will São Paulo temperature exceed average?"
```

### Technical Implementation

#### A. Geolocation Detection
```typescript
// Priority order:
1. Browser Geolocation API (GPS - most accurate)
2. IP-based geolocation (fallback)
3. Manual city selection (always available)
```

#### B. Weather Data Provider
**Recommended: Open-Meteo API**
- ✅ Free, no API key required
- ✅ Historical averages (climate normals)
- ✅ 7-day forecasts
- ✅ Global coverage
- ✅ Precipitation & temperature data

```typescript
// Example endpoints:
// Current weather + forecast
https://api.open-meteo.com/v1/forecast?latitude=-23.55&longitude=-46.63&daily=temperature_2m_max,precipitation_sum

// Historical climate averages (1991-2020)
https://climate-api.open-meteo.com/v1/climate?latitude=-23.55&longitude=-46.63&models=EC_Earth3P_HR&daily=temperature_2m_max,precipitation_sum
```

#### C. City Database
- Use Open-Meteo's geocoding API
- Cache popular cities
- Support local language names

---

## Feature 2: Fiat Currency Display

### User Experience

```
┌─────────────────────────────────────┐
│  💧 Rain Market - São Paulo         │
│                                     │
│  Pool: R$ 750 (~0.15 ETH)          │
│                                     │
│  Your bet: R$ 50                    │
│  [R$ 25] [R$ 50] [R$ 100] [R$ 250] │
│                                     │
│  Potential win: R$ 85               │
└─────────────────────────────────────┘
```

### Technical Implementation

#### A. Currency Detection
```typescript
// Auto-detect from:
1. Browser locale (navigator.language)
2. IP geolocation country
3. User preference (stored in localStorage)
```

#### B. Exchange Rates
**ETH → Fiat conversion**
```typescript
// Use CoinGecko API (free)
https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd,eur,brl,inr,cny

// Cache rates, refresh every 5 minutes
```

#### C. Supported Currencies (Initial)
| Currency | Symbol | Target Region |
|----------|--------|---------------|
| USD | $ | Americas, Global |
| EUR | € | Europe |
| BRL | R$ | Brazil |
| INR | ₹ | India |
| CNY | ¥ | China |
| IDR | Rp | Indonesia |
| NGN | ₦ | Nigeria |
| PHP | ₱ | Philippines |

#### D. Preset Amounts (Fiat-First)
```typescript
// Instead of ETH amounts, show fiat:
// Small: ~$5 equivalent
// Medium: ~$25 equivalent  
// Large: ~$100 equivalent
// Max: ~$500 equivalent

// Convert to ETH at transaction time
```

---

## Data Flow Architecture

```
┌──────────────────────────────────────────────────────────┐
│                      USER DEVICE                          │
├──────────────────────────────────────────────────────────┤
│  1. Get Location (GPS/IP)                                │
│  2. Get Currency Preference (locale/IP)                  │
│  3. Fetch Weather Data (Open-Meteo)                      │
│  4. Fetch ETH Price (CoinGecko)                          │
│  5. Display Markets in Local Currency                    │
└──────────────────────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────┐
│                   SMART CONTRACT                          │
├──────────────────────────────────────────────────────────┤
│  - All transactions in ETH (on-chain)                    │
│  - Markets indexed by location hash                      │
│  - Oracle resolves using weather data                    │
└──────────────────────────────────────────────────────────┘
```

---

## New Components Needed

### 1. LocationProvider
- Handles geolocation
- Stores user's default city
- City search functionality

### 2. CurrencyProvider  
- ETH/Fiat conversion rates
- User currency preference
- Format amounts in local currency

### 3. WeatherService
- Fetch current conditions
- Fetch historical averages
- Calculate if above/below average

### 4. LocationSelector (UI)
- Search cities
- Popular cities list
- GPS detection button
- Save as default

### 5. CurrencySelector (UI)
- Currency dropdown
- Show conversion rate

---

## Updated Market Card UI

```
┌─────────────────────────────────────────────────┐
│  📍 São Paulo, Brazil              [Change]     │
├─────────────────────────────────────────────────┤
│                                                 │
│         💧 🌧️ 💧                                │
│                                                 │
│   This week's rain vs 10-year average?         │
│   Current forecast: 45mm                        │
│   Historical avg: 38mm                          │
│                                                 │
│    [🌧️ MORE]         [☀️ LESS]                 │
│     R$ 425            R$ 320                    │
│                                                 │
│  ━━━━━━━━━━━━━░░░░░                            │
│  57% predict MORE                               │
│                                                 │
│  Pool: R$ 745    ⏰ 5 days                      │
└─────────────────────────────────────────────────┘
```

---

## Implementation Order

### Phase 2A: Location (This Sprint)
1. [ ] Create LocationProvider context
2. [ ] Integrate Open-Meteo geocoding API
3. [ ] Add GPS detection
4. [ ] Add IP fallback (ip-api.com)
5. [ ] Create LocationSelector component
6. [ ] Update MarketCard with location
7. [ ] Store default location in localStorage

### Phase 2B: Weather Integration
1. [ ] Create WeatherService
2. [ ] Fetch current forecast
3. [ ] Fetch historical averages
4. [ ] Calculate predictions vs averages
5. [ ] Display real weather data on cards

### Phase 2C: Fiat Currency
1. [ ] Create CurrencyProvider context
2. [ ] Integrate CoinGecko API
3. [ ] Auto-detect user currency
4. [ ] Create CurrencySelector component
5. [ ] Update all amount displays
6. [ ] Convert fiat → ETH at transaction

---

## API Endpoints Used

### Open-Meteo (Weather) - FREE, No Key
```
Geocoding: https://geocoding-api.open-meteo.com/v1/search?name=London
Forecast: https://api.open-meteo.com/v1/forecast?latitude=51.5&longitude=-0.1&daily=...
Climate: https://climate-api.open-meteo.com/v1/climate?latitude=51.5&longitude=-0.1&...
```

### IP Geolocation - FREE
```
https://ip-api.com/json/ (returns city, country, lat/lon)
```

### CoinGecko (ETH Price) - FREE
```
https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd,eur,brl
```

---

## Notes

- All APIs are FREE with generous limits
- No API keys required for MVP
- Data cached to minimize API calls
- Works offline with cached data
- Progressive enhancement (works without GPS)
