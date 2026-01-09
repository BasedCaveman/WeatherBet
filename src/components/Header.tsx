"use client";

import { CloudSun } from "lucide-react";
import { LocationSelector } from "./LocationSelector";
import { CurrencySelector } from "./CurrencySelector";
import { AccountButton } from "./Account";

export function Header() {
  return (
    <header className="w-full px-4 py-4 sm:px-6 sm:py-5">
      <div className="max-w-2xl mx-auto">
        {/* Top row: Logo and Account */}
        <div className="flex items-center justify-between mb-3">
          {/* Logo / Brand */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-sky-400 to-emerald-400 flex items-center justify-center shadow-lg">
              <CloudSun className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-lg sm:text-xl font-bold text-slate-800 hidden sm:block">
              WeatherBet
            </span>
          </div>

          {/* Account Button (Social Login) */}
          <AccountButton />
        </div>

        {/* Bottom row: Location and Currency */}
        <div className="flex items-center justify-between">
          <LocationSelector compact />
          <CurrencySelector compact />
        </div>
      </div>
    </header>
  );
}
