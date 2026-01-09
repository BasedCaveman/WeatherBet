"use client";

import React, { type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import { wagmiAdapter, projectId, networks, megaeth } from "@/lib/wagmi";
import { WagmiProvider, type Config } from "wagmi";

// Create query client
const queryClient = new QueryClient();

// Define metadata
const metadata = {
  name: "WeatherBet",
  description: "Weather hedging for farmers & event planners",
  url: typeof window !== "undefined" ? window.location.origin : "https://weatherbet.app",
  icons: ["https://weatherbet.app/icon.png"],
};

// Initialize AppKit with social login enabled
const appKit = createAppKit({
  adapters: [wagmiAdapter],
  projectId: projectId || "ff6342f0134a0af6e9f7b972fb1c0afa",
  networks,
  defaultNetwork: megaeth,
  metadata,
  
  // SOCIAL LOGIN - Primary authentication method
  features: {
    analytics: true,
    email: true, // Enable email login
    socials: ['google', 'apple', 'x', 'facebook', 'discord'], // Social providers
    emailShowWallets: true, // Show wallet option after social login
    onramp: false, // Disable for now
  },
  
  // Theme
  themeMode: "light",
  themeVariables: {
    "--w3m-accent": "#22c55e",
    "--w3m-border-radius-master": "2px",
  },
  
  // All wallets available in "advanced" section
  allWallets: "SHOW",
  featuredWalletIds: [], // Don't feature specific wallets
});

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
