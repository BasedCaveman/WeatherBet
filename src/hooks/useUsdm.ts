"use client";

import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { parseUnits, formatUnits } from "viem";
import { useState, useEffect, useCallback } from "react";
import { CONTRACT_ADDRESSES, USDM_ABI } from "@/lib/contracts";

// Get contract address for current network
function useUsdmAddress() {
  const { chainId } = useAppKitNetwork();
  const networkId = chainId || 6342; // Default to MegaETH testnet
  const addresses = CONTRACT_ADDRESSES[networkId as keyof typeof CONTRACT_ADDRESSES];
  return addresses?.usdm || CONTRACT_ADDRESSES[6342].usdm;
}

function useAmmAddress() {
  const { chainId } = useAppKitNetwork();
  const networkId = chainId || 6342;
  const addresses = CONTRACT_ADDRESSES[networkId as keyof typeof CONTRACT_ADDRESSES];
  return addresses?.weatherBetAMM || CONTRACT_ADDRESSES[6342].weatherBetAMM;
}

/**
 * Hook to get USDm balance for current user
 */
export function useUsdmBalance() {
  const { address, isConnected } = useAppKitAccount();
  const usdmAddress = useUsdmAddress();

  const { data: balance, isLoading, error, refetch } = useReadContract({
    address: usdmAddress as `0x${string}`,
    abi: USDM_ABI,
    functionName: "balanceOf",
    args: address ? [address as `0x${string}`] : undefined,
    query: {
      enabled: isConnected && !!address,
    },
  });

  const formattedBalance = balance ? formatUnits(balance as bigint, 18) : "0";
  
  return {
    balance: balance as bigint | undefined,
    formattedBalance,
    isLoading,
    error,
    refetch,
  };
}

/**
 * Hook to get USDm allowance for AMM contract
 */
export function useUsdmAllowance() {
  const { address, isConnected } = useAppKitAccount();
  const usdmAddress = useUsdmAddress();
  const ammAddress = useAmmAddress();

  const { data: allowance, isLoading, error, refetch } = useReadContract({
    address: usdmAddress as `0x${string}`,
    abi: USDM_ABI,
    functionName: "allowance",
    args: address ? [address as `0x${string}`, ammAddress as `0x${string}`] : undefined,
    query: {
      enabled: isConnected && !!address,
    },
  });

  return {
    allowance: allowance as bigint | undefined,
    isLoading,
    error,
    refetch,
  };
}

/**
 * Hook to approve USDm spending
 */
export function useUsdmApprove() {
  const usdmAddress = useUsdmAddress();
  const ammAddress = useAmmAddress();
  
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const approve = useCallback(
    async (amount: string) => {
      const amountBigInt = parseUnits(amount, 18);
      
      writeContract({
        address: usdmAddress as `0x${string}`,
        abi: USDM_ABI,
        functionName: "approve",
        args: [ammAddress as `0x${string}`, amountBigInt],
      });
    },
    [writeContract, usdmAddress, ammAddress]
  );

  const approveMax = useCallback(() => {
    const maxAmount = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
    
    writeContract({
      address: usdmAddress as `0x${string}`,
      abi: USDM_ABI,
      functionName: "approve",
      args: [ammAddress as `0x${string}`, maxAmount],
    });
  }, [writeContract, usdmAddress, ammAddress]);

  return {
    approve,
    approveMax,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  };
}

/**
 * Hook to claim from faucet (testnet only)
 */
export function useUsdmFaucet() {
  const { address, isConnected } = useAppKitAccount();
  const usdmAddress = useUsdmAddress();
  
  // Check if user can claim
  const { data: canClaim, refetch: refetchCanClaim } = useReadContract({
    address: usdmAddress as `0x${string}`,
    abi: USDM_ABI,
    functionName: "canClaimFaucet",
    args: address ? [address as `0x${string}`] : undefined,
    query: {
      enabled: isConnected && !!address,
    },
  });

  // Get time until next claim
  const { data: timeUntilClaim } = useReadContract({
    address: usdmAddress as `0x${string}`,
    abi: USDM_ABI,
    functionName: "timeUntilNextClaim",
    args: address ? [address as `0x${string}`] : undefined,
    query: {
      enabled: isConnected && !!address,
    },
  });

  // Get faucet amount
  const { data: faucetAmount } = useReadContract({
    address: usdmAddress as `0x${string}`,
    abi: USDM_ABI,
    functionName: "faucetAmount",
    query: {
      enabled: isConnected,
    },
  });

  const { writeContract, data: hash, isPending, error } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const claim = useCallback(() => {
    writeContract({
      address: usdmAddress as `0x${string}`,
      abi: USDM_ABI,
      functionName: "faucet",
    });
  }, [writeContract, usdmAddress]);

  // Format faucet amount
  const formattedFaucetAmount = faucetAmount 
    ? formatUnits(faucetAmount as bigint, 18) 
    : "1000";

  return {
    claim,
    canClaim: canClaim as boolean | undefined,
    timeUntilClaim: timeUntilClaim as bigint | undefined,
    faucetAmount: formattedFaucetAmount,
    isPending,
    isConfirming,
    isSuccess,
    error,
    refetchCanClaim,
  };
}

/**
 * Combined hook for USDm token management
 */
export function useUsdm() {
  const balance = useUsdmBalance();
  const allowance = useUsdmAllowance();
  const approve = useUsdmApprove();
  const faucet = useUsdmFaucet();

  // Check if approval is needed for a specific amount
  const needsApproval = useCallback(
    (amount: string) => {
      if (!allowance.allowance) return true;
      const amountBigInt = parseUnits(amount, 18);
      return allowance.allowance < amountBigInt;
    },
    [allowance.allowance]
  );

  // Refresh all data
  const refetchAll = useCallback(() => {
    balance.refetch();
    allowance.refetch();
    faucet.refetchCanClaim();
  }, [balance, allowance, faucet]);

  return {
    balance: balance.formattedBalance,
    balanceRaw: balance.balance,
    allowance: allowance.allowance,
    needsApproval,
    approve: approve.approve,
    approveMax: approve.approveMax,
    isApproving: approve.isPending || approve.isConfirming,
    faucet: faucet.claim,
    canClaimFaucet: faucet.canClaim,
    faucetAmount: faucet.faucetAmount,
    isClaiming: faucet.isPending || faucet.isConfirming,
    refetchAll,
    isLoading: balance.isLoading || allowance.isLoading,
  };
}
