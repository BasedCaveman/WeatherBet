"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CloudRain, Sun, Thermometer, Flame, Snowflake, Clock, TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import { MarketType } from "@/lib/constants";
import { Market, calculateOdds, formatAmount, getTimeRemaining } from "@/hooks/useMarkets";
import { useLocation } from "@/providers/LocationProvider";
import { useCurrency } from "@/providers/CurrencyProvider";
import { PredictionModal } from "./PredictionModal";

interface MarketCardProps {
  market: Market;
}

export function MarketCard({ market }: MarketCardProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedPrediction, setSelectedPrediction] = useState<boolean | null>(null);

  const { city, weather, climate } = useLocation();
  const { formatInFiat, currency } = useCurrency();

  const { yesPercent, noPercent } = calculateOdds(market.totalYesAmount, market.totalNoAmount);
  const totalPool = market.totalYesAmount + market.totalNoAmount;
  const timeRemaining = getTimeRemaining(market.endTime);

  const isRainMarket = market.marketType === MarketType.RAIN;

  // Calculate prices (as decimals, like Polymarket)
  const yesPrice = yesPercent / 100;
  const noPrice = noPercent / 100;

  // Format volumes
  const yesVolume = formatInFiat(parseFloat(formatAmount(market.totalYesAmount)));
  const noVolume = formatInFiat(parseFloat(formatAmount(market.totalNoAmount)));
  const totalVolume = formatInFiat(parseFloat(formatAmount(totalPool)));

  // Get weather comparison data
  const getForecastVsAverage = () => {
    if (!weather || !climate) {
      return { forecast: 0, average: 0, isAbove: true, unit: "mm" };
    }

    if (isRainMarket) {
      const forecast = weather.weeklyPrecipitationForecast;
      const average = climate.avgWeeklyPrecipitation;
      return {
        forecast: Math.round(forecast),
        average: Math.round(average),
        isAbove: forecast > average,
        unit: "mm",
      };
    } else {
      const forecast = weather.weeklyAvgHighTemp;
      const average = climate.avgDailyHighTemp;
      return {
        forecast: Math.round(forecast),
        average: Math.round(average),
        isAbove: forecast > average,
        unit: "°C",
      };
    }
  };

  const comparison = getForecastVsAverage();

  const handlePrediction = (prediction: boolean) => {
    setSelectedPrediction(prediction);
    setShowModal(true);
  };

  return (
    <>
      <motion.div
        className="market-card p-5 sm:p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Location Badge */}
        {city && (
          <div className="text-center mb-3">
            <span className="text-xs text-slate-400 font-medium">
              📍 {city.name}, {city.countryCode}
            </span>
          </div>
        )}

        {/* Header with Icon and Probability */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {isRainMarket ? (
              <RainIcon />
            ) : (
              <TemperatureIcon />
            )}
            <div>
              <p className="font-semibold text-slate-700">
                {isRainMarket ? "More rain than average?" : "Hotter than average?"}
              </p>
              <p className="text-xs text-slate-400">7-day prediction</p>
            </div>
          </div>
          
          {/* Probability Circle (like Polymarket) */}
          <div className="relative w-14 h-14">
            <svg className="w-14 h-14 -rotate-90">
              <circle
                cx="28"
                cy="28"
                r="24"
                stroke="#e2e8f0"
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="28"
                cy="28"
                r="24"
                stroke="#10b981"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${yesPercent * 1.51} 151`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-sm font-bold text-slate-700">{yesPercent}%</span>
              <span className="text-[10px] text-slate-400">chance</span>
            </div>
          </div>
        </div>

        {/* Weather Comparison */}
        {weather && climate && (
          <div className="bg-slate-50 rounded-xl p-3 mb-4">
            <div className="flex items-center justify-between text-sm">
              <div className="text-center flex-1">
                <p className="text-slate-400 text-xs mb-1">Forecast</p>
                <p className="font-bold text-slate-700">
                  {comparison.forecast}{comparison.unit}
                </p>
              </div>
              <div className="px-3">
                {comparison.isAbove ? (
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <div className="text-center flex-1">
                <p className="text-slate-400 text-xs mb-1">10y Avg</p>
                <p className="font-bold text-slate-500">
                  {comparison.average}{comparison.unit}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Prediction Buttons with Prices & Volume */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* YES Button */}
          <motion.button
            className="relative overflow-hidden rounded-xl bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-200 hover:border-emerald-300 p-4 text-left transition-colors"
            onClick={() => handlePrediction(true)}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-2 mb-2">
              {isRainMarket ? (
                <CloudRain className="w-5 h-5 text-emerald-600" />
              ) : (
                <Flame className="w-5 h-5 text-emerald-600" />
              )}
              <span className="font-bold text-emerald-700">Yes</span>
            </div>
            <div className="text-2xl font-bold text-emerald-600 mb-1">
              {currency.symbol}{yesPrice.toFixed(2)}
            </div>
            <div className="text-xs text-emerald-500/70">
              Vol: {yesVolume}
            </div>
          </motion.button>

          {/* NO Button */}
          <motion.button
            className="relative overflow-hidden rounded-xl bg-slate-50 hover:bg-slate-100 border-2 border-slate-200 hover:border-slate-300 p-4 text-left transition-colors"
            onClick={() => handlePrediction(false)}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-2 mb-2">
              {isRainMarket ? (
                <Sun className="w-5 h-5 text-slate-600" />
              ) : (
                <Snowflake className="w-5 h-5 text-slate-600" />
              )}
              <span className="font-bold text-slate-600">No</span>
            </div>
            <div className="text-2xl font-bold text-slate-600 mb-1">
              {currency.symbol}{noPrice.toFixed(2)}
            </div>
            <div className="text-xs text-slate-400">
              Vol: {noVolume}
            </div>
          </motion.button>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="progress-track">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${yesPercent}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1.5 text-slate-500">
            <BarChart3 className="w-4 h-4" />
            <span>{totalVolume} Vol.</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500">
            <Clock className="w-4 h-4" />
            <span>{timeRemaining.text}</span>
          </div>
        </div>
      </motion.div>

      {/* Prediction Modal */}
      <PredictionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        marketId={market.id}
        prediction={selectedPrediction}
        marketType={market.marketType}
      />
    </>
  );
}

// Animated Rain Icon (smaller)
function RainIcon() {
  return (
    <div className="relative w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
      <CloudRain className="w-6 h-6 text-sky-600" />
    </div>
  );
}

// Animated Temperature Icon (smaller)
function TemperatureIcon() {
  return (
    <div className="relative w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
      <Thermometer className="w-6 h-6 text-red-500" />
    </div>
  );
}
