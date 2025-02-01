import React, { useState, useEffect } from 'react';

function CryptoInfo() {
  const [cryptoData, setCryptoData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_COINMARKETCAP_API_KEY; // Use Vite environment variable
    const apiUrl = '/api/v1/cryptocurrency/listings/latest?limit=20'; // Fetch top 20 cryptocurrencies

    console.log('API Key:', apiKey); // Log the API key to ensure it's being read correctly
    console.log('Fetching data from:', apiUrl); // Log the fetch URL

    fetch(apiUrl, {
      headers: {
        'X-CMC_PRO_API_KEY': apiKey
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log('Response status:', response.status); // Log the response status
      return response.json(); // Read the response as JSON
    })
    .then(data => {
      if (data.status && data.status.error_code !== 0) {
        if (data.status.error_code === 1008) {
          throw new Error('API limit reached. Please try again later.');
        } else {
          throw new Error(`API error! message: ${data.status.error_message}`);
        }
      }
      console.log('Fetched data:', data); // Log the fetched data
      setCryptoData(data.data || []); // Ensure data is an array
    })
    .catch(error => {
      console.error('Error fetching data:', error); // Log the error
      setError(error.message);
    });
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div>
      {error && <p className="text-red-500">Error fetching data: {error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {cryptoData.length > 0 ? (
          cryptoData.map(crypto => (
            <div key={crypto.id} className="crypto-card p-4 border rounded shadow">
              <h3 className="text-xl font-bold">{crypto.name} ({crypto.symbol})</h3>
              <p>Latest Price: ${crypto.quote.USD.price.toFixed(2)}</p>
              <p>All-Time Low: ${crypto.quote.USD.low_24h.toFixed(2)}</p>
              <p>All-Time High: ${crypto.quote.USD.high_24h.toFixed(2)}</p>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
}

export default CryptoInfo;