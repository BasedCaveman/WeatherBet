"use client";

import { useWeb3 } from "@/providers/Web3Provider";

export function Header() {
  const { address, connect, disconnect, isConnecting } = useWeb3();

  return (
    <header className="flex justify-between items-center p-4 bg-gray-900 border-b border-gray-800">
      <h1 className="text-xl font-bold text-white">🌦️ WeatherBet</h1>
      
      {address ? (
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
          <button
            onClick={disconnect}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={connect}
          disabled={isConnecting}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </button>
      )}
    </header>
  );
}
