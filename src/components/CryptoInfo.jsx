import React from 'react';

function CryptoInfo({ data }) {
  const coin = data.coins[0].item;

  return (
    <div className="w-full p-4 bg-gradient-to-r from-purple-950 via-purple-800 to-purple-950 backdrop-blur-sm rounded-ms">
      <div className="flex items-center gap-4 mb-4">
        <img 
          src={coin.thumb} 
          alt={coin.name} 
          className="w-8 h-8 rounded-full"
        />
        <div>
          <h2 className="text-xl font-bold text-white">{coin.name}</h2>
          <p className="text-sm text-gray-300">{coin.symbol}</p>
        </div>
      </div>

      <div className="grid gap-4">
        <div>
          <p className="text-lg text-white">
            Price: ${parseFloat(coin.data.price).toFixed(4)}
          </p>
          <p className="text-sm text-gray-300">
            Market Cap: {coin.data.market_cap}
          </p>
        </div>

        <div className="text-sm text-gray-300">
          <p>{coin.data.content.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-purple-900/90 p-3 rounded-lg">
            <p className="text-white">24h Change (USD)</p>
            <p className={`text-lg ${coin.data.price_change_percentage_24h.usd > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {coin.data.price_change_percentage_24h.usd.toFixed(2)}%
            </p>
          </div>
          <div className="bg-purple-900/90 p-3 rounded-lg">
            <p className="text-white">24h Volume</p>
            <p className="text-lg text-gray-300">{coin.data.total_volume}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CryptoInfo;  // Make sure this line is present