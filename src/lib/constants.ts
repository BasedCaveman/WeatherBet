// Contract address (deployed on MegaETH)
// This will be updated after contract deployment
export const PREDICTION_MARKET_ADDRESS = "0x0000000000000000000000000000000000000000" as const;

// Market types
export enum MarketType {
  RAIN = 0,
  TEMPERATURE = 1,
}

// Preset bet amounts in ETH
export const BET_AMOUNTS = [0.001, 0.005, 0.01, 0.05] as const;

// Market durations
export const MARKET_DURATION_DAYS = 7;

// Contract ABI (simplified for prediction market)
export const PREDICTION_MARKET_ABI = [
  {
    name: "getMarket",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "marketId", type: "uint256" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "id", type: "uint256" },
          { name: "marketType", type: "uint8" },
          { name: "startTime", type: "uint256" },
          { name: "endTime", type: "uint256" },
          { name: "totalYesAmount", type: "uint256" },
          { name: "totalNoAmount", type: "uint256" },
          { name: "resolved", type: "bool" },
          { name: "outcome", type: "bool" },
        ],
      },
    ],
  },
  {
    name: "placePrediction",
    type: "function",
    stateMutability: "payable",
    inputs: [
      { name: "marketId", type: "uint256" },
      { name: "prediction", type: "bool" },
    ],
    outputs: [],
  },
  {
    name: "claimWinnings",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "marketId", type: "uint256" }],
    outputs: [],
  },
  {
    name: "getUserPrediction",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "marketId", type: "uint256" },
      { name: "user", type: "address" },
    ],
    outputs: [
      { name: "position", type: "bool" },
      { name: "amount", type: "uint256" },
      { name: "claimed", type: "bool" },
    ],
  },
  {
    name: "getActiveMarkets",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256[]" }],
  },
] as const;

// Mock data for development
export const MOCK_MARKETS = [
  {
    id: 1,
    marketType: MarketType.RAIN,
    startTime: Math.floor(Date.now() / 1000),
    endTime: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
    totalYesAmount: BigInt("150000000000000000"), // 0.15 ETH
    totalNoAmount: BigInt("80000000000000000"),   // 0.08 ETH
    resolved: false,
    outcome: false,
  },
  {
    id: 2,
    marketType: MarketType.TEMPERATURE,
    startTime: Math.floor(Date.now() / 1000),
    endTime: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
    totalYesAmount: BigInt("200000000000000000"), // 0.2 ETH
    totalNoAmount: BigInt("75000000000000000"),   // 0.075 ETH
    resolved: false,
    outcome: false,
  },
];
