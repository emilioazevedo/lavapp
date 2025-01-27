import React from 'react';

const AboutPage = () => {
  return (
    <div className="about-page pt-[200px] p-4 flex flex-col lg:flex-row">
      <div className="lg:w-2/3">
        <h1 className="text-3xl font-bold mb-4">About Us</h1> {/* Adjusted font size */}
        <p className="text-md mb-4"> {/* Adjusted font size */}
          About Us: LAVAPP Bitcoin
        </p>
        <div>
          <h2 className="text-xl font-bold mb-2">Our Mission</h2> {/* Adjusted font size */}
          <p className="mb-4 text-sm"> {/* Adjusted font size */}
            BitcoinPro Signals provides cutting-edge cryptocurrency trading intelligence, specializing in real-time Bitcoin (BTC) market analysis and predictive signals.
          </p>
          <h2 className="text-xl font-bold mb-2">What We Offer</h2> {/* Adjusted font size */}
          <ul className="list-disc list-inside mb-4 text-sm"> {/* Adjusted font size */}
            <li>Advanced price tracking for Bitcoin across global exchanges</li>
            <li>AI-powered buy and sell signal generation</li>
            <li>Comprehensive market trend analysis</li>
            <li>Machine learning-driven predictive modeling</li>
          </ul>
          <h2 className="text-xl font-bold mb-2">Current Market Insights</h2> {/* Adjusted font size */}
          <ul className="list-disc list-inside mb-4 text-sm"> {/* Adjusted font size */}
            <li>BTC Price Volatility Range: $40,000 - $52,000</li>
            <li>Machine Learning Accuracy: 78.3% signal precision</li>
            <li>Key Trend Indicators:
              <ul className="list-disc list-inside ml-4">
                <li>Rising institutional investment</li>
                <li>Growing blockchain technology integration</li>
                <li>Increasing global cryptocurrency adoption</li>
              </ul>
            </li>
          </ul>
          <h2 className="text-xl font-bold mb-2">Our Technology</h2> {/* Adjusted font size */}
          <p className="mb-4 text-sm"> {/* Adjusted font size */}
            Our proprietary algorithms analyze:
          </p>
          <ul className="list-disc list-inside mb-4 text-sm"> {/* Adjusted font size */}
            <li>Historical price movements</li>
            <li>Market sentiment</li>
            <li>Trading volume</li>
            <li>Global economic indicators</li>
          </ul>
          <h2 className="text-xl font-bold mb-2">Commitment to Traders</h2> {/* Adjusted font size */}
          <p className="mb-4 text-sm"> {/* Adjusted font size */}
            We provide transparent, data-driven insights to empower cryptocurrency investors with actionable intelligence.
          </p>
        </div>
      </div>
      <div className="flex justify-center lg:w-1/3 mt-8 lg:mt-0 lg:ml-8">
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
            {/* Background */}
            <rect width="400" height="300" fill="transparent" /> {/* Set background to transparent */}

            {/* Bitcoin Symbol */}
            <g transform="translate(140, 150)">
              <circle r="50" fill="#F7931A"/>
              <path 
                d="M163.1,147.9c2.1-14.1-8.6-21.7-23.4-26.8l4.8-19.2l-11.7-2.9l-4.7,18.7c-3.1-0.8-6.2-1.5-9.3-2.2l4.7-18.8l-11.7-2.9l-4.8,19.2c-2.5-0.6-5-1.1-7.4-1.7l0,0l-16.1-4l-3.1,12.5c0,0,8.6,2,8.4,2.1c4.7,1.2,5.5,4.3,5.4,6.8l-5.4,21.5c0.3,0.1,0.7,0.2,1.2,0.4c-0.4-0.1-0.8-0.2-1.2-0.3l-7.5,30.1c-0.6,1.4-2,3.6-5.3,2.8c0.1,0.2-8.4-2.1-8.4-2.1l-5.7,13.2l15.2,3.8c2.8,0.7,5.6,1.4,8.3,2.1l-4.8,19.4l11.7,2.9l4.8-19.2c3.2,0.9,6.3,1.7,9.3,2.4l-4.8,19.1l11.7,2.9l4.8-19.3c20,3.8,35,2.3,41.3-15.8c5.1-14.6-0.3-23-10.7-28.5C156.1,164.7,161.6,158.8,163.1,147.9z M135.8,189.1c-3.6,14.6-28.1,6.7-36,4.7l6.4-25.7C114.1,170.1,139.6,173.9,135.8,189.1z M139.4,148c-3.3,13.3-23.7,6.5-30.3,4.9l5.8-23.3C121.5,130.9,142.9,134.1,139.4,148z" 
                fill="white" 
                transform="translate(-140, -150) scale(0.85)"
              />
            </g>

            {/* Ethereum Symbol */}
            <g transform="translate(260, 150)">
              <circle r="50" fill="#627EEA"/>
              <g transform="translate(-25, -25) scale(1.25)">
                <path d="M20,0 L20,35 L40,26" fill="none" stroke="white" strokeWidth="2" opacity="0.7"/>
                <path d="M20,0 L20,35 L0,26" fill="none" stroke="white" strokeWidth="2" opacity="0.7"/>
                <path d="M20,35 L20,45 L0,26" fill="none" stroke="white" strokeWidth="2" opacity="0.7"/>
                <path d="M20,35 L20,45 L40,26" fill="none" stroke="white" strokeWidth="2" opacity="0.7"/>
                <path d="M20,0 L0,26 L20,35 L40,26 L20,0" fill="white" opacity="1"/>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;