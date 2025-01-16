import React from 'react';

function CryptoStats({ data }) {
  const { bitcoin, ethereum } = data;

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
      notation: 'compact',
      compactDisplay: 'short'
    }).format(num);
  };

  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {/* Bitcoin Card */}
      <div className="bg-purple-950/60 backdrop-blur-sm rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-lg font-bold text-white">Bitcoin</h3>
          <span className="text-sm text-gray-300">BTC</span>
        </div>
        <div className="space-y-2">
          <p className="text-xl font-bold text-white">
            ${bitcoin.usd.toLocaleString()}
          </p>
          <p className={`text-sm ${bitcoin.usd_24h_change > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {bitcoin.usd_24h_change.toFixed(2)}% (24h)
          </p>
          <div className="text-sm text-gray-300">
            <p>Market Cap: {formatNumber(bitcoin.usd_market_cap)}</p>
            <p>Volume: {formatNumber(bitcoin.usd_24h_vol)}</p>
          </div>
        </div>
      </div>

      {/* Ethereum Card */}
      <div className="bg-purple-950/60 backdrop-blur-sm rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-lg font-bold text-white">Ethereum</h3>
          <span className="text-sm text-gray-300">ETH</span>
        </div>
        <div className="space-y-2">
          <p className="text-xl font-bold text-white">
            ${ethereum.usd.toLocaleString()}
          </p>
          <p className={`text-sm ${ethereum.usd_24h_change > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {ethereum.usd_24h_change.toFixed(2)}% (24h)
          </p>
          <div className="text-sm text-gray-300">
            <p>Market Cap: {formatNumber(ethereum.usd_market_cap)}</p>
            <p>Volume: {formatNumber(ethereum.usd_24h_vol)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CryptoStats;