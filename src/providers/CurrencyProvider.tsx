"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { 
  Currency, 
  CURRENCIES, 
  ExchangeRates,
  fetchExchangeRates,
  detectUserCurrency,
  saveCurrencyPreference 
} from "@/lib/currency";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  availableCurrencies: Currency[];
  rates: { eth: Record<string, number> } | null;
}

const CurrencyContext = createContext<CurrencyContextType | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(CURRENCIES[0]);
  const [rates, setRates] = useState<{ eth: Record<string, number> } | null>(null);

  // Load user's preferred currency and fetch rates on mount
  useEffect(() => {
    async function init() {
      const [detectedCurrency, exchangeRates] = await Promise.all([
        detectUserCurrency(),
        fetchExchangeRates(),
      ]);
      setCurrencyState(detectedCurrency);
      setRates({ eth: exchangeRates.eth });
    }
    init();
  }, []);

  // Wrapper to save preference when currency changes
  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    saveCurrencyPreference(newCurrency.code);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        availableCurrencies: CURRENCIES,
        rates,
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
