"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { useCurrency } from "@/providers/CurrencyProvider";
import { Currency } from "@/lib/currency";

interface CurrencySelectorProps {
  compact?: boolean;
}

export function CurrencySelector({ compact = false }: CurrencySelectorProps) {
  const { currency, setCurrency, availableCurrencies, rates } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectCurrency = (selected: Currency) => {
    setCurrency(selected);
    setIsOpen(false);
  };

  // Get ETH rate for display
  const ethRate = rates?.eth[currency.code.toLowerCase()];

  if (compact) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors text-sm"
        >
          <span className="font-medium text-slate-700">{currency.code}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>

        <AnimatePresence>
          {isOpen && (
            <CurrencyDropdown
              currencies={availableCurrencies}
              selectedCurrency={currency}
              onSelect={handleSelectCurrency}
              rates={rates}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Full version
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-colors"
      >
        <span className="text-lg">{currency.symbol}</span>
        <span className="font-medium text-slate-700">{currency.code}</span>
        {ethRate && (
          <span className="text-xs text-slate-400">
            1 ETH = {currency.symbol}{ethRate.toLocaleString()}
          </span>
        )}
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <CurrencyDropdown
            currencies={availableCurrencies}
            selectedCurrency={currency}
            onSelect={handleSelectCurrency}
            rates={rates}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Dropdown component
function CurrencyDropdown({
  currencies,
  selectedCurrency,
  onSelect,
  rates,
}: {
  currencies: Currency[];
  selectedCurrency: Currency;
  onSelect: (currency: Currency) => void;
  rates: { eth: Record<string, number> } | null;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute z-50 mt-2 right-0 w-64 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden"
    >
      <div className="max-h-72 overflow-y-auto">
        {currencies.map((curr) => {
          const isSelected = curr.code === selectedCurrency.code;
          const rate = rates?.eth[curr.code.toLowerCase()];

          return (
            <button
              key={curr.code}
              onClick={() => onSelect(curr)}
              className={`w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors ${
                isSelected ? "bg-emerald-50" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg w-8">{curr.symbol}</span>
                <div className="text-left">
                  <p className={`text-sm font-medium ${isSelected ? "text-emerald-700" : "text-slate-700"}`}>
                    {curr.code}
                  </p>
                  <p className="text-xs text-slate-400">{curr.name}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {rate && (
                  <span className="text-xs text-slate-400">
                    {rate.toLocaleString()}
                  </span>
                )}
                {isSelected && (
                  <Check className="w-4 h-4 text-emerald-600" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
