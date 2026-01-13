"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Eye,
  Flag,
  Gavel,
  ExternalLink,
  Loader2
} from "lucide-react";

interface OracleResolutionStatusProps {
  marketId: number;
  status: "betting_closed" | "pending_resolution" | "disputed" | "resolved";
  proposedValue: number | null;
  historicalAvg: number;
  proposedAt: Date | null;
  disputeDeadline: Date | null;
  finalOutcome: boolean | null;
  onDispute?: () => void;
  onFinalize?: () => void;
  canDispute?: boolean;
  canFinalize?: boolean;
  isLoading?: boolean;
}

export function OracleResolutionStatus({
  marketId,
  status,
  proposedValue,
  historicalAvg,
  proposedAt,
  disputeDeadline,
  finalOutcome,
  onDispute,
  onFinalize,
  canDispute = false,
  canFinalize = false,
  isLoading = false,
}: OracleResolutionStatusProps) {
  const [now, setNow] = useState(new Date());
  const [timeLeft, setTimeLeft] = useState("");
  
  // Update every second
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  
  // Calculate time remaining for dispute period
  useEffect(() => {
    if (!disputeDeadline || status !== "pending_resolution") {
      setTimeLeft("");
      return;
    }
    
    const diff = disputeDeadline.getTime() - now.getTime();
    
    if (diff <= 0) {
      setTimeLeft("Ready to finalize");
      return;
    }
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
  }, [now, disputeDeadline, status]);
  
  // Determine outcome text
  const proposedOutcome = proposedValue !== null 
    ? proposedValue > historicalAvg ? "YES" : "NO"
    : null;
  
  const getStatusConfig = () => {
    switch (status) {
      case "betting_closed":
        return {
          icon: Clock,
          title: "Awaiting Oracle Data",
          description: "Waiting for the target week to end and oracle to report weather data.",
          color: "slate",
        };
      case "pending_resolution":
        return {
          icon: Eye,
          title: "Verification Period",
          description: "Oracle has proposed a resolution. Review and dispute if incorrect.",
          color: "amber",
        };
      case "disputed":
        return {
          icon: Flag,
          title: "Resolution Disputed",
          description: "A participant has disputed this resolution. Admin review required.",
          color: "red",
        };
      case "resolved":
        return {
          icon: CheckCircle,
          title: "Market Resolved",
          description: `Final outcome: ${finalOutcome ? "YES" : "NO"} won. Claim your winnings!`,
          color: "emerald",
        };
      default:
        return {
          icon: Shield,
          title: "Unknown Status",
          description: "",
          color: "slate",
        };
    }
  };
  
  const config = getStatusConfig();
  const StatusIcon = config.icon;
  
  const colorClasses = {
    slate: {
      bg: "bg-slate-50",
      border: "border-slate-200",
      icon: "text-slate-500",
      text: "text-slate-700",
    },
    amber: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      icon: "text-amber-500",
      text: "text-amber-700",
    },
    red: {
      bg: "bg-red-50",
      border: "border-red-200",
      icon: "text-red-500",
      text: "text-red-700",
    },
    emerald: {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      icon: "text-emerald-500",
      text: "text-emerald-700",
    },
  };
  
  const colors = colorClasses[config.color as keyof typeof colorClasses];
  
  return (
    <div className={`rounded-2xl border ${colors.border} ${colors.bg} overflow-hidden`}>
      {/* Header */}
      <div className="p-4 border-b border-slate-200/50">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center`}>
            <StatusIcon className={`w-5 h-5 ${colors.icon}`} />
          </div>
          <div>
            <h3 className={`font-bold ${colors.text}`}>{config.title}</h3>
            <p className="text-xs text-slate-500">{config.description}</p>
          </div>
        </div>
      </div>
      
      {/* Resolution details */}
      {(status === "pending_resolution" || status === "disputed" || status === "resolved") && (
        <div className="p-4 space-y-4">
          {/* Proposed value */}
          {proposedValue !== null && (
            <div className="bg-white rounded-xl p-4 border border-slate-100">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-xs text-slate-400 mb-1">Reported Value</p>
                  <p className="text-2xl font-bold text-slate-800">
                    {(proposedValue / 100).toFixed(2)}
                    <span className="text-sm font-normal text-slate-400 ml-1">mm</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400 mb-1">Historical Avg</p>
                  <p className="text-lg font-medium text-slate-600">
                    {(historicalAvg / 100).toFixed(2)}
                    <span className="text-sm font-normal text-slate-400 ml-1">mm</span>
                  </p>
                </div>
              </div>
              
              {/* Comparison bar */}
              <div className="relative h-8 bg-slate-100 rounded-lg overflow-hidden">
                <div 
                  className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-slate-300 z-10"
                  style={{ transform: 'translateX(-50%)' }}
                />
                <div 
                  className={`absolute top-0 bottom-0 left-0 transition-all duration-500 ${
                    proposedValue > historicalAvg ? "bg-emerald-400" : "bg-rose-400"
                  }`}
                  style={{ 
                    width: `${Math.min(100, Math.max(0, 
                      (proposedValue / (historicalAvg * 2)) * 100
                    ))}%` 
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                    proposedValue > historicalAvg 
                      ? "bg-emerald-500 text-white" 
                      : "bg-rose-500 text-white"
                  }`}>
                    {proposedOutcome} wins
                  </span>
                </div>
              </div>
            </div>
          )}
          
          {/* Dispute countdown */}
          {status === "pending_resolution" && disputeDeadline && (
            <div className="bg-amber-100/50 rounded-xl p-4 border border-amber-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-amber-600 mb-1 flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    Dispute Window
                  </p>
                  <p className="text-lg font-bold text-amber-700">{timeLeft}</p>
                </div>
                <div className="text-right text-xs text-amber-600">
                  <p>Proposed at</p>
                  <p className="font-medium">{proposedAt?.toLocaleString()}</p>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="mt-3 h-2 bg-amber-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-amber-500"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${Math.max(0, Math.min(100,
                      ((now.getTime() - (proposedAt?.getTime() || 0)) /
                      ((disputeDeadline?.getTime() || 0) - (proposedAt?.getTime() || 0))) * 100
                    ))}%`
                  }}
                />
              </div>
            </div>
          )}
          
          {/* Action buttons */}
          <div className="flex gap-3">
            {canDispute && onDispute && (
              <button
                onClick={onDispute}
                disabled={isLoading}
                className="flex-1 py-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Flag className="w-4 h-4" />
                )}
                Dispute Resolution
              </button>
            )}
            
            {canFinalize && onFinalize && (
              <button
                onClick={onFinalize}
                disabled={isLoading}
                className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Gavel className="w-4 h-4" />
                )}
                Finalize Resolution
              </button>
            )}
          </div>
          
          {/* Info about dispute process */}
          {status === "pending_resolution" && (
            <div className="text-xs text-slate-500 flex items-start gap-2 bg-slate-50 rounded-lg p-3">
              <AlertTriangle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
              <p>
                If you believe the oracle data is incorrect, you can dispute within 24 hours. 
                Disputes require a position in this market. Once the dispute window closes, 
                anyone can finalize the resolution.
              </p>
            </div>
          )}
          
          {/* Disputed status */}
          {status === "disputed" && (
            <div className="text-xs text-red-600 flex items-start gap-2 bg-red-50 rounded-lg p-3">
              <Flag className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p>
                This resolution has been disputed. The admin team will review the oracle data 
                and either confirm or override the result. Please wait for the final decision.
              </p>
            </div>
          )}
        </div>
      )}
      
      {/* Betting closed - waiting for data */}
      {status === "betting_closed" && (
        <div className="p-4">
          <div className="flex items-center justify-center gap-3 py-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Clock className="w-8 h-8 text-slate-400" />
            </motion.div>
            <div className="text-center">
              <p className="text-slate-600 font-medium">Waiting for weather data</p>
              <p className="text-xs text-slate-400">Resolution will begin after the target week ends</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Compact version for market cards
 */
export function CompactResolutionStatus({ 
  status, 
  disputeDeadline 
}: { 
  status: string;
  disputeDeadline?: Date;
}) {
  const [now, setNow] = useState(new Date());
  
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  
  if (status === "resolved") {
    return (
      <span className="text-emerald-600 text-xs font-medium flex items-center gap-1">
        <CheckCircle className="w-3 h-3" />
        Resolved
      </span>
    );
  }
  
  if (status === "disputed") {
    return (
      <span className="text-red-600 text-xs font-medium flex items-center gap-1">
        <Flag className="w-3 h-3" />
        Disputed
      </span>
    );
  }
  
  if (status === "pending_resolution" && disputeDeadline) {
    const diff = disputeDeadline.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return (
      <span className="text-amber-600 text-xs font-medium flex items-center gap-1">
        <Eye className="w-3 h-3" />
        Verify: {hours}h {minutes}m
      </span>
    );
  }
  
  return (
    <span className="text-slate-500 text-xs font-medium flex items-center gap-1">
      <Clock className="w-3 h-3" />
      Awaiting data
    </span>
  );
}
