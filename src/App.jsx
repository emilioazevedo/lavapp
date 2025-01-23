import React, { useState, useEffect } from 'react';
import ChartComponent from "./components/ChartComponent";
import "./App.css";
import NewsFeed from "./components/NewsFeed";
import VideoPlayer from "./components/VideoPlayer";
import CryptoInfo from './components/CryptoInfo';
import CryptoStats from './components/CryptoStats';
import Modal from './components/Modal'; 
import './components/Modal.css';
import logo from './lav-app-logo.png'; // Import the logo

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

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('nav');
      if (window.scrollY > 50) {
        nav.classList.add('bg-opacity-30');
      } else {
        nav.classList.remove('bg-opacity-30');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full relative z-[1]">
      {/* Menu */}
      <nav className="bg-gradient-to-r from-purple-950 via-purple-800 to-purple-950 bg-opacity-90 p-4 fixed top-0 left-0 w-full z-50 transition-opacity duration-300">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img src={logo} alt="LAV APP Logo" className="w-8 h-8 mr-2" />
            <div className="text-white text-lg font-bold">LAV APP</div>
          </div>
          <ul className="flex space-x-4">
            <li><a href="#chart" className="text-white hover:text-gray-300">Home</a></li>
            <li><a href="#news" className="text-white hover:text-gray-300">News</a></li>
            <li><a href="#videos" className="text-white hover:text-gray-300">Videos</a></li>
            <li><a href="#stats" className="text-white hover:text-gray-300">Stats</a></li>
            <li><a href="#info" className="text-white hover:text-gray-300">Crypto Info</a></li>
          </ul>
        </div>
      </nav>

      {/* Background glow effect */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-20 left-1/3 w-[390px] h-[200px] bg-purple-600/80 rounded-full blur-[90px]" />
      </div>

      {/* Content wrapper */}
      <div className="flex flex-col lg:flex-row lg:justify-between relative z-[1] mt-16">
        <main className="flex-1 mx-auto px-4 lg:max-w-6xl lg:px-8 relative z-[1]" style={{ marginLeft: "auto", marginRight: "auto" }}>
          <header className="text-center p-4">
            <div id="chart" className='mb-100px'></div>
            <img src="/lav-app-logo.png" alt="LAV APP Logo" className="mx-auto" />
            <h1 className="text-2xl font-bold">LAV APP</h1>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              BTC Buy and Sell Signals
            </h1>
          </header>

          <div className="flex justify-center w-full mb-8">
            <div className="w-full h-[100%] max-w-6xl">
              <ChartComponent style={{ height: "100%" }} />
            </div>
          </div>
 
          {/* Background glow effect */}
          <div className="pointer-events-none absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[590px] h-[800px] bg-gradient-to-br from-orange-500/20 via-green-800/40 to-purple-800 rounded-full blur-[90px]" />
          </div>

          {/* Background glow effect */}
          <div className="pointer-events-none absolute inset-0 z-0">
            <div className="absolute bottom-5 right-0 w-[390px] h-[200px] bg-purple-600/80 rounded-full blur-[90px]" />
          </div>
          <div id="info" className='mt-100px'></div>
          <div className="z-0 relative max-w-auto mx-auto">
            <div className="z-111 absolute -top-0.8 -left-0.8 w-64 h-64 bg-gradient-to-bl from-white/90 to-transparent rounded-tl-lg" />
            <div className="z-10 relative border-2 border-white/60 p-0 relative mb-8">
              <CryptoInfo data={cryptoData} />
            </div>
          </div>
          <div className='m-100px' id="stats"></div>

          <div className="border-2 border-gray-500/70 rounded p-2 relative mb-8 mt-[100px]">
            <CryptoStats data={cryptoPrices} />
          </div>

          {/* News Feed */}
          <div id="news" className='mt-100px'></div>

          <div className="w-full border-1 border-transparent bg-clip-border bg-gradient-to-br from-white/80 via-gray-800 to-gray-950 rounded p-0.5 relative mb-8 mt-[100px]">
            <div className="w-full h-full bg-gradient-to-br from-purple-800 via-custom-dark-purple to-green-900 rounded p-2">
              <h2 className="text-2xl font-bold mb-4"></h2>
              <NewsFeed onArticleClick={toggleNewsModal} /> 
            </div>
          </div>

          {/* Video Player */}
          <div id="videos" className='mt-100px'></div>

          <div className="w-full border-1 border-transparent bg-clip-border bg-gradient-to-br from-white/80 via-gray-800 to-gray-950 rounded p-0.5 relative mb-8 mt-[100px]">
            <div className="w-full h-full bg-gradient-to-br from-purple-800 via-custom-dark-purple to-green-900 rounded p-2">
              <VideoPlayer onVideoClick={toggleVideoModal} /> 
            </div>
          </div>
        </main>
      </div>
        
      <div className="min-h-screen w-full relative z-[1]">

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
  </div>
  );
}

export default App;