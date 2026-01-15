// Contract addresses for different networks
export const CHAIN_CONFIG = {
  chainId: 6343,
  chainName: 'MegaETH Testnet',
  rpcUrl: 'https://timothy.megaeth.com/rpc',
  blockExplorer: 'https://megaeth-testnet-v2.blockscout.com',
} as const;

export const CONTRACT_ADDRESSES = {
  USDM: '0x18Fe541217F45a32D11183C2F90a5E22598d9749',
  AMM: '0x7ff64aC54827360A860d8EbD13Bf39e0eb68fE5A',
  ORACLE: '0x20154d6Ebb08c614A7F2e4eE76b9de88A4E1a54A',
} as const;

// Simplified ABIs (only the functions we need)
export const USDM_ABI = [
  // Read functions
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address account) view returns (uint256)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function totalSupply() view returns (uint256)",
  // Write functions
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function transferFrom(address from, address to, uint256 amount) returns (bool)",
  // Faucet (testnet only)
  "function faucet() external",
  "function canClaimFaucet(address user) view returns (bool)",
  "function timeUntilNextClaim(address user) view returns (uint256)",
  "function faucetAmount() view returns (uint256)",
  // Events
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)",
] as const;

export const WEATHER_BET_AMM_ABI = [
  // User Account Functions
  "function deposit(uint256 amount) external",
  "function withdraw(uint256 amount) external",
  "function getAccount(address user) view returns (tuple(uint256 balance, uint256 totalDeposited, uint256 totalWithdrawn, uint256 totalWinnings, uint256 totalLosses, uint256 marketsParticipated, uint256 marketsWon, uint256 lastWithdrawalTime))",
  
  // Market Functions
  "function buyShares(uint256 marketId, bool isYes, uint256 shares, uint256 maxCost) external",
  "function sellShares(uint256 marketId, bool isYes, uint256 shares, uint256 minPayout) external",
  "function claimWinnings(uint256 marketId) external",
  
  // Resolution Functions
  "function closeBetting(uint256 marketId) external",
  "function disputeResolution(uint256 marketId, string reason) external",
  "function finalizeResolution(uint256 marketId) external",
  
  // View Functions - Market
  "function getMarket(uint256 marketId) view returns (tuple(uint256 id, uint8 marketType, bytes32 locationHash, uint256 createdAt, uint256 bettingOpens, uint256 bettingCloses, uint256 targetWeekStart, uint256 targetWeekEnd, uint256 yesShares, uint256 noShares, uint256 liquidityParam, int256 historicalAvg, uint8 status, int256 proposedOutcome, uint256 resolutionProposedAt, bool finalOutcome, uint256 totalVolume))",
  "function getPosition(uint256 marketId, address user) view returns (tuple(uint256 yesShares, uint256 noShares, uint256 totalCost, bool claimed))",
  "function getPrices(uint256 marketId) view returns (uint256 yesPrice, uint256 noPrice)",
  "function getActiveMarkets() view returns (uint256[])",
  
  // View Functions - Betting Window
  "function getBettingStatus(uint256 marketId) view returns (bool isOpen, uint256 opensAt, uint256 closesAt, uint256 secondsUntilClose)",
  
  // View Functions - Resolution
  "function getResolutionStatus(uint256 marketId) view returns (uint8 status, int256 proposedValue, uint256 proposedAt, uint256 disputeDeadline, bool canFinalize, bool canDispute)",
  
  // Quote Functions
  "function quoteBuy(uint256 marketId, bool isYes, uint256 shares) view returns (uint256 cost)",
  "function quoteSell(uint256 marketId, bool isYes, uint256 shares) view returns (uint256 payout)",
  
  // Constants
  "function PRECISION() view returns (uint256)",
  "function SHARE_PRICE_PRECISION() view returns (uint256)",
  "function BETTING_WINDOW_BUFFER() view returns (uint256)",
  "function RESOLUTION_DISPUTE_PERIOD() view returns (uint256)",
  "function usdm() view returns (address)",
  "function treasury() view returns (address)",
  
  // Events
  "event SharesBought(uint256 indexed marketId, address indexed user, bool isYes, uint256 shares, uint256 cost, uint256 newYesPrice, uint256 newNoPrice)",
  "event SharesSold(uint256 indexed marketId, address indexed user, bool isYes, uint256 shares, uint256 payout, uint256 newYesPrice, uint256 newNoPrice)",
  "event BettingClosed(uint256 indexed marketId, uint256 timestamp)",
  "event ResolutionProposed(uint256 indexed marketId, int256 proposedValue, bool proposedOutcome, uint256 disputeDeadline)",
  "event ResolutionDisputed(uint256 indexed marketId, address indexed disputer, string reason)",
  "event MarketResolved(uint256 indexed marketId, bool finalOutcome, int256 actualValue)",
  "event WinningsClaimed(uint256 indexed marketId, address indexed user, uint256 amount)",
  "event Deposited(address indexed user, uint256 amount)",
  "event Withdrawn(address indexed user, uint256 amount)",
] as const;

// Market types
export enum ContractMarketType {
  RAIN = 0,
  TEMPERATURE = 1,
}

// Market status (v2)
export enum ContractMarketStatus {
  PENDING = 0,
  ACTIVE = 1,
  BETTING_CLOSED = 2,
  PENDING_RESOLUTION = 3,
  DISPUTED = 4,
  RESOLVED = 5,
  CANCELLED = 6,
}

// Status string mapping
export const MarketStatusLabels: Record<ContractMarketStatus, string> = {
  [ContractMarketStatus.PENDING]: "pending",
  [ContractMarketStatus.ACTIVE]: "active",
  [ContractMarketStatus.BETTING_CLOSED]: "betting_closed",
  [ContractMarketStatus.PENDING_RESOLUTION]: "pending_resolution",
  [ContractMarketStatus.DISPUTED]: "disputed",
  [ContractMarketStatus.RESOLVED]: "resolved",
  [ContractMarketStatus.CANCELLED]: "cancelled",
};

// Type definitions for contract return values
export interface ContractUserAccount {
  balance: bigint;
  totalDeposited: bigint;
  totalWithdrawn: bigint;
  totalWinnings: bigint;
  totalLosses: bigint;
  marketsParticipated: bigint;
  marketsWon: bigint;
  lastWithdrawalTime: bigint;
}

export interface ContractMarket {
  id: bigint;
  marketType: number;
  locationHash: string;
  createdAt: bigint;
  bettingOpens: bigint;
  bettingCloses: bigint;
  targetWeekStart: bigint;
  targetWeekEnd: bigint;
  yesShares: bigint;
  noShares: bigint;
  liquidityParam: bigint;
  historicalAvg: bigint;
  status: number;
  proposedOutcome: bigint;
  resolutionProposedAt: bigint;
  finalOutcome: boolean;
  totalVolume: bigint;
}

export interface ContractPosition {
  yesShares: bigint;
  noShares: bigint;
  totalCost: bigint;
  claimed: boolean;
}

export interface BettingStatus {
  isOpen: boolean;
  opensAt: bigint;
  closesAt: bigint;
  secondsUntilClose: bigint;
}

export interface ResolutionStatus {
  status: number;
  proposedValue: bigint;
  proposedAt: bigint;
  disputeDeadline: bigint;
  canFinalize: boolean;
  canDispute: boolean;
}

// Utility functions
export function formatUsdm(amount: bigint, decimals: number = 18): string {
  const divisor = BigInt(10 ** decimals);
  const integerPart = amount / divisor;
  const fractionalPart = amount % divisor;
  const fractionalStr = fractionalPart.toString().padStart(decimals, '0').slice(0, 2);
  return `${integerPart}.${fractionalStr}`;
}

export function parseUsdm(amount: string, decimals: number = 18): bigint {
  const [integer, fraction = ''] = amount.split('.');
  const paddedFraction = fraction.padEnd(decimals, '0').slice(0, decimals);
  return BigInt(integer + paddedFraction);
}

export function formatPrice(price: bigint, precision: bigint = BigInt(1e6)): string {
  const priceNum = Number(price) / Number(precision);
  return priceNum.toFixed(2);
}

export function priceToPercent(price: bigint, precision: bigint = BigInt(1e6)): number {
  return Math.round((Number(price) / Number(precision)) * 100);
}

export function timestampToDate(timestamp: bigint): Date {
  return new Date(Number(timestamp) * 1000);
}

export function getStatusString(status: number): string {
  return MarketStatusLabels[status as ContractMarketStatus] || "unknown";
}
