"use client";

import { useState, useMemo } from "react";
import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from "wagmi";
import { parseEther, formatEther } from "viem";
import {
  PREDICTION_MARKET_ADDRESS,
  PREDICTION_MARKET_ABI,
  MOCK_MARKETS,
  MarketType,
} from "@/lib/constants";

export interface Market {
  id: number;
  marketType: MarketType;
  startTime: number;
  endTime: number;
  totalYesAmount: bigint;
  totalNoAmount: bigint;
  resolved: boolean;
  outcome: boolean;
}

export interface UserPrediction {
  position: boolean;
  amount: bigint;
  claimed: boolean;
}

// Use mock data in development
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true" || PREDICTION_MARKET_ADDRESS === "0x0000000000000000000000000000000000000000";

export function useMarkets() {
  // In mock mode, return mock data
  if (USE_MOCK) {
    return {
      markets: MOCK_MARKETS as Market[],
      isLoading: false,
      error: null,
    };
  }

  // Real contract call would go here
  return {
    markets: [] as Market[],
    isLoading: false,
    error: null,
  };
}

export function useMarket(marketId: number) {
  if (USE_MOCK) {
    const market = MOCK_MARKETS.find((m) => m.id === marketId);
    return {
      market: market as Market | undefined,
      isLoading: false,
      error: null,
    };
  }

  const { data, isLoading, error } = useReadContract({
    address: PREDICTION_MARKET_ADDRESS,
    abi: PREDICTION_MARKET_ABI,
    functionName: "getMarket",
    args: [BigInt(marketId)],
  });

  return {
    market: data as Market | undefined,
    isLoading,
    error,
  };
}

export function useUserPrediction(marketId: number) {
  const { address } = useAccount();

  if (USE_MOCK || !address) {
    return {
      prediction: null as UserPrediction | null,
      isLoading: false,
      error: null,
    };
  }

  const { data, isLoading, error } = useReadContract({
    address: PREDICTION_MARKET_ADDRESS,
    abi: PREDICTION_MARKET_ABI,
    functionName: "getUserPrediction",
    args: [BigInt(marketId), address],
  });

  // Transform tuple response to UserPrediction object
  const prediction: UserPrediction | null = data
    ? {
        position: data[0],
        amount: data[1],
        claimed: data[2],
      }
    : null;

  return {
    prediction,
    isLoading,
    error,
  };
}

export function usePlacePrediction() {
  const [isPending, setIsPending] = useState(false);
  const { writeContract, data: hash, error, isPending: isWritePending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const placePrediction = async (marketId: number, prediction: boolean, amount: number) => {
    if (USE_MOCK) {
      setIsPending(true);
      // Simulate transaction
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsPending(false);
      return;
    }

    writeContract({
      address: PREDICTION_MARKET_ADDRESS,
      abi: PREDICTION_MARKET_ABI,
      functionName: "placePrediction",
      args: [BigInt(marketId), prediction],
      value: parseEther(amount.toString()),
    });
  };

  return {
    placePrediction,
    isPending: isPending || isWritePending || isConfirming,
    isSuccess,
    error,
    hash,
  };
}

export function useClaimWinnings() {
  const { writeContract, data: hash, error, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const claimWinnings = (marketId: number) => {
    writeContract({
      address: PREDICTION_MARKET_ADDRESS,
      abi: PREDICTION_MARKET_ABI,
      functionName: "claimWinnings",
      args: [BigInt(marketId)],
    });
  };

  return {
    claimWinnings,
    isPending: isPending || isConfirming,
    isSuccess,
    error,
    hash,
  };
}

// Utility functions
export function calculateOdds(yesAmount: bigint, noAmount: bigint) {
  const total = yesAmount + noAmount;
  if (total === BigInt(0)) return { yesPercent: 50, noPercent: 50 };

  const yesPercent = Number((yesAmount * BigInt(100)) / total);
  const noPercent = 100 - yesPercent;

  return { yesPercent, noPercent };
}

export function formatAmount(amount: bigint) {
  return parseFloat(formatEther(amount)).toFixed(3);
}

export function getTimeRemaining(endTime: number) {
  const now = Math.floor(Date.now() / 1000);
  const remaining = endTime - now;

  if (remaining <= 0) return { days: 0, hours: 0, text: "Ended" };

  const days = Math.floor(remaining / (24 * 60 * 60));
  const hours = Math.floor((remaining % (24 * 60 * 60)) / (60 * 60));

  if (days > 0) return { days, hours, text: `${days}d` };
  return { days: 0, hours, text: `${hours}h` };
}
