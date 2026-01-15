"use client";

interface MarketCardProps {
  id: number;
  closes: number;
  avgTemp: number;
  yesPrice: number;
  noPrice: number;
  status: number;
}

export function MarketCard({ id, closes, avgTemp, yesPrice, noPrice, status }: MarketCardProps) {
  const statusLabels = ["Active", "Pending", "Disputed", "Resolved", "Cancelled"];
  const closesDate = new Date(closes * 1000).toLocaleDateString();

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-white">Market #{id}</h3>
        <span className={`px-2 py-1 rounded text-xs ${status === 0 ? 'bg-green-600' : 'bg-gray-600'}`}>
          {statusLabels[status]}
        </span>
      </div>
      
      <p className="text-gray-400 text-sm mb-3">
        Will avg temp exceed {avgTemp}°C?
      </p>
      
      <div className="flex gap-2 mb-3">
        <div className="flex-1 bg-green-900/30 rounded p-2 text-center">
          <div className="text-green-400 font-bold">{(yesPrice * 100).toFixed(1)}%</div>
          <div className="text-xs text-gray-500">YES</div>
        </div>
        <div className="flex-1 bg-red-900/30 rounded p-2 text-center">
          <div className="text-red-400 font-bold">{(noPrice * 100).toFixed(1)}%</div>
          <div className="text-xs text-gray-500">NO</div>
        </div>
      </div>
      
      <p className="text-xs text-gray-500">Closes: {closesDate}</p>
    </div>
  );
}
