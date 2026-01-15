"use client";

import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { parseUnits, formatUnits } from "viem";
import { useState, useEffect, useCallback } from "react";
import { 
  CONTRACT_ADDRESSES, 
  WEATHER_BET_AMM_ABI,
  ContractUserAccount,
  ContractMarket,
  ContractPosition,
  BettingStatus,
  ResolutionStatus,
  formatUsdm,
  priceToPercent,
  getStatusString,
} from "@/lib/contracts";

// Get contract address for current network
function useAmmAddress() {
  const { chainId } = useAppKitNetwork();
  const networkId = chainId || 6342;
  const addresses = CONTRACT_ADDRESSES[networkId as keyof typeof CONTRACT_ADDRESSES];
  return addresses?.weatherBetAMM || CONTRACT_ADDRESSES[6342].weatherBetAMM;
}

/**
 * Hook to get user account from AMM contract
 */
export function useAmmAccount() {
  const { address, isConnected } = useAppKitAccount();
  const ammAddress = useAmmAddress();

  const { data: account, isLoading, error, refetch } = useReadContract({
    address: ammAddress as `0x${string}`,
    abi: WEATHER_BET_AMM_ABI,
    functionName: "getAccount",
    args: address ? [address as `0x${string}`] : undefined,
    query: {
      enabled: isConnected && !!address,
    },
  });

  // Parse the account data
  const parsedAccount = account ? {
    balance: formatUnits((account as ContractUserAccount).balance, 18),
    balanceRaw: (account as ContractUserAccount).balance,
    totalDeposited: formatUnits((account as ContractUserAccount).totalDeposited, 18),
    totalWithdrawn: formatUnits((account as ContractUserAccount).totalWithdrawn, 18),
    totalWinnings: formatUnits((account as ContractUserAccount).totalWinnings, 18),
    totalLosses: formatUnits((account as ContractUserAccount).totalLosses, 18),
    marketsParticipated: Number((account as ContractUserAccount).marketsParticipated),
    marketsWon: Number((account as ContractUserAccount).marketsWon),
    winRate: (account as ContractUserAccount).marketsParticipated > 0
      ? Math.round(
          (Number((account as ContractUserAccount).marketsWon) / 
           Number((account as ContractUserAccount).marketsParticipated)) * 100
        )
      : 0,
  } : null;

  return {
    account: parsedAccount,
    isLoading,
    error,
    refetch,
  };
}

/**
 * Hook to deposit USDm into AMM
 */
export function useDeposit() {
  const ammAddress = useAmmAddress();
  
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const deposit = useCallback(
    async (amount: string) => {
      const amountBigInt = parseUnits(amount, 18);
      
      writeContract({
        address: ammAddress as `0x${string}`,
        abi: WEATHER_BET_AMM_ABI,
        functionName: "deposit",
        args: [amountBigInt],
      });
    },
    [writeContract, ammAddress]
  );

  return {
    deposit,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  };
}

/**
 * Hook to withdraw USDm from AMM
 */
export function useWithdraw() {
  const ammAddress = useAmmAddress();
  
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const withdraw = useCallback(
    async (amount: string) => {
      const amountBigInt = parseUnits(amount, 18);
      
      writeContract({
        address: ammAddress as `0x${string}`,
        abi: WEATHER_BET_AMM_ABI,
        functionName: "withdraw",
        args: [amountBigInt],
      });
    },
    [writeContract, ammAddress]
  );

  return {
    withdraw,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  };
}

/**
 * Hook to get market details
 */
export function useMarket(marketId: number) {
  const ammAddress = useAmmAddress();

  const { data: market, isLoading, error, refetch } = useReadContract({
    address: ammAddress as `0x${string}`,
    abi: WEATHER_BET_AMM_ABI,
    functionName: "getMarket",
    args: [BigInt(marketId)],
    query: {
      enabled: marketId > 0,
    },
  });

  // Get prices
  const { data: prices, refetch: refetchPrices } = useReadContract({
    address: ammAddress as `0x${string}`,
    abi: WEATHER_BET_AMM_ABI,
    functionName: "getPrices",
    args: [BigInt(marketId)],
    query: {
      enabled: marketId > 0,
    },
  });

  const parsedMarket = market ? {
    id: Number((market as ContractMarket).id),
    marketType: (market as ContractMarket).marketType,
    locationHash: (market as ContractMarket).locationHash,
    createdAt: new Date(Number((market as ContractMarket).createdAt) * 1000),
    bettingOpens: new Date(Number((market as ContractMarket).bettingOpens) * 1000),
    bettingCloses: new Date(Number((market as ContractMarket).bettingCloses) * 1000),
    targetWeekStart: new Date(Number((market as ContractMarket).targetWeekStart) * 1000),
    targetWeekEnd: new Date(Number((market as ContractMarket).targetWeekEnd) * 1000),
    yesShares: formatUnits((market as ContractMarket).yesShares, 18),
    noShares: formatUnits((market as ContractMarket).noShares, 18),
    totalVolume: formatUnits((market as ContractMarket).totalVolume, 18),
    historicalAvg: Number((market as ContractMarket).historicalAvg) / 100,
    status: (market as ContractMarket).status,
    statusString: getStatusString((market as ContractMarket).status),
    proposedOutcome: Number((market as ContractMarket).proposedOutcome) / 100,
    resolutionProposedAt: (market as ContractMarket).resolutionProposedAt > 0 
      ? new Date(Number((market as ContractMarket).resolutionProposedAt) * 1000)
      : null,
    finalOutcome: (market as ContractMarket).finalOutcome,
    yesPrice: prices ? priceToPercent((prices as [bigint, bigint])[0]) : 50,
    noPrice: prices ? priceToPercent((prices as [bigint, bigint])[1]) : 50,
  } : null;

  return {
    market: parsedMarket,
    isLoading,
    error,
    refetch: () => {
      refetch();
      refetchPrices();
    },
  };
}

/**
 * Hook to get user position in a market
 */
export function usePosition(marketId: number) {
  const { address, isConnected } = useAppKitAccount();
  const ammAddress = useAmmAddress();

  const { data: position, isLoading, error, refetch } = useReadContract({
    address: ammAddress as `0x${string}`,
    abi: WEATHER_BET_AMM_ABI,
    functionName: "getPosition",
    args: address ? [BigInt(marketId), address as `0x${string}`] : undefined,
    query: {
      enabled: isConnected && !!address && marketId > 0,
    },
  });

  const parsedPosition = position ? {
    yesShares: formatUnits((position as ContractPosition).yesShares, 18),
    yesSharesRaw: (position as ContractPosition).yesShares,
    noShares: formatUnits((position as ContractPosition).noShares, 18),
    noSharesRaw: (position as ContractPosition).noShares,
    totalCost: formatUnits((position as ContractPosition).totalCost, 18),
    claimed: (position as ContractPosition).claimed,
    hasPosition: (position as ContractPosition).yesShares > 0 || (position as ContractPosition).noShares > 0,
  } : null;

  return {
    position: parsedPosition,
    isLoading,
    error,
    refetch,
  };
}

/**
 * Hook to get quote for buying shares
 */
export function useQuoteBuy(marketId: number, isYes: boolean, shares: string) {
  const ammAddress = useAmmAddress();
  const sharesBI = shares ? parseUnits(shares, 18) : BigInt(0);

  const { data: cost, isLoading, error } = useReadContract({
    address: ammAddress as `0x${string}`,
    abi: WEATHER_BET_AMM_ABI,
    functionName: "quoteBuy",
    args: [BigInt(marketId), isYes, sharesBI],
    query: {
      enabled: marketId > 0 && sharesBI > 0,
    },
  });

  return {
    cost: cost ? formatUnits(cost as bigint, 18) : "0",
    costRaw: cost as bigint | undefined,
    isLoading,
    error,
  };
}

/**
 * Hook to get quote for selling shares
 */
export function useQuoteSell(marketId: number, isYes: boolean, shares: string) {
  const ammAddress = useAmmAddress();
  const sharesBI = shares ? parseUnits(shares, 18) : BigInt(0);

  const { data: payout, isLoading, error } = useReadContract({
    address: ammAddress as `0x${string}`,
    abi: WEATHER_BET_AMM_ABI,
    functionName: "quoteSell",
    args: [BigInt(marketId), isYes, sharesBI],
    query: {
      enabled: marketId > 0 && sharesBI > 0,
    },
  });

  return {
    payout: payout ? formatUnits(payout as bigint, 18) : "0",
    payoutRaw: payout as bigint | undefined,
    isLoading,
    error,
  };
}

/**
 * Hook to buy shares
 */
export function useBuyShares() {
  const ammAddress = useAmmAddress();
  
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const buyShares = useCallback(
    async (marketId: number, isYes: boolean, shares: string, maxCost: string) => {
      const sharesBigInt = parseUnits(shares, 18);
      const maxCostBigInt = parseUnits(maxCost, 18);
      
      writeContract({
        address: ammAddress as `0x${string}`,
        abi: WEATHER_BET_AMM_ABI,
        functionName: "buyShares",
        args: [BigInt(marketId), isYes, sharesBigInt, maxCostBigInt],
      });
    },
    [writeContract, ammAddress]
  );

  return {
    buyShares,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
    reset,
  };
}

/**
 * Hook to sell shares
 */
export function useSellShares() {
  const ammAddress = useAmmAddress();
  
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const sellShares = useCallback(
    async (marketId: number, isYes: boolean, shares: string, minPayout: string) => {
      const sharesBigInt = parseUnits(shares, 18);
      const minPayoutBigInt = parseUnits(minPayout, 18);
      
      writeContract({
        address: ammAddress as `0x${string}`,
        abi: WEATHER_BET_AMM_ABI,
        functionName: "sellShares",
        args: [BigInt(marketId), isYes, sharesBigInt, minPayoutBigInt],
      });
    },
    [writeContract, ammAddress]
  );

  return {
    sellShares,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
    reset,
  };
}

/**
 * Hook to claim winnings
 */
export function useClaimWinnings() {
  const ammAddress = useAmmAddress();
  
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const claimWinnings = useCallback(
    async (marketId: number) => {
      writeContract({
        address: ammAddress as `0x${string}`,
        abi: WEATHER_BET_AMM_ABI,
        functionName: "claimWinnings",
        args: [BigInt(marketId)],
      });
    },
    [writeContract, ammAddress]
  );

  return {
    claimWinnings,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
    reset,
  };
}

/**
 * Hook to get all active markets
 */
export function useActiveMarkets() {
  const ammAddress = useAmmAddress();

  const { data: marketIds, isLoading, error, refetch } = useReadContract({
    address: ammAddress as `0x${string}`,
    abi: WEATHER_BET_AMM_ABI,
    functionName: "getActiveMarkets",
  });

  return {
    marketIds: (marketIds as bigint[] | undefined)?.map(id => Number(id)) || [],
    isLoading,
    error,
    refetch,
  };
}

/**
 * Hook to get betting window status
 */
export function useBettingStatus(marketId: number) {
  const ammAddress = useAmmAddress();

  const { data: status, isLoading, error, refetch } = useReadContract({
    address: ammAddress as `0x${string}`,
    abi: WEATHER_BET_AMM_ABI,
    functionName: "getBettingStatus",
    args: [BigInt(marketId)],
    query: {
      enabled: marketId > 0,
    },
  });

  const parsedStatus = status ? {
    isOpen: (status as BettingStatus).isOpen,
    opensAt: new Date(Number((status as BettingStatus).opensAt) * 1000),
    closesAt: new Date(Number((status as BettingStatus).closesAt) * 1000),
    secondsUntilClose: Number((status as BettingStatus).secondsUntilClose),
  } : null;

  return {
    bettingStatus: parsedStatus,
    isLoading,
    error,
    refetch,
  };
}

/**
 * Hook to get resolution status
 */
export function useResolutionStatus(marketId: number) {
  const ammAddress = useAmmAddress();

  const { data: status, isLoading, error, refetch } = useReadContract({
    address: ammAddress as `0x${string}`,
    abi: WEATHER_BET_AMM_ABI,
    functionName: "getResolutionStatus",
    args: [BigInt(marketId)],
    query: {
      enabled: marketId > 0,
    },
  });

  const parsedStatus = status ? {
    status: (status as ResolutionStatus).status,
    statusString: getStatusString((status as ResolutionStatus).status),
    proposedValue: Number((status as ResolutionStatus).proposedValue) / 100,
    proposedAt: (status as ResolutionStatus).proposedAt > 0
      ? new Date(Number((status as ResolutionStatus).proposedAt) * 1000)
      : null,
    disputeDeadline: (status as ResolutionStatus).disputeDeadline > 0
      ? new Date(Number((status as ResolutionStatus).disputeDeadline) * 1000)
      : null,
    canFinalize: (status as ResolutionStatus).canFinalize,
    canDispute: (status as ResolutionStatus).canDispute,
  } : null;

  return {
    resolutionStatus: parsedStatus,
    isLoading,
    error,
    refetch,
  };
}

/**
 * Hook to dispute a resolution
 */
export function useDisputeResolution() {
  const ammAddress = useAmmAddress();
  
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const dispute = useCallback(
    async (marketId: number, reason: string) => {
      writeContract({
        address: ammAddress as `0x${string}`,
        abi: WEATHER_BET_AMM_ABI,
        functionName: "disputeResolution",
        args: [BigInt(marketId), reason],
      });
    },
    [writeContract, ammAddress]
  );

  return {
    dispute,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
    reset,
  };
}

/**
 * Hook to finalize a resolution
 */
export function useFinalizeResolution() {
  const ammAddress = useAmmAddress();
  
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const finalize = useCallback(
    async (marketId: number) => {
      writeContract({
        address: ammAddress as `0x${string}`,
        abi: WEATHER_BET_AMM_ABI,
        functionName: "finalizeResolution",
        args: [BigInt(marketId)],
      });
    },
    [writeContract, ammAddress]
  );

  return {
    finalize,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
    reset,
  };
}
