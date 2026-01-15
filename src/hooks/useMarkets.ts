"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useWeb3 } from "@/providers/Web3Provider";

const AMM_ADDRESS = "0x7ff64aC54827360A860d8EbD13Bf39e0eb68fE5A";

const AMM_ABI = [
  "function markets(uint256) view returns (uint256 id, uint256 closes, uint256 weekEnd, uint256 yesShares, uint256 noShares, uint256 liq, int256 avg, int256 proposed, uint256 resTime, uint8 status, bool outcome)",
  "function getPrice(uint256 id) view returns (uint256 yes, uint256 no)",
  "function nextId() view returns (uint256)",
];

interface Market {
  id: number;
  closes: number;
  weekEnd: number;
  yesShares: bigint;
  noShares: bigint;
  liquidity: bigint;
  avgTemp: number;
  status: number;
  yesPrice: number;
  noPrice: number;
}

export function useMarkets() {
  const { provider } = useWeb3();
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarkets = async () => {
      if (!provider) {
        setLoading(false);
        return;
      }

      try {
        const contract = new ethers.Contract(AMM_ADDRESS, AMM_ABI, provider);
        const nextId = await contract.nextId();
        const marketList: Market[] = [];

        for (let i = 1; i < Number(nextId); i++) {
          const m = await contract.markets(i);
          const prices = await contract.getPrice(i);
          
          marketList.push({
            id: i,
            closes: Number(m.closes),
            weekEnd: Number(m.weekEnd),
            yesShares: m.yesShares,
            noShares: m.noShares,
            liquidity: m.liq,
            avgTemp: Number(m.avg) / 100,
            status: m.status,
            yesPrice: Number(prices.yes) / 10000,
            noPrice: Number(prices.no) / 10000,
          });
        }

        setMarkets(marketList);
      } catch (err) {
        console.error("Failed to fetch markets:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMarkets();
  }, [provider]);

  return { markets, loading };
}
