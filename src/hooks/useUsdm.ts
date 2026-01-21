"use client";

import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useAppKitAccount } from "@reown/appkit/react";
import { parseUnits, formatUnits } from "viem";
import { useCallback } from "react";
import { 
  CONTRACT_ADDRESSES, 
  USDM_ABI,
} from "@/lib/contracts";

// Get contract addresses
function useUsdmAddress() {
  return CONTRACT_ADDRESSES.USDM;
}

function useAmmAddress() {
  return CONTRACT_ADDRESSES.AMM;
}

/**
 * Hook to get USDm balance
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

  return {
    balance: balance ? formatUnits(balance as bigint, 18) : "0",
    balanceRaw: balance as bigint | undefined,
    isLoading,
    error,
    refetch,
  };
}

/**
 * Hook to get USDm allowance for AMM
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
    allowance: allowance ? formatUnits(allowance as bigint, 18) : "0",
    allowanceRaw: allowance as bigint | undefined,
    isLoading,
    error,
    refetch,
  };
}

/**
 * Hook to approve USDm for AMM
 */
export function useApproveUsdm() {
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

  const approveMax = useCallback(
    async () => {
      const maxAmount = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
      
      writeContract({
        address: usdmAddress as `0x${string}`,
        abi: USDM_ABI,
        functionName: "approve",
        args: [ammAddress as `0x${string}`, maxAmount],
      });
    },
    [writeContract, usdmAddress, ammAddress]
  );

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
export function useFaucet() {
  const usdmAddress = useUsdmAddress();
  const { address } = useAppKitAccount();
  
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // Check if user can claim
  const { data: canClaim, refetch: refetchCanClaim } = useReadContract({
    address: usdmAddress as `0x${string}`,
    abi: USDM_ABI,
    functionName: "canClaimFaucet",
    args: address ? [address as `0x${string}`] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // Get time until next claim
  const { data: timeUntilClaim } = useReadContract({
    address: usdmAddress as `0x${string}`,
    abi: USDM_ABI,
    functionName: "timeUntilNextClaim",
    args: address ? [address as `0x${string}`] : undefined,
    query: {
      enabled: !!address,
    },
  });

  const claim = useCallback(
    async () => {
      writeContract({
        address: usdmAddress as `0x${string}`,
        abi: USDM_ABI,
        functionName: "faucet",
      });
    },
    [writeContract, usdmAddress]
  );

  return {
    claim,
    canClaim: canClaim as boolean | undefined,
    timeUntilClaim: timeUntilClaim ? Number(timeUntilClaim) : 0,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
    refetchCanClaim,
  };
}

/**
 * Combined hook for USDm functionality
 */
export function useUsdm() {
  const { balance, balanceRaw, isLoading: isLoadingBalance, refetch: refetchBalance } = useUsdmBalance();
  const { allowance, allowanceRaw, isLoading: isLoadingAllowance, refetch: refetchAllowance } = useUsdmAllowance();
  const { approve, approveMax, isPending: isApproving, isConfirming: isApproveConfirming, isSuccess: isApproveSuccess } = useApproveUsdm();
  const { claim: faucet, canClaim: canClaimFaucet, isPending: isClaiming, isConfirming: isClaimConfirming, isSuccess: isClaimSuccess } = useFaucet();

  const needsApproval = useCallback((amount: string) => {
    if (!allowanceRaw) return true;
    try {
      const amountBI = parseUnits(amount, 18);
      return allowanceRaw < amountBI;
    } catch {
      return true;
    }
  }, [allowanceRaw]);

  const refetchAll = useCallback(() => {
    refetchBalance();
    refetchAllowance();
  }, [refetchBalance, refetchAllowance]);

  return {
    balance,
    balanceRaw,
    allowance,
    allowanceRaw,
    approve,
    approveMax,
    faucet,
    canClaimFaucet,
    faucetAmount: "1000", // Default faucet amount
    needsApproval,
    isLoading: isLoadingBalance || isLoadingAllowance,
    isApproving: isApproving || isApproveConfirming,
    isApproveSuccess,
    isClaiming: isClaiming || isClaimConfirming,
    isClaimSuccess,
    refetchAll,
  };
}
