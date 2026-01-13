"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  DollarSign,
  ChevronRight,
  Plus,
  Minus,
  History,
  PieChart,
  LogOut,
  Loader2
} from "lucide-react";
import { useAppKit, useAppKitAccount, useDisconnect } from "@reown/appkit/react";
import { useCurrency } from "@/providers/CurrencyProvider";
import { useAmmAccount } from "@/hooks/useAmm";
import { useUsdm } from "@/hooks/useUsdm";
import { DepositWithdrawModal } from "./DepositWithdraw";

// Mock positions for demo - will be replaced with contract data
interface Position {
  id: string;
  marketName: string;
  marketType: "rain" | "temp";
  location: string;
  side: "YES" | "NO";
  shares: number;
  avgPrice: number;
  currentPrice: number;
  unrealizedPnL: number;
  unrealizedPnLPercent: number;
}

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccountModal({ isOpen, onClose }: AccountModalProps) {
  const { address, isConnected } = useAppKitAccount();
  const { disconnect } = useDisconnect();
  const { currency } = useCurrency();
  const [activeTab, setActiveTab] = useState<"positions" | "history" | "stats">("positions");
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositTab, setDepositTab] = useState<"deposit" | "withdraw">("deposit");

  // Real contract data
  const { account, isLoading: isLoadingAccount, refetch: refetchAccount } = useAmmAccount();
  const { balance: walletBalance, isLoading: isLoadingWallet } = useUsdm();

  // Mock positions - will be replaced with real data from usePositions hook
  const [positions, setPositions] = useState<Position[]>([
    {
      id: "1",
      marketName: "Rain > Average",
      marketType: "rain",
      location: "São Paulo",
      side: "YES",
      shares: 50,
      avgPrice: 0.52,
      currentPrice: 0.58,
      unrealizedPnL: 3.00,
      unrealizedPnLPercent: 11.5,
    },
    {
      id: "2",
      marketName: "Temp > Average",
      marketType: "temp",
      location: "London",
      side: "NO",
      shares: 25,
      avgPrice: 0.45,
      currentPrice: 0.42,
      unrealizedPnL: -0.75,
      unrealizedPnLPercent: -6.7,
    },
  ]);

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleDisconnect = async () => {
    await disconnect();
    onClose();
  };

  const handleOpenDeposit = (tab: "deposit" | "withdraw") => {
    setDepositTab(tab);
    setShowDepositModal(true);
  };

  // Calculate stats from account data
  const contractBalance = account?.balance ? parseFloat(account.balance) : 0;
  const totalPnL = account 
    ? parseFloat(account.totalWinnings) - parseFloat(account.totalLosses)
    : 0;
  const winRate = account?.winRate || 0;
  const marketsWon = account?.marketsWon || 0;
  const marketsParticipated = account?.marketsParticipated || 0;

  if (!isOpen) return null;

  return (
    <>
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
            className="relative w-full max-w-md max-h-[90vh] bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-slate-100 px-5 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800">Account</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              {/* Balance Card */}
              <div className="p-5">
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-5 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-emerald-100 text-sm">Trading Balance</span>
                    {address && (
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                        {formatAddress(address)}
                      </span>
                    )}
                  </div>
                  <div className="text-3xl font-bold mb-1">
                    {isLoadingAccount ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <>{currency.symbol}{contractBalance.toFixed(2)}</>
                    )}
                  </div>
                  <div className="text-sm text-emerald-100 mb-4">
                    Wallet: {currency.symbol}{parseFloat(walletBalance).toFixed(2)}
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleOpenDeposit("deposit")}
                      className="flex-1 bg-white/20 hover:bg-white/30 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Deposit
                    </button>
                    <button 
                      onClick={() => handleOpenDeposit("withdraw")}
                      className="flex-1 bg-white/20 hover:bg-white/30 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                      Withdraw
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="px-5 pb-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs text-slate-500">Total P&L</span>
                    </div>
                    <div className={`text-lg font-bold ${totalPnL >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                      {isLoadingAccount ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>{totalPnL >= 0 ? "+" : ""}{currency.symbol}{totalPnL.toFixed(2)}</>
                      )}
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <PieChart className="w-4 h-4 text-sky-500" />
                      <span className="text-xs text-slate-500">Win Rate</span>
                    </div>
                    <div className="text-lg font-bold text-slate-700">
                      {isLoadingAccount ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>{winRate}%</>
                      )}
                    </div>
                    <div className="text-xs text-slate-400">
                      {marketsWon}/{marketsParticipated} markets
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="px-5 border-b border-slate-100">
                <div className="flex gap-1">
                  {[
                    { id: "positions", label: "Positions", icon: Wallet },
                    { id: "history", label: "History", icon: History },
                    { id: "stats", label: "Stats", icon: PieChart },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? "border-emerald-500 text-emerald-600"
                          : "border-transparent text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-5">
                {activeTab === "positions" && (
                  <div className="space-y-3">
                    {positions.length === 0 ? (
                      <div className="text-center py-8 text-slate-400">
                        <Wallet className="w-10 h-10 mx-auto mb-2 opacity-50" />
                        <p>No open positions</p>
                      </div>
                    ) : (
                      positions.map((pos) => (
                        <PositionCard key={pos.id} position={pos} currency={currency} />
                      ))
                    )}
                  </div>
                )}

                {activeTab === "history" && (
                  <div className="text-center py-8 text-slate-400">
                    <History className="w-10 h-10 mx-auto mb-2 opacity-50" />
                    <p>Transaction history coming soon</p>
                  </div>
                )}

                {activeTab === "stats" && (
                  <div className="space-y-4">
                    <StatRow 
                      label="Total Deposited" 
                      value={`${currency.symbol}${account?.totalDeposited || "0.00"}`} 
                      isLoading={isLoadingAccount}
                    />
                    <StatRow 
                      label="Total Withdrawn" 
                      value={`${currency.symbol}${account?.totalWithdrawn || "0.00"}`} 
                      isLoading={isLoadingAccount}
                    />
                    <StatRow 
                      label="Total Winnings" 
                      value={`+${currency.symbol}${account?.totalWinnings || "0.00"}`} 
                      positive={true}
                      isLoading={isLoadingAccount}
                    />
                    <StatRow 
                      label="Total Losses" 
                      value={`-${currency.symbol}${account?.totalLosses || "0.00"}`} 
                      positive={false}
                      isLoading={isLoadingAccount}
                    />
                    <StatRow 
                      label="Markets Participated" 
                      value={marketsParticipated.toString()} 
                      isLoading={isLoadingAccount}
                    />
                    <StatRow 
                      label="Markets Won" 
                      value={marketsWon.toString()} 
                      isLoading={isLoadingAccount}
                    />
                  </div>
                )}
              </div>

              {/* Disconnect Button */}
              <div className="p-5 border-t border-slate-100">
                <button
                  onClick={handleDisconnect}
                  className="w-full py-3 text-red-500 hover:bg-red-50 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Disconnect
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Deposit/Withdraw Modal */}
      <DepositWithdrawModal 
        isOpen={showDepositModal}
        onClose={() => {
          setShowDepositModal(false);
          refetchAccount();
        }}
        initialTab={depositTab}
      />
    </>
  );
}

// Position Card Component
function PositionCard({ position, currency }: { position: Position; currency: { symbol: string } }) {
  const isProfit = position.unrealizedPnL >= 0;

  return (
    <div className="bg-slate-50 rounded-xl p-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg">
              {position.marketType === "rain" ? "🌧️" : "🌡️"}
            </span>
            <span className="font-medium text-slate-700">{position.marketName}</span>
          </div>
          <p className="text-xs text-slate-400">{position.location}</p>
        </div>
        <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
          position.side === "YES" 
            ? "bg-emerald-100 text-emerald-700" 
            : "bg-slate-200 text-slate-600"
        }`}>
          {position.side}
        </span>
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs text-slate-400">
            {position.shares} shares @ {currency.symbol}{position.avgPrice.toFixed(2)}
          </p>
          <p className="text-sm text-slate-600">
            Current: {currency.symbol}{position.currentPrice.toFixed(2)}
          </p>
        </div>
        <div className="text-right">
          <p className={`font-bold ${isProfit ? "text-emerald-600" : "text-red-500"}`}>
            {isProfit ? "+" : ""}{currency.symbol}{position.unrealizedPnL.toFixed(2)}
          </p>
          <p className={`text-xs ${isProfit ? "text-emerald-500" : "text-red-400"}`}>
            {isProfit ? "+" : ""}{position.unrealizedPnLPercent.toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
}

// Stat Row Component
function StatRow({ 
  label, 
  value, 
  positive,
  isLoading 
}: { 
  label: string; 
  value: string; 
  positive?: boolean;
  isLoading?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
      ) : (
        <span className={`font-medium ${
          positive === true ? "text-emerald-600" : 
          positive === false ? "text-red-500" : 
          "text-slate-700"
        }`}>
          {value}
        </span>
      )}
    </div>
  );
}

// Export a simple trigger button
export function AccountButton() {
  const [showModal, setShowModal] = useState(false);
  const { address, isConnected } = useAppKitAccount();
  const { open } = useAppKit();
  const { account, isLoading } = useAmmAccount();
  const { currency } = useCurrency();

  if (!isConnected) {
    return (
      <button
        onClick={() => open()}
        className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-colors"
      >
        <Wallet className="w-4 h-4" />
        Sign In
      </button>
    );
  }

  const balance = account?.balance ? parseFloat(account.balance).toFixed(2) : "0.00";

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 hover:border-slate-300 rounded-xl transition-colors"
      >
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-sky-400" />
        <div className="text-left">
          <span className="text-sm font-medium text-slate-700 block">
            {currency.symbol}{balance}
          </span>
          <span className="text-xs text-slate-400">
            {address?.slice(0, 4)}...{address?.slice(-4)}
          </span>
        </div>
      </button>
      
      <AccountModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
