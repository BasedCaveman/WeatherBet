"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CloudRain, Sun, Thermometer, Flame, Snowflake, Clock, Coins } from "lucide-react";
import { MarketType } from "@/lib/constants";
import { Market, calculateOdds, formatAmount, getTimeRemaining } from "@/hooks/useMarkets";
import { PredictionModal } from "./PredictionModal";

interface MarketCardProps {
  market: Market;
}

export function MarketCard({ market }: MarketCardProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedPrediction, setSelectedPrediction] = useState<boolean | null>(null);

  const { yesPercent, noPercent } = calculateOdds(market.totalYesAmount, market.totalNoAmount);
  const totalPool = market.totalYesAmount + market.totalNoAmount;
  const timeRemaining = getTimeRemaining(market.endTime);

  const isRainMarket = market.marketType === MarketType.RAIN;

  const handlePrediction = (prediction: boolean) => {
    setSelectedPrediction(prediction);
    setShowModal(true);
  };

  return (
    <>
      <motion.div
        className="market-card p-5 sm:p-7"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header with Icon */}
        <div className="flex items-center justify-center mb-6">
          {isRainMarket ? (
            <RainIcon />
          ) : (
            <TemperatureIcon />
          )}
        </div>

        {/* Question (minimal text) */}
        <div className="text-center mb-6">
          <p className="text-lg sm:text-xl font-semibold text-slate-700">
            {isRainMarket ? (
              <>
                <span className="inline-flex items-center gap-1">
                  <CloudRain className="w-5 h-5 text-sky-500" />
                  <span>{">"}</span>
                  <span className="text-sky-600">avg</span>
                </span>
                <span className="text-slate-400 mx-2">?</span>
              </>
            ) : (
              <>
                <span className="inline-flex items-center gap-1">
                  <Thermometer className="w-5 h-5 text-red-400" />
                  <span>{">"}</span>
                  <span className="text-red-500">avg</span>
                </span>
                <span className="text-slate-400 mx-2">?</span>
              </>
            )}
          </p>
        </div>

        {/* Prediction Buttons */}
        <div className="flex gap-4 justify-center mb-6">
          <motion.button
            className="btn-predict btn-yes"
            onClick={() => handlePrediction(true)}
            whileTap={{ scale: 0.95 }}
          >
            {isRainMarket ? (
              <CloudRain className="w-8 h-8 mb-1" />
            ) : (
              <Flame className="w-8 h-8 mb-1" />
            )}
            <span className="text-2xl">✓</span>
          </motion.button>

          <motion.button
            className="btn-predict btn-no"
            onClick={() => handlePrediction(false)}
            whileTap={{ scale: 0.95 }}
          >
            {isRainMarket ? (
              <Sun className="w-8 h-8 mb-1" />
            ) : (
              <Snowflake className="w-8 h-8 mb-1" />
            )}
            <span className="text-2xl">✗</span>
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
          <div className="flex justify-between mt-2 text-sm font-medium">
            <span className="text-emerald-600">{yesPercent}% ✓</span>
            <span className="text-slate-500">{noPercent}% ✗</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex justify-center gap-3 flex-wrap">
          <div className="pool-badge">
            <Coins className="w-4 h-4" />
            <span>{formatAmount(totalPool)} ETH</span>
          </div>
          <div className="time-badge">
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

// Animated Rain Icon
function RainIcon() {
  return (
    <div className="relative w-20 h-20 sm:w-24 sm:h-24 icon-wrapper icon-rain">
      <CloudRain className="w-10 h-10 sm:w-12 sm:h-12 text-sky-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      
      {/* Animated rain drops */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        <motion.div
          className="w-1 h-3 bg-sky-400 rounded-full"
          animate={{ y: [0, 8, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
        />
        <motion.div
          className="w-1 h-3 bg-sky-400 rounded-full"
          animate={{ y: [0, 8, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
        />
        <motion.div
          className="w-1 h-3 bg-sky-400 rounded-full"
          animate={{ y: [0, 8, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
        />
      </div>
    </div>
  );
}

// Animated Temperature Icon
function TemperatureIcon() {
  return (
    <div className="relative w-20 h-20 sm:w-24 sm:h-24 icon-wrapper icon-temp">
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Thermometer className="w-10 h-10 sm:w-12 sm:h-12 text-red-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </motion.div>
      
      {/* Heat waves */}
      <motion.div
        className="absolute -top-1 left-1/2 -translate-x-1/2"
        animate={{ y: [-2, -8], opacity: [0.6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Flame className="w-4 h-4 text-orange-400" />
      </motion.div>
    </div>
  );
}
