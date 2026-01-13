// Currency Service for ETH to Fiat conversion

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  locale: string;
}

export interface ExchangeRates {
  eth: Record<string, number>;
  timestamp: number;
}

// Supported currencies
export const CURRENCIES: Currency[] = [
  { code: "USD", symbol: "$", name: "US Dollar", locale: "en-US" },
  { code: "EUR", symbol: "€", name: "Euro", locale: "de-DE" },
  { code: "BRL", symbol: "R$", name: "Brazilian Real", locale: "pt-BR" },
  { code: "INR", symbol: "₹", name: "Indian Rupee", locale: "en-IN" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan", locale: "zh-CN" },
  { code: "IDR", symbol: "Rp", name: "Indonesian Rupiah", locale: "id-ID" },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira", locale: "en-NG" },
  { code: "PHP", symbol: "₱", name: "Philippine Peso", locale: "en-PH" },
  { code: "GBP", symbol: "£", name: "British Pound", locale: "en-GB" },
  { code: "MXN", symbol: "$", name: "Mexican Peso", locale: "es-MX" },
  { code: "KES", symbol: "KSh", name: "Kenyan Shilling", locale: "en-KE" },
  { code: "VND", symbol: "₫", name: "Vietnamese Dong", locale: "vi-VN" },
  { code: "THB", symbol: "฿", name: "Thai Baht", locale: "th-TH" },
  { code: "ZAR", symbol: "R", name: "South African Rand", locale: "en-ZA" },
  { code: "ARS", symbol: "$", name: "Argentine Peso", locale: "es-AR" },
];

// Country code to currency mapping
const COUNTRY_TO_CURRENCY: Record<string, string> = {
  US: "USD", GB: "GBP", EU: "EUR", DE: "EUR", FR: "EUR", IT: "EUR", ES: "EUR",
  BR: "BRL", IN: "INR", CN: "CNY", ID: "IDR", NG: "NGN", PH: "PHP",
  MX: "MXN", KE: "KES", VN: "VND", TH: "THB", ZA: "ZAR", AR: "ARS",
  JP: "JPY", KR: "KRW", AU: "AUD", CA: "CAD", NZ: "NZD", SG: "SGD",
  // Default to USD for unknown
};

// Cache for exchange rates
let cachedRates: ExchangeRates | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Fetch ETH exchange rates from CoinGecko
export async function fetchExchangeRates(): Promise<ExchangeRates> {
  // Return cached if still valid
  if (cachedRates && Date.now() - cachedRates.timestamp < CACHE_DURATION) {
    return cachedRates;
  }

  try {
    const currencies = CURRENCIES.map(c => c.code.toLowerCase()).join(",");
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=${currencies}`
    );

    if (!response.ok) throw new Error("Failed to fetch rates");

    const data = await response.json();

    cachedRates = {
      eth: data.ethereum,
      timestamp: Date.now(),
    };

    return cachedRates;
  } catch (error) {
    console.error("Exchange rate fetch error:", error);
    
    // Return fallback rates if API fails
    return getFallbackRates();
  }
}

// Fallback rates (approximate, updated periodically)
function getFallbackRates(): ExchangeRates {
  return {
    eth: {
      usd: 3500,
      eur: 3200,
      brl: 17500,
      inr: 290000,
      cny: 25000,
      idr: 55000000,
      ngn: 5500000,
      php: 200000,
      gbp: 2800,
      mxn: 60000,
      kes: 450000,
      vnd: 88000000,
      thb: 120000,
      zar: 63000,
      ars: 3500000,
    },
    timestamp: Date.now(),
  };
}

// Convert ETH to fiat
export function ethToFiat(ethAmount: number, currencyCode: string, rates: ExchangeRates): number {
  const rate = rates.eth[currencyCode.toLowerCase()];
  if (!rate) return ethAmount * (rates.eth.usd || 3500); // Fallback to USD
  return ethAmount * rate;
}

// Convert fiat to ETH
export function fiatToEth(fiatAmount: number, currencyCode: string, rates: ExchangeRates): number {
  const rate = rates.eth[currencyCode.toLowerCase()];
  if (!rate) return fiatAmount / (rates.eth.usd || 3500);
  return fiatAmount / rate;
}

// Format amount in local currency
export function formatFiat(amount: number, currency: Currency): string {
  try {
    return new Intl.NumberFormat(currency.locale, {
      style: "currency",
      currency: currency.code,
      minimumFractionDigits: 0,
      maximumFractionDigits: amount < 100 ? 2 : 0,
    }).format(amount);
  } catch {
    return `${currency.symbol}${amount.toFixed(2)}`;
  }
}

// Format ETH amount
export function formatEth(amount: number): string {
  if (amount < 0.001) return "< 0.001 ETH";
  if (amount < 1) return `${amount.toFixed(3)} ETH`;
  return `${amount.toFixed(2)} ETH`;
}

// Get currency from country code
export function getCurrencyFromCountry(countryCode: string): Currency {
  const currencyCode = COUNTRY_TO_CURRENCY[countryCode.toUpperCase()] || "USD";
  return CURRENCIES.find(c => c.code === currencyCode) || CURRENCIES[0];
}

// Detect user's preferred currency
export async function detectUserCurrency(): Promise<Currency> {
  // 1. Check localStorage for saved preference
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("weatherbet_currency");
    if (saved) {
      const currency = CURRENCIES.find(c => c.code === saved);
      if (currency) return currency;
    }
  }

  // 2. Try to detect from browser locale
  if (typeof navigator !== "undefined") {
    const locale = navigator.language || "en-US";
    const regionMatch = locale.match(/[-_]([A-Z]{2})$/i);
    if (regionMatch) {
      const currency = getCurrencyFromCountry(regionMatch[1]);
      if (currency) return currency;
    }
  }

  // 3. Fallback to USD
  return CURRENCIES[0];
}

// Save currency preference
export function saveCurrencyPreference(currencyCode: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("weatherbet_currency", currencyCode);
  }
}

// Preset bet amounts in fiat (will be converted to ETH)
export const FIAT_BET_PRESETS = [
  { label: "small", usdEquivalent: 5 },
  { label: "medium", usdEquivalent: 25 },
  { label: "large", usdEquivalent: 100 },
  { label: "max", usdEquivalent: 500 },
];

// Get bet presets in user's currency
export function getBetPresets(currency: Currency, rates: ExchangeRates): { fiat: number; eth: number }[] {
  const usdRate = rates.eth.usd || 3500;
  const userRate = rates.eth[currency.code.toLowerCase()] || usdRate;
  const conversionFactor = userRate / usdRate;

  return FIAT_BET_PRESETS.map(preset => {
    const fiatAmount = Math.round(preset.usdEquivalent * conversionFactor);
    const ethAmount = fiatToEth(fiatAmount, currency.code, rates);
    return { fiat: fiatAmount, eth: ethAmount };
  });
}
