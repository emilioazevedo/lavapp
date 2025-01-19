import React, { useState } from 'react';
import ChartComponent from "./components/ChartComponent";
import "./App.css";
import NewsFeed from "./components/NewsFeed";
import VideoPlayer from "./components/VideoPlayer";
import CryptoInfo from './components/CryptoInfo';
import CryptoStats from './components/CryptoStats';
import Modal from './components/Modal'; 
import './components/Modal.css';


// Define cryptoData outside the component
const cryptoData = {
  coins: [{
    item: {
      id: "max-2",
      coin_id: 52378,
      name: "MAX",
      symbol: "MAX",
      market_cap_rank: 623,
      thumb: "https://assets.coingecko.com/coins/images/52378/standard/btc.png?1733257730",
      data: {
        price: 0.08821394763284982,
        market_cap: "$88,241,463",
        total_volume: "$5,832,230",
        price_change_percentage_24h: {
          usd: 1.953501326138397,
        },
        content: {
          description: "Meet Max, the AI Agent with a passion for Bitcoin and a mission to revolutionize the financial world. Built on the cutting-edge @distilled_ai platform, Max is a staunch Bitcoin maximalist who believes in the transformative power of decentralized finance."
        }
      }
    }
  }]
};

// Add crypto prices data
const cryptoPrices = {
  bitcoin: {
    usd: 98215,
    usd_market_cap: 1949046868527.0762,
    usd_24h_vol: 53634012558.28198,
    usd_24h_change: -1.0469617572005967,
    last_updated_at: 1737042179
  },
  ethereum: {
    usd: 3305.36,
    usd_market_cap: 398694053871.1794,
    usd_24h_vol: 27456879631.310616,
    usd_24h_change: -0.9770352099873387,
    last_updated_at: 1737042192
  }
};

function App() {
  const [newsModalOpen, setNewsModalOpen] = useState(false);
  const [selectedNewsArticle, setSelectedNewsArticle] = useState(null);

  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const toggleNewsModal = (article) => { 
    setSelectedNewsArticle(article); 
    setNewsModalOpen(!newsModalOpen); 
  };

  const toggleVideoModal = (video) => {
    setSelectedVideo(video); 
    setVideoModalOpen(!videoModalOpen); 
  };

  return (
    <div className="min-h-screen w-full relative z-[1]">
      {/* Background glow effect */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-20 left-1/3 w-[390px] h-[200px] bg-purple-600/80 rounded-full blur-[90px]" />
      </div>

      {/* Content wrapper */}
      <div className="flex flex-col lg:flex-row lg:justify-between relative z-[1]">
        {/* Left Side - News Feed */}
        <aside className="w-full lg:w-[250px] lg:fixed lg:left-0 lg:h-screen overflow-y-auto custom-scrollbar shadow lg:shadow-none z-[1]">
          <NewsFeed onArticleClick={toggleNewsModal} /> 
        </aside>

        {/* Center Content */}
        <main className="flex-1 mx-auto px-4 lg:max-w-4xl lg:px-8 relative z-[1]" style={{ marginLeft: "auto", marginRight: "auto" }}>
          <header className="text-center p-4">
            <h1 className="text-2xl font-bold">LAV APP</h1>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              BTC Buy and Sell Signals
            </h1>
          </header>

          <div className="flex justify-center w-full mb-8">
            <div className="w-full h-[100%] max-w-4xl">
              <ChartComponent />
            </div>
          </div>

          <div className="border-2 border-gray-500/70 rounded p-2 relative mb-8">
            <CryptoInfo data={cryptoData} />
          </div>

          <div className="border-2 border-gray-500/70 rounded p-2 relative mb-8">
            <CryptoStats data={cryptoPrices} />
          </div>
        </main>

        {/* Right Side - Video Player */}
        <aside className="w-full lg:w-[250px] lg:fixed lg:right-0 lg:h-screen overflow-y-auto custom-scrollbar shadow lg:shadow-none z-[1]">
          <VideoPlayer onVideoClick={toggleVideoModal} /> 
        </aside>
      </div>

      {/* Render News Feed Modal */}
      {newsModalOpen && (
        <Modal isOpen={newsModalOpen} onClose={toggleNewsModal}>
          <div className="text-white p-6"> 
            {selectedNewsArticle && (
              <>
                {selectedNewsArticle.image_url && (
                  <img
                    src={selectedNewsArticle.image_url}
                    alt={selectedNewsArticle.title}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                )}
                <h2 className="text-2xl font-bold mb-4">{selectedNewsArticle.title}</h2>
                <p className="text-gray-300 mb-4">{selectedNewsArticle.description}</p>
                <a
                  href={selectedNewsArticle.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Read full article →
                </a>
              </>
            )} 
          </div>
        </Modal>
      )}

      {/* Render Video Player Modal */}
      {videoModalOpen && (
        <Modal isOpen={videoModalOpen} onClose={toggleVideoModal}>
          <div className="text-white p-6"> 
            {selectedVideo && (
              <>
                <iframe 
                  width="560" 
                  height="315" 
                  src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`} 
                  title={selectedVideo.snippet.title} 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen 
                />
                <h2 className="text-2xl font-bold mb-4">{selectedVideo.snippet.title}</h2>
                <p className="text-gray-300 mb-4">{selectedVideo.snippet.description}</p>
              </>
            )} 
          </div>
        </Modal>
      )}

    </div>
  );
}

export default App;