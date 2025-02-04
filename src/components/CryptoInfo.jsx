import React, { useState, useEffect } from 'react';

function CryptoInfo() {
  const [cryptoData, setCryptoData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apiUrl = '/api/v1/cryptocurrency/listings/latest?limit=20'; // Use the proxy endpoint

    console.log('Fetching data from:', apiUrl);

    fetch(apiUrl, {
      headers: {
        'X-CMC_PRO_API_KEY': import.meta.env.VITE_COINMARKETCAP_API_KEY, // Use environment variable
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.status && data.status.error_code !== 0) {
          throw new Error(`API error! message: ${data.status.error_message}`);
        }
        setCryptoData(data.data || []);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const formatPrice = (price) => {
    return price ? `$${price.toFixed(2)}` : 'N/A';
  };

  return (
    <div>
      {error && <p className="text-red-500">Error fetching data: {error}</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {cryptoData.length > 0 ? (
            cryptoData.map((crypto) => (
              <div key={crypto.id} className="crypto-card p-4 border rounded shadow">
                <h3 className="text-xl font-bold">
                  {crypto.name} ({crypto.symbol})
                </h3>
                <p>Latest Price: {formatPrice(crypto.quote?.USD?.price)}</p>
                <p>24h Low: {formatPrice(crypto.quote?.USD?.low_24h)}</p>
                <p>24h High: {formatPrice(crypto.quote?.USD?.high_24h)}</p>
              </div>
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>
      )}
    </div>
  );
}

export default CryptoInfo;