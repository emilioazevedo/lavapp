import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, TimeScale } from 'chart.js';
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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Using CoinGecko API instead - 7 days of BTC data
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=daily'
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Format the data for the chart
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

  useEffect(() => {
    let chart = null;
    
    if (chartData.labels.length > 0) {
      const ctx = document.getElementById('myChart');
      if (ctx) {
        chart = new ChartJS(ctx, {
            type: 'line',
            data: chartData,
            options: {
              responsive: true,
              maintainAspectRatio: true,
              aspectRatio: 0,
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
            }
          });      }
    }

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [chartData]);

  return (
    <div className="w-[1000px] px-0 h-[100%] mb-16">
      <h2 className="text-2xl font-bold mb-4">Bitcoin Price Chart</h2>
      {isLoading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p className="text-red-500">Error fetching data: {error.message}</p>
      ) : (
        <>
          <div className="w-full h-full">
            <canvas id="myChart" className="w-full" />
          </div>
          {chartData.datasets[0] && ( // Added check here
            <SignalComponent priceData={chartData.datasets[0].data} />
          )}
        </>
      )}
    </div>
    
);}

export default ChartComponent;