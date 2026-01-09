"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import {
  Currency,
  CURRENCIES,
  ExchangeRates,
  fetchExchangeRates,
  detectUserCurrency,
  saveCurrencyPreference,
  ethToFiat,
  fiatToEth,
  formatFiat,
  formatEth,
  getBetPresets,
} from "@/lib/currency";

interface CurrencyContextType {
  // Current currency
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  
  // Exchange rates
  rates: ExchangeRates | null;
  isLoading: boolean;
  
  // Conversion helpers
  toFiat: (ethAmount: number) => number;
  toEth: (fiatAmount: number) => number;
  
  // Formatting helpers
  formatInFiat: (ethAmount: number) => string;
  formatInEth: (ethAmount: number) => string;
  
  // Bet presets in current currency
  betPresets: { fiat: number; eth: number }[];
  
  // All available currencies
  availableCurrencies: Currency[];
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(CURRENCIES[0]); // Default USD
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Detect currency and fetch rates on mount
  useEffect(() => {
    async function init() {
      setIsLoading(true);
      
      try {
        // Detect user's preferred currency
        const detectedCurrency = await detectUserCurrency();
        setCurrencyState(detectedCurrency);
        
        // Fetch exchange rates
        const exchangeRates = await fetchExchangeRates();
        setRates(exchangeRates);
      } catch (error) {
        console.error("Currency init error:", error);
      } finally {
        setIsLoading(false);
      }
    }

    init();
  }, []);

  // Refresh rates periodically
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const newRates = await fetchExchangeRates();
        setRates(newRates);
      } catch (error) {
        console.error("Rate refresh error:", error);
      }
    }, 5 * 60 * 1000); // Every 5 minutes

    return () => clearInterval(interval);
  }, []);

  const setCurrency = useCallback((newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    saveCurrencyPreference(newCurrency.code);
  }, []);

  const toFiat = useCallback((ethAmount: number): number => {
    if (!rates) return ethAmount * 3500; // Fallback
    return ethToFiat(ethAmount, currency.code, rates);
  }, [rates, currency]);

  const toEth = useCallback((fiatAmount: number): number => {
    if (!rates) return fiatAmount / 3500; // Fallback
    return fiatToEth(fiatAmount, currency.code, rates);
  }, [rates, currency]);

  const formatInFiat = useCallback((ethAmount: number): string => {
    const fiatAmount = toFiat(ethAmount);
    return formatFiat(fiatAmount, currency);
  }, [toFiat, currency]);

  const formatInEth = useCallback((ethAmount: number): string => {
    return formatEth(ethAmount);
  }, []);

  const betPresets = rates ? getBetPresets(currency, rates) : [
    { fiat: 5, eth: 0.001 },
    { fiat: 25, eth: 0.007 },
    { fiat: 100, eth: 0.028 },
    { fiat: 500, eth: 0.14 },
  ];

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        rates,
        isLoading,
        toFiat,
        toEth,
        formatInFiat,
        formatInEth,
        betPresets,
        availableCurrencies: CURRENCIES,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
