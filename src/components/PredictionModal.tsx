"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, CloudRain, Flame, Sun, Snowflake, Loader2, PartyPopper } from "lucide-react";
import { useAppKitAccount } from "@reown/appkit/react";
import { BET_AMOUNTS, MarketType } from "@/lib/constants";
import { usePlacePrediction } from "@/hooks/useMarkets";

interface PredictionModalProps {
  isOpen: boolean;
  onClose: () => void;
  marketId: number;
  prediction: boolean | null;
  marketType: MarketType;
}

export function PredictionModal({
  isOpen,
  onClose,
  marketId,
  prediction,
  marketType,
}: PredictionModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(BET_AMOUNTS[1]);
  const [step, setStep] = useState<"select" | "confirming" | "success">("select");
  
  const { isConnected } = useAppKitAccount();
  const { placePrediction, isPending, isSuccess } = usePlacePrediction();

  const isRainMarket = marketType === MarketType.RAIN;
  const isYes = prediction === true;

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep("select");
      setSelectedAmount(BET_AMOUNTS[1]);
    }
  }, [isOpen]);

  // Handle success
  useEffect(() => {
    if (isSuccess && step === "confirming") {
      setStep("success");
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  }, [isSuccess, step, onClose]);

  const handleConfirm = async () => {
    if (!isConnected || prediction === null) return;
    
    setStep("confirming");
    await placePrediction(marketId, prediction, selectedAmount);
  };

  const getIcon = () => {
    if (isRainMarket) {
      return isYes ? (
        <CloudRain className="w-10 h-10 text-sky-500" />
      ) : (
        <Sun className="w-10 h-10 text-amber-500" />
      );
    }
    return isYes ? (
      <Flame className="w-10 h-10 text-red-500" />
    ) : (
      <Snowflake className="w-10 h-10 text-sky-400" />
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-content w-full max-w-sm p-6"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>

          {/* Content based on step */}
          {step === "select" && (
            <>
              {/* Prediction Icon */}
              <div className="flex flex-col items-center mb-6">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-3 ${
                  isYes ? "bg-emerald-100" : "bg-slate-100"
                }`}>
                  {getIcon()}
                </div>
                <div className="flex items-center gap-2 text-xl font-bold">
                  {isYes ? (
                    <span className="text-emerald-600">✓ YES</span>
                  ) : (
                    <span className="text-slate-600">✗ NO</span>
                  )}
                </div>
              </div>

              {/* Amount Selection */}
              <div className="mb-6">
                <p className="text-center text-slate-500 text-sm mb-3">Select amount</p>
                <div className="grid grid-cols-2 gap-2">
                  {BET_AMOUNTS.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setSelectedAmount(amount)}
                      className={`amount-pill text-center ${
                        selectedAmount === amount ? "selected" : ""
                      }`}
                    >
                      {amount} ETH
                    </button>
                  ))}
                </div>
              </div>

              {/* Confirm Button */}
              <motion.button
                onClick={handleConfirm}
                disabled={!isConnected}
                className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 ${
                  isConnected
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
                whileTap={isConnected ? { scale: 0.98 } : undefined}
              >
                <Check className="w-5 h-5" />
                {isConnected ? "Confirm" : "Connect Wallet"}
              </motion.button>
            </>
          )}

          {step === "confirming" && (
            <div className="flex flex-col items-center py-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="w-16 h-16 text-emerald-500" />
              </motion.div>
              <p className="mt-4 text-lg font-medium text-slate-600">
                Confirming...
              </p>
              <p className="mt-2 text-sm text-slate-400">
                {selectedAmount} ETH
              </p>
            </div>
          )}

          {step === "success" && (
            <motion.div
              className="flex flex-col items-center py-8"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              <motion.div
                className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5 }}
              >
                <PartyPopper className="w-10 h-10 text-emerald-500" />
              </motion.div>
              <p className="mt-4 text-xl font-bold text-emerald-600">
                Success!
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Prediction placed
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
