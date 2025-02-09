import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import 'chartjs-adapter-moment';
import SignalComponent from './SignalComponent';

function ChartComponent() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWithRetry = async (url, retries = 3, delay = 1000) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 429 && retries > 0) {
          await new Promise((resolve) => setTimeout(resolve, delay));
          return fetchWithRetry(url, retries - 1, delay * 2);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const apiUrl = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=daily';
        const data = await fetchWithRetry(apiUrl);

        const formattedData = data.prices.map(([timestamp, price]) => ({
          x: new Date(timestamp),
          y: price
        }));

        setChartData({
          labels: formattedData.map(item => item.x),
          datasets: [
            {
              label: 'Bitcoin Price (USD)',
              data: formattedData,
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              tension: 0.1,
              fill: true,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Set to false to allow custom height
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day'
        },
        title: {
          display: true,
          text: 'Date',
          color: 'white'  // Added title color
        },
        ticks: {
          color: 'white'  // Added ticks color
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'  // Lighter grid lines
        }
      },
      y: {
        title: {
          display: true,
          text: 'Price (USD)',
          color: 'white'  // Added title color
        },
        ticks: {
          color: 'white',  // Added ticks color
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'  // Lighter grid lines
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            return '$' + context.parsed.y.toLocaleString();
          }
        }
      },
      legend: {
        labels: {
          color: 'white'  // Added legend color
        }
      }
    }
  };

  return (
    <div className="w-[100%] px-0 h-[600px] mb-16">
      <h2 className="text-2xl font-bold mb-4">Bitcoin Price Chart</h2>
      {isLoading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p className="text-red-500">Error fetching data: {error.message}</p>
      ) : (
        <>
          <div className="chart-container" style={{ height: '100%' }}> {/* Ensure the container has height */}
            <Line data={chartData} options={options} />
          </div>
          {chartData.datasets[0] && ( // Added check here
            <SignalComponent priceData={chartData.datasets[0].data} />
          )}
        </>
      )}
    </div>
  );
}

export default ChartComponent;