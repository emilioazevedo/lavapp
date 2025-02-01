import React, { useState, useEffect } from 'react';

function LatestListings() {
  const [cryptoData, setCryptoData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_COINMARKETCAP_API_KEY; // Use Vite environment variable
    const apiUrl = '/api/v1/cryptocurrency/listings/latest'; // Use the local proxy

    console.log('API Key:', apiKey); // Log the API key to ensure it's being read correctly
    console.log('Fetching data from:', apiUrl); // Log the fetch URL

    fetch(apiUrl, {
      headers: {
        'X-CMC_PRO_API_KEY': apiKey
      }
    })
    .then(response => {
      console.log('Response status:', response.status); // Log the response status
      return response.text(); // Read the response as text
    })
    .then(text => {
      console.log('Response text:', text); // Log the response text
      try {
        const data = JSON.parse(text); // Parse the response text as JSON
        console.log('Fetched data:', data); // Log the fetched data
        setCryptoData(data.data || []); // Ensure data is an array
      } catch (e) {
        throw new Error('Failed to parse JSON response');
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error); // Log the error
      setError(error.message);
    });
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div>
      {error && <p className="text-red-500">Error fetching data: {error}</p>}
      <ul>
        {cryptoData.length > 0 ? (
          cryptoData.map(crypto => (
            <li key={crypto.id}>
              {crypto.name} ({crypto.symbol}): ${crypto.quote.USD.price.toFixed(2)}
            </li>
          ))
        ) : (
          <p>No data available</p>
        )}
      </ul>
    </div>
  );
}

export default LatestListings;