import React from 'react';

function SignalComponent({ priceData }) {
  const calculateSignal = (prices) => {
    if (!prices || prices.length < 7) return null;

    const recentPrices = prices.slice(-7);
    const currentPrice = recentPrices[recentPrices.length - 1].y;
    const averagePrice = recentPrices.reduce((acc, curr) => acc + curr.y, 0) / recentPrices.length;
    
    return {
      type: currentPrice < averagePrice ? 'buy' : 'sell',
      strength: Math.abs(((currentPrice - averagePrice) / averagePrice) * 100)
    };
  };

  const signal = calculateSignal(priceData);

  if (!signal) return null;

  const isBuySignal = signal.type === 'buy';

  return (
    <div className="w-4/5 mx-auto mb-8 bg-white/10 backdrop-blur-sm rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
        Market Signal
      </h2>
      <div className="flex items-center gap-4">
        <div 
          className={`${isBuySignal ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'} px-4 py-2 rounded-lg font-semibold`}
        >
          {isBuySignal ? 'Buy' : 'Sell'} Signal Active
        </div>
        <p className="text-gray-300">
  Price is {signal.strength.toFixed(2)}% {signal.type === 'buy' ? 'below' : 'above'} the 7-day average, 
  indicating a potential {signal.type === 'buy' ? 'buying' : 'selling'} opportunity
</p>
      </div>
    </div>
  );
}

export default SignalComponent;