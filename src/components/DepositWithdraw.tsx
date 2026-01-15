"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Loader2, Check, AlertCircle, Droplets } from "lucide-react";
import { useUsdm } from "@/hooks/useUsdm";
import { useDeposit, useWithdraw, useAmmAccount } from "@/hooks/useAmm";
import { useCurrency } from "@/providers/CurrencyProvider";

interface DepositWithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "deposit" | "withdraw";
}

export function DepositWithdrawModal({ 
  isOpen, 
  onClose,
  initialTab = "deposit" 
}: DepositWithdrawModalProps) {
  const [tab, setTab] = useState<"deposit" | "withdraw">(initialTab);
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState<"input" | "approve" | "confirm" | "success">("input");
  
  const { currency } = useCurrency();
  const { 
    balance: walletBalance, 
    needsApproval, 
    approveMax, 
    isApproving,
    faucet,
    canClaimFaucet,
    faucetAmount,
    isClaiming,
    refetchAll,
  } = useUsdm();
  
  const { account, refetch: refetchAccount } = useAmmAccount();
  const { deposit, isPending: isDepositing, isConfirming: isDepositConfirming, isSuccess: isDepositSuccess } = useDeposit();
  const { withdraw, isPending: isWithdrawing, isConfirming: isWithdrawConfirming, isSuccess: isWithdrawSuccess } = useWithdraw();

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setTab(initialTab);
      setAmount("");
      setStep("input");
    }
  }, [isOpen, initialTab]);

  // Handle success
  useEffect(() => {
    if (isDepositSuccess || isWithdrawSuccess) {
      setStep("success");
      refetchAll();
      refetchAccount();
    }
  }, [isDepositSuccess, isWithdrawSuccess, refetchAll, refetchAccount]);

  const contractBalance = account?.balance || "0";
  const maxAmount = tab === "deposit" ? walletBalance : contractBalance;
  
  const quickAmounts = ["10", "50", "100", "500"];

  const handleSubmit = async () => {
    if (!amount || parseFloat(amount) <= 0) return;

    if (tab === "deposit") {
      // Check if approval is needed
      if (needsApproval(amount)) {
        setStep("approve");
        await approveMax();
        return;
      }
      
      setStep("confirm");
      await deposit(amount);
    } else {
      setStep("confirm");
      await withdraw(amount);
    }
  };

  // Continue after approval
  useEffect(() => {
    if (step === "approve" && !isApproving && !needsApproval(amount)) {
      setStep("confirm");
      deposit(amount);
    }
  }, [isApproving, step, amount, needsApproval, deposit]);

  const handleFaucet = async () => {
    await faucet();
    refetchAll();
  };

  if (!isOpen) return null;

  const isLoading = isDepositing || isDepositConfirming || isWithdrawing || isWithdrawConfirming || isApproving;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-800">
              {step === "success" ? "Success!" : tab === "deposit" ? "Deposit" : "Withdraw"}
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200"
            >
              <X className="w-4 h-4 text-slate-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-5">
            {step === "success" ? (
              <SuccessStep 
                amount={amount} 
                action={tab} 
                currency={currency}
                onClose={onClose}
              />
            ) : (
              <>
                {/* Tabs */}
                <div className="flex gap-2 mb-5">
                  <button
                    onClick={() => { setTab("deposit"); setAmount(""); }}
                    className={`flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors ${
                      tab === "deposit"
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                    Deposit
                  </button>
                  <button
                    onClick={() => { setTab("withdraw"); setAmount(""); }}
                    className={`flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors ${
                      tab === "withdraw"
                        ? "bg-slate-700 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <Minus className="w-4 h-4" />
                    Withdraw
                  </button>
                </div>

                {/* Balances */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-slate-50 rounded-xl p-3">
                    <p className="text-xs text-slate-400 mb-1">Wallet Balance</p>
                    <p className="font-bold text-slate-700">
                      {currency.symbol}{parseFloat(walletBalance).toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-3">
                    <p className="text-xs text-emerald-600 mb-1">Trading Balance</p>
                    <p className="font-bold text-emerald-700">
                      {currency.symbol}{parseFloat(contractBalance).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Amount Input */}
                <div className="mb-4">
                  <label className="block text-sm text-slate-500 mb-2">Amount (USDm)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                      {currency.symbol}
                    </span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-10 pr-20 py-4 text-xl font-bold bg-slate-50 rounded-xl border-2 border-transparent focus:border-emerald-500 focus:bg-white outline-none transition-colors"
                    />
                    <button
                      onClick={() => setAmount(maxAmount)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-200 hover:bg-slate-300 rounded-lg text-xs font-medium text-slate-600 transition-colors"
                    >
                      MAX
                    </button>
                  </div>
                </div>

                {/* Quick Amounts */}
                <div className="flex gap-2 mb-5">
                  {quickAmounts.map((quickAmount) => (
                    <button
                      key={quickAmount}
                      onClick={() => setAmount(quickAmount)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                        amount === quickAmount
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {currency.symbol}{quickAmount}
                    </button>
                  ))}
                </div>

                {/* Action Button */}
                <button
                  onClick={handleSubmit}
                  disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > parseFloat(maxAmount) || isLoading}
                  className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${
                    tab === "deposit"
                      ? "bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300"
                      : "bg-slate-700 hover:bg-slate-800 disabled:bg-slate-400"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {step === "approve" ? "Approving..." : "Processing..."}
                    </>
                  ) : (
                    <>
                      {tab === "deposit" ? <Plus className="w-5 h-5" /> : <Minus className="w-5 h-5" />}
                      {tab === "deposit" ? "Deposit" : "Withdraw"} {currency.symbol}{amount || "0"}
                    </>
                  )}
                </button>

                {/* Validation Error */}
                {amount && parseFloat(amount) > parseFloat(maxAmount) && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    Insufficient balance
                  </p>
                )}

                {/* Faucet (Testnet) */}
                {tab === "deposit" && (
                  <div className="mt-5 pt-5 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-700">Need testnet USDm?</p>
                        <p className="text-xs text-slate-400">Claim {faucetAmount} USDm from faucet</p>
                      </div>
                      <button
                        onClick={handleFaucet}
                        disabled={!canClaimFaucet || isClaiming}
                        className="px-4 py-2 bg-sky-100 hover:bg-sky-200 disabled:bg-slate-100 text-sky-700 disabled:text-slate-400 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors"
                      >
                        {isClaiming ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Droplets className="w-4 h-4" />
                        )}
                        {isClaiming ? "Claiming..." : "Claim"}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Success step component
function SuccessStep({ 
  amount, 
  action, 
  currency,
  onClose 
}: { 
  amount: string; 
  action: "deposit" | "withdraw";
  currency: { symbol: string };
  onClose: () => void;
}) {
  return (
    <div className="text-center py-6">
      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Check className="w-8 h-8 text-emerald-600" />
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">
        {action === "deposit" ? "Deposit" : "Withdrawal"} Complete!
      </h3>
      <p className="text-slate-500 mb-6">
        {currency.symbol}{amount} has been {action === "deposit" ? "added to" : "withdrawn from"} your trading balance.
      </p>
      <button
        onClick={onClose}
        className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold transition-colors"
      >
        Done
      </button>
    </div>
  );
}
