import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import './LatestTick.css';

const LatestTick = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://data-api.cryptocompare.com/spot/v1/latest/tick?market=coinbase&instruments=BTC-USD,ETH-USD,LTC-USD&apply_mapping=true&groups=LAST_UPDATE,VALUE,TOP_OF_BOOK');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                console.log('Fetched data:', result); // Log the fetched data
                setData(result.Data); // Access the nested Data key
            } catch (error) {
                console.error('Fetch error:', error); // Log any errors
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="container">Loading...</div>;
    }

    if (error) {
        return <div className="container">Error: {error.message}</div>;
    }

    const createChartData = (currencyData, color) => ({
        labels: ['Last Trade Quantity', 'Last Trade Quote Quantity', 'Last Trade ID', 'Last Trade CCSEQ', 'Last Trade Side'],
        datasets: [
            {
                label: 'Value',
                data: [
                    currencyData.LAST_TRADE_QUANTITY,
                    currencyData.LAST_TRADE_QUOTE_QUANTITY,
                    currencyData.LAST_TRADE_ID,
                    currencyData.LAST_TRADE_CCSEQ,
                    currencyData.LAST_TRADE_SIDE === 'BUY' ? 1 : 0,
                ],
                backgroundColor: color.backgroundColor,
                borderColor: color.borderColor,
                borderWidth: 1,
            },
        ],
    });

    return (
        <div className="container">
            
            {data && (
                <div className="grid-container">
                    <div className="section">
                        <h2 className="subtitle">BTC-USD</h2>
                        <Line data={createChartData(data['BTC-USD'], { backgroundColor: 'rgba(75,192,192,0.4)', borderColor: 'rgba(75,192,192,1)' })} />
                        <p className="data-point">Last Trade Quantity: {data['BTC-USD'].LAST_TRADE_QUANTITY}</p>
                        <p className="data-point">Last Trade Quote Quantity: {data['BTC-USD'].LAST_TRADE_QUOTE_QUANTITY}</p>
                        <p className="data-point">Last Trade ID: {data['BTC-USD'].LAST_TRADE_ID}</p>
                        <p className="data-point">Last Trade CCSEQ: {data['BTC-USD'].LAST_TRADE_CCSEQ}</p>
                        <p className="data-point">Last Trade Side: {data['BTC-USD'].LAST_TRADE_SIDE}</p>
                    </div>
                    <div className="section">
                        <h2 className="subtitle">ETH-USD</h2>
                        <Line data={createChartData(data['ETH-USD'], { backgroundColor: 'rgba(153,102,255,0.4)', borderColor: 'rgba(153,102,255,1)' })} />
                        <p className="data-point">Last Trade Quantity: {data['ETH-USD'].LAST_TRADE_QUANTITY}</p>
                        <p className="data-point">Last Trade Quote Quantity: {data['ETH-USD'].LAST_TRADE_QUOTE_QUANTITY}</p>
                        <p className="data-point">Last Trade ID: {data['ETH-USD'].LAST_TRADE_ID}</p>
                        <p className="data-point">Last Trade CCSEQ: {data['ETH-USD'].LAST_TRADE_CCSEQ}</p>
                        <p className="data-point">Last Trade Side: {data['ETH-USD'].LAST_TRADE_SIDE}</p>
                    </div>
                    <div className="section">
                        <h2 className="subtitle">LTC-USD</h2>
                        <Line data={createChartData(data['LTC-USD'], { backgroundColor: 'rgba(255,159,64,0.4)', borderColor: 'rgba(255,159,64,1)' })} />
                        <p className="data-point">Last Trade Quantity: {data['LTC-USD'].LAST_TRADE_QUANTITY}</p>
                        <p className="data-point">Last Trade Quote Quantity: {data['LTC-USD'].LAST_TRADE_QUOTE_QUANTITY}</p>
                        <p className="data-point">Last Trade ID: {data['LTC-USD'].LAST_TRADE_ID}</p>
                        <p className="data-point">Last Trade CCSEQ: {data['LTC-USD'].LAST_TRADE_CCSEQ}</p>
                        <p className="data-point">Last Trade Side: {data['LTC-USD'].LAST_TRADE_SIDE}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LatestTick;
