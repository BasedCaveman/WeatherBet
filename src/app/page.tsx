"use client";

import { Header, MarketCard } from "@/components";
import { useMarkets } from "@/hooks/useMarkets";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { markets, isLoading } = useMarkets();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 px-4 pb-8 sm:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Minimal tagline */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
              🌦️
            </h1>
            <p className="text-slate-500 text-sm">
              Predict • Win • Simple
            </p>
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
            </div>
          )}

          {/* Markets */}
          {!isLoading && markets && (
            <div className="space-y-6">
              {markets.map((market) => (
                <MarketCard key={market.id} market={market} />
              ))}
            </div>
          )}

          {/* Footer info */}
          <footer className="mt-12 text-center">
            <p className="text-xs text-slate-400">
              7-day predictions • 10y average baseline
            </p>
            <p className="text-xs text-slate-300 mt-1">
              Built on MegaETH ⚡
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
