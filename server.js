const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(cors());

app.get('/api/crypto', async (req, res) => {
  try {
    console.log('API Key being used:', process.env.CMC_PRO_API_KEY); // Debug log
    
    const apiUrl = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=20';
    console.log('Fetching from:', apiUrl); // Debug log
    
    const response = await fetch(apiUrl, {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.CMC_PRO_API_KEY
      }
    });
    
    if (!response.ok) {
      console.log('CoinMarketCap API Response Status:', response.status); // Debug log
      const errorText = await response.text();
      console.log('Error response:', errorText); // Debug log
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('CORS enabled');
  console.log('Environment variables loaded:', !!process.env.CMC_PRO_API_KEY);
});