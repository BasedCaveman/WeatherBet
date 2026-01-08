"use client";

import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { Wallet, CloudSun } from "lucide-react";

export function Header() {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
  };

  return (
    <header className="w-full px-4 py-4 sm:px-6 sm:py-5">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-sky-400 to-emerald-400 flex items-center justify-center shadow-lg">
            <CloudSun className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-lg sm:text-xl font-bold text-slate-800 hidden sm:block">
            WeatherBet
          </span>
        </div>

        {/* Wallet Button */}
        <button
          onClick={() => open()}
          className="wallet-btn flex items-center gap-2"
        >
          <Wallet className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">
            {isConnected && address ? formatAddress(address) : "Connect"}
          </span>
        </button>
      </div>
    </header>
  );
}
