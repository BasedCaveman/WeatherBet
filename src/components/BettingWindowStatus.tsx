"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, AlertTriangle, Lock, CheckCircle, Timer } from "lucide-react";

interface BettingWindowStatusProps {
  bettingOpens: Date;
  bettingCloses: Date;
  targetWeekStart: Date;
  targetWeekEnd: Date;
  status: "pending" | "active" | "betting_closed" | "pending_resolution" | "disputed" | "resolved" | "cancelled";
}

export function BettingWindowStatus({
  bettingOpens,
  bettingCloses,
  targetWeekStart,
  targetWeekEnd,
  status,
}: BettingWindowStatusProps) {
  const [now, setNow] = useState(new Date());
  const [timeLeft, setTimeLeft] = useState("");
  
  // Update every second
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  
  // Calculate time remaining
  useEffect(() => {
    const diff = bettingCloses.getTime() - now.getTime();
    
    if (diff <= 0) {
      setTimeLeft("Closed");
      return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    if (days > 0) {
      setTimeLeft(`${days}d ${hours}h ${minutes}m`);
    } else if (hours > 0) {
      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    } else if (minutes > 0) {
      setTimeLeft(`${minutes}m ${seconds}s`);
    } else {
      setTimeLeft(`${seconds}s`);
    }
  }, [now, bettingCloses]);
  
  const isBettingOpen = now >= bettingOpens && now < bettingCloses && 
    (status === "pending" || status === "active");
  
  const isUrgent = bettingCloses.getTime() - now.getTime() < 3600000; // < 1 hour
  const isWarning = bettingCloses.getTime() - now.getTime() < 86400000; // < 24 hours
  
  // Determine visual state
  const getStatusConfig = () => {
    if (status === "resolved") {
      return {
        icon: CheckCircle,
        label: "Resolved",
        color: "text-emerald-600",
        bgColor: "bg-emerald-50",
        borderColor: "border-emerald-200",
      };
    }
    if (status === "pending_resolution" || status === "disputed") {
      return {
        icon: Timer,
        label: status === "disputed" ? "Disputed" : "Awaiting Resolution",
        color: "text-amber-600",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200",
      };
    }
    if (status === "betting_closed" || !isBettingOpen) {
      return {
        icon: Lock,
        label: "Betting Closed",
        color: "text-slate-500",
        bgColor: "bg-slate-50",
        borderColor: "border-slate-200",
      };
    }
    if (isUrgent) {
      return {
        icon: AlertTriangle,
        label: "Closing Soon!",
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        pulse: true,
      };
    }
    if (isWarning) {
      return {
        icon: Clock,
        label: "Last Day to Bet",
        color: "text-amber-600",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200",
      };
    }
    return {
      icon: Clock,
      label: "Betting Open",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
    };
  };
  
  const config = getStatusConfig();
  const StatusIcon = config.icon;
  
  return (
    <div className={`rounded-xl border ${config.borderColor} ${config.bgColor} p-3`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.div
            animate={config.pulse ? { scale: [1, 1.1, 1] } : {}}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            <StatusIcon className={`w-4 h-4 ${config.color}`} />
          </motion.div>
          <span className={`text-sm font-medium ${config.color}`}>
            {config.label}
          </span>
        </div>
        
        {isBettingOpen && (
          <div className="text-right">
            <span className={`text-sm font-bold ${isUrgent ? "text-red-600" : isWarning ? "text-amber-600" : "text-slate-700"}`}>
              {timeLeft}
            </span>
            <span className="text-xs text-slate-400 block">until close</span>
          </div>
        )}
      </div>
      
      {/* Timeline visualization */}
      <div className="mt-3 relative">
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          {/* Progress bar */}
          <motion.div
            className={`h-full ${isUrgent ? "bg-red-500" : isWarning ? "bg-amber-500" : "bg-emerald-500"}`}
            initial={{ width: 0 }}
            animate={{ 
              width: `${Math.max(0, Math.min(100, 
                ((now.getTime() - bettingOpens.getTime()) / 
                (bettingCloses.getTime() - bettingOpens.getTime())) * 100
              ))}%` 
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        {/* Timeline labels */}
        <div className="flex justify-between mt-1 text-[10px] text-slate-400">
          <span>Opened</span>
          <span>Closes {formatShortDate(bettingCloses)}</span>
        </div>
      </div>
      
      {/* Week info */}
      <div className="mt-2 pt-2 border-t border-slate-200/50 flex justify-between text-xs">
        <span className="text-slate-500">
          📅 Week: {formatShortDate(targetWeekStart)} - {formatShortDate(targetWeekEnd)}
        </span>
      </div>
    </div>
  );
}

/**
 * Compact countdown for use in cards
 */
export function CompactCountdown({ 
  closesAt, 
  status 
}: { 
  closesAt: Date; 
  status: string;
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
  
  if (status === "pending_resolution" || status === "disputed") {
    return (
      <span className="text-amber-600 text-xs font-medium flex items-center gap-1">
        <Timer className="w-3 h-3" />
        {status === "disputed" ? "Disputed" : "Resolving"}
      </span>
    );
  }
  
  const diff = closesAt.getTime() - now.getTime();
  
  if (diff <= 0) {
    return (
      <span className="text-slate-500 text-xs font-medium flex items-center gap-1">
        <Lock className="w-3 h-3" />
        Closed
      </span>
    );
  }
  
  const isUrgent = diff < 3600000; // < 1 hour
  const isWarning = diff < 86400000; // < 24 hours
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  let timeString = "";
  if (hours >= 24) {
    const days = Math.floor(hours / 24);
    timeString = `${days}d ${hours % 24}h`;
  } else if (hours > 0) {
    timeString = `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    timeString = `${minutes}m ${seconds}s`;
  } else {
    timeString = `${seconds}s`;
  }
  
  return (
    <motion.span
      className={`text-xs font-medium flex items-center gap-1 ${
        isUrgent ? "text-red-600" : isWarning ? "text-amber-600" : "text-slate-500"
      }`}
      animate={isUrgent ? { opacity: [1, 0.5, 1] } : {}}
      transition={{ repeat: Infinity, duration: 1 }}
    >
      <Clock className="w-3 h-3" />
      {timeString}
    </motion.span>
  );
}

// Helper function
function formatShortDate(date: Date): string {
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}
