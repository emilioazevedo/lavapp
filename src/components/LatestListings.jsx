import React, { useState, useEffect } from 'react';

function LatestListings() {
  const [cryptoData, setCryptoData] = useState([]);
  const [error, setError] = useState(null);

  const fetchWithRetry = async (url, retries = 3, delay = 1000) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 429 && retries > 0) {
          const retryAfter = response.headers.get('Retry-After');
          console.log(`Rate limit exceeded. Retrying after ${retryAfter || delay} ms`);
          await new Promise((resolve) => setTimeout(resolve, retryAfter ? retryAfter * 1000 : delay));
          return fetchWithRetry(url, retries - 1, delay * 2);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  };

  const fetchCryptoData = async () => {
    try {
      const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false';
      const data = await fetchWithRetry(apiUrl);

      const detailedDataPromises = data.map(async (crypto) => {
        const detailUrl = `https://api.coingecko.com/api/v3/coins/${crypto.id}`;
        const detailData = await fetchWithRetry(detailUrl);
        return { ...crypto, homepage: detailData.links.homepage[0] };
      });

      const detailedData = await Promise.all(detailedDataPromises);
      setCryptoData(detailedData);
      localStorage.setItem('cryptoData', JSON.stringify(detailedData));
      localStorage.setItem('cryptoDataTimestamp', Date.now());
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    const cachedData = localStorage.getItem('cryptoData');
    const cachedTimestamp = localStorage.getItem('cryptoDataTimestamp');
    const cacheDuration = 60 * 60 * 1000; // 1 hour

    if (cachedData && cachedTimestamp && Date.now() - cachedTimestamp < cacheDuration) {
      setCryptoData(JSON.parse(cachedData));
    } else {
      fetchCryptoData();
    }
  }, []);

  return (
    <div>
      {error && <p className="text-red-500 text-xs">Error fetching data: {error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {cryptoData.length > 0 ? (
          cryptoData.map((crypto) => (
            <div key={crypto.id} className="crypto-card p-1 border rounded shadow">
              <img src={crypto.image} alt={crypto.name} className="w-4 h-4 mx-auto mb-1" />
              <h3 className="text-sm font-bold">
                {crypto.name} ({crypto.symbol.toUpperCase()})
              </h3>
              <p className="text-xs">Latest Price: ${crypto.current_price.toFixed(2)}</p>
              <p className="text-xs">24h Low: ${crypto.low_24h.toFixed(2)}</p>
              <p className="text-xs">24h High: ${crypto.high_24h.toFixed(2)}</p>
              <a href={crypto.homepage} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-xs">
                Visit Website
              </a>
              <div className="mt-2">
                <img src={crypto.image} alt={`${crypto.name} NFT`} className="w-4 h-4 mx-auto mb-1" />
              </div>
            </div>
          ))
        ) : (
          <p className="text-xs">No data available</p>
        )}
      </div>
    </div>
  );
}

export default LatestListings;