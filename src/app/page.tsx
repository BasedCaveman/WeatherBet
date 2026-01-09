"use client";

import { useEffect } from "react";
import { Header, MarketCard, LocationSelector } from "@/components";
import { useMarkets } from "@/hooks/useMarkets";
import { useLocation } from "@/providers/LocationProvider";
import { Loader2, MapPin, CloudRain, Thermometer } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { markets, isLoading } = useMarkets();
  const { city, weather, isDetecting, isLoadingWeather, detectLocation } = useLocation();

  // Auto-detect location on first visit
  useEffect(() => {
    if (!city && typeof window !== "undefined") {
      const hasVisited = localStorage.getItem("weatherbet_visited");
      if (!hasVisited) {
        detectLocation();
        localStorage.setItem("weatherbet_visited", "true");
      }
    }
  }, [city, detectLocation]);

  // Show location setup if no city selected
  if (!city) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 px-4 pb-8 sm:px-6 flex items-center justify-center">
          <motion.div 
            className="max-w-md w-full text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-emerald-400 to-sky-400 flex items-center justify-center">
              <MapPin className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-2xl font-bold text-slate-800 mb-2">
              Where are you?
            </h1>
            <p className="text-slate-500 mb-8">
              Select your location to see local weather markets
            </p>

            {isDetecting ? (
              <div className="flex items-center justify-center gap-3 py-4">
                <Loader2 className="w-5 h-5 text-emerald-500 animate-spin" />
                <span className="text-slate-600">Detecting location...</span>
              </div>
            ) : (
              <LocationSelector />
            )}

            {/* Use Cases */}
            <div className="mt-12 grid grid-cols-1 gap-4 text-left">
              <div className="bg-white/60 rounded-xl p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">🌾</span>
                </div>
                <div>
                  <p className="font-medium text-slate-700">Farmers</p>
                  <p className="text-sm text-slate-500">Hedge against bad weather for your crops</p>
                </div>
              </div>
              
              <div className="bg-white/60 rounded-xl p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">🎉</span>
                </div>
                <div>
                  <p className="font-medium text-slate-700">Event Planners</p>
                  <p className="text-sm text-slate-500">Protect outdoor events from rain</p>
                </div>
              </div>
              
              <div className="bg-white/60 rounded-xl p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">🧥</span>
                </div>
                <div>
                  <p className="font-medium text-slate-700">Seasonal Business</p>
                  <p className="text-sm text-slate-500">Hedge if winter is too warm</p>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 px-4 pb-8 sm:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Weather Summary */}
          {weather && (
            <motion.div 
              className="bg-white/60 rounded-2xl p-4 mb-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-red-400" />
                  <span className="text-lg font-semibold text-slate-700">
                    {Math.round(weather.currentTemp)}°C
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CloudRain className="w-5 h-5 text-sky-400" />
                  <span className="text-lg font-semibold text-slate-700">
                    {Math.round(weather.weeklyPrecipitationForecast)}mm
                  </span>
                  <span className="text-sm text-slate-400">this week</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Loading state */}
          {(isLoading || isLoadingWeather) && (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
            </div>
          )}

          {/* Markets */}
          {!isLoading && !isLoadingWeather && markets && (
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
