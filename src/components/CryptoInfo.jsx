import React, { useState, useEffect } from 'react';

function CryptoInfo() {
  const [cryptoData, setCryptoData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
      const contentType = response.headers.get('content-type');
      console.log('Content-Type:', contentType); // Log the content type
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      } else {
        const text = await response.text();
        console.log('Received non-JSON response:', text); // Log the non-JSON response
        throw new Error('Received non-JSON response');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  };

  const fetchCryptoData = async () => {
    try {
      const apiUrl = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD';
      const data = await fetchWithRetry(apiUrl);
      console.log('Fetched data:', data); // Log the fetched data

      const detailedData = data.Data.map((crypto) => {
        if (!crypto.RAW || !crypto.RAW.USD) {
          console.warn('Missing USD data for:', crypto);
          return null;
        }
        return {
          id: crypto.CoinInfo.Id,
          name: crypto.CoinInfo.FullName,
          symbol: crypto.CoinInfo.Name,
          image: `https://www.cryptocompare.com${crypto.CoinInfo.ImageUrl}`,
          current_price: crypto.RAW.USD.PRICE,
          low_24h: crypto.RAW.USD.LOW24HOUR,
          high_24h: crypto.RAW.USD.HIGH24HOUR,
          homepage: `https://www.cryptocompare.com/coins/${crypto.CoinInfo.Name}/overview`,
        };
      }).filter(Boolean); // Filter out null values

      setCryptoData(detailedData);
      localStorage.setItem('cryptoData', JSON.stringify(detailedData));
      localStorage.setItem('cryptoDataTimestamp', Date.now());
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const cachedData = localStorage.getItem('cryptoData');
    const cachedTimestamp = localStorage.getItem('cryptoDataTimestamp');
    const cacheDuration = 60 * 60 * 1000; // 1 hour

    if (cachedData && cachedTimestamp && Date.now() - cachedTimestamp < cacheDuration) {
      setCryptoData(JSON.parse(cachedData));
      setIsLoading(false);
    } else {
      fetchCryptoData();
    }
  }, []);

  const formatPrice = (price) => {
    return price ? `$${price.toFixed(2)}` : 'N/A';
  };

  const openWebsite = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div>
      {error && <p className="text-red-500 text-xs">Error fetching data: {error}</p>}
      {isLoading ? (
        <p className="text-xs">Loading...</p>
      ) : (
        <div className="p-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {cryptoData.length > 0 ? (
            cryptoData.map((crypto) => (
              <div key={crypto.id} className="crypto-card p-1 border rounded shadow">
                <img src={crypto.image} alt={crypto.name} className="w-4 h-4 mx-auto mb-1" />
                <h3 className="text-sm font-bold">
                  {crypto.name} ({crypto.symbol.toUpperCase()})
                </h3>
                <p className="text-xs">Latest Price: {formatPrice(crypto.current_price)}</p>
                <p className="text-xs">24h Low: {formatPrice(crypto.low_24h)}</p>
                <p className="text-xs">24h High: {formatPrice(crypto.high_24h)}</p>
                <button onClick={() => openWebsite(crypto.homepage)} className="text-blue-400 hover:text-blue-300 text-xs">
                  Visit Website
                </button>
              </div>
            ))
          ) : (
            <p className="text-xs">No data available</p>
          )}
        </div>
      )}
    </div>
  );
}

export default CryptoInfo;