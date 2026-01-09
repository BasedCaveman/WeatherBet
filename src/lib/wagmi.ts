import { cookieStorage, createStorage } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { defineChain } from "viem";
import type { AppKitNetwork } from "@reown/appkit/networks";

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || "ff6342f0134a0af6e9f7b972fb1c0afa";

// Define MegaETH chain
export const megaeth = defineChain({
  id: 6342,
  name: "MegaETH Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://6342.rpc.thirdweb.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "MegaETH Explorer",
      url: "https://megaexplorer.xyz",
    },
  },
  testnet: true,
});

// Networks supported - cast as AppKitNetwork array tuple
export const networks = [megaeth] as [AppKitNetwork, ...AppKitNetwork[]];

// Wagmi Adapter for Reown AppKit
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;

// App metadata for social login
export const appMetadata = {
  name: "WeatherBet",
  description: "Weather prediction markets for everyone",
  url: typeof window !== "undefined" ? window.location.origin : "https://weatherbet.app",
  icons: ["https://weatherbet.app/icon.png"],
};

// Social login features configuration
export const socialFeatures = {
  email: true,
  // Primary social options (Google & Apple most common)
  socials: ['google', 'apple', 'x', 'facebook', 'discord'] as const,
  // Enable smart accounts for gasless transactions
  emailShowWallets: true,
};
