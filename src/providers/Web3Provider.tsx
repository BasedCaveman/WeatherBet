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
  description: "Simple weather prediction markets for everyone",
  url: typeof window !== "undefined" ? window.location.origin : "https://weatherbet.app",
  icons: ["https://weatherbet.app/icon.png"],
};

// Initialize AppKit - always call this
const appKit = createAppKit({
  adapters: [wagmiAdapter],
  projectId: projectId || "demo", // fallback to prevent errors
  networks,
  defaultNetwork: megaeth,
  metadata,
  features: {
    analytics: true,
    email: false,
    socials: false,
  },
  themeMode: "light",
  themeVariables: {
    "--w3m-accent": "#22c55e",
    "--w3m-border-radius-master": "2px",
  },
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
