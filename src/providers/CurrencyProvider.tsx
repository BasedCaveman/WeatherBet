"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  Currency,
  CURRENCIES,
  ExchangeRates,
  fetchExchangeRates,
  detectUserCurrency,
  saveCurrencyPreference,
  getBetPresets,
  formatFiat,
} from "@/lib/currency";

interface BetPreset {
  fiat: number;
  eth: number;
}

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  availableCurrencies: Currency[];
  rates: { eth: Record<string, number> } | null;
  betPresets: BetPreset[];
  formatInFiat: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | null>(null);

const DEFAULT_PRESETS: BetPreset[] = [
  { fiat: 5, eth: 0.0014 },
  { fiat: 25, eth: 0.0071 },
  { fiat: 100, eth: 0.0286 },
  { fiat: 500, eth: 0.1429 },
];

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(CURRENCIES[0]);
  const [rates, setRates] = useState<{ eth: Record<string, number> } | null>(null);
  const [betPresets, setBetPresets] = useState<BetPreset[]>(DEFAULT_PRESETS);

  // Load user's preferred currency and fetch rates on mount
  useEffect(() => {
    async function init() {
      const [detectedCurrency, exchangeRates] = await Promise.all([
        detectUserCurrency(),
        fetchExchangeRates(),
      ]);
      setCurrencyState(detectedCurrency);
      setRates({ eth: exchangeRates.eth });
      
      // Calculate bet presets for detected currency
      const presets = getBetPresets(detectedCurrency, exchangeRates);
      setBetPresets(presets);
    }
    init();
  }, []);

  // Update presets when currency changes
  useEffect(() => {
    async function updatePresets() {
      if (rates) {
        const exchangeRates: ExchangeRates = { eth: rates.eth, timestamp: Date.now() };
        const presets = getBetPresets(currency, exchangeRates);
        setBetPresets(presets);
      }
    }
    updatePresets();
  }, [currency, rates]);

  // Wrapper to save preference when currency changes
  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    saveCurrencyPreference(newCurrency.code);
  };

  // Format amount in current currency
  const formatInFiat = (amount: number): string => {
    return formatFiat(amount, currency);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        availableCurrencies: CURRENCIES,
        rates,
        betPresets,
        formatInFiat,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used within CurrencyProvider");
  return context;
};
