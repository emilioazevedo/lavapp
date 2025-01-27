import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Modal from './components/Modal'; 
import About from './pages/About';
import HomePage from './pages/HomePage';
import logo from './lav-app-logo.png'; // Ensure the correct path to the logo

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
        nav.classList.add('bg-opacity-30', 'shadow-lg');
      } else {
        nav.classList.remove('bg-opacity-30', 'shadow-lg');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <div className="min-h-screen w-full relative z-[1]">
        <nav className="bg-gradient-to-r from-purple-950 via-purple-800 to-purple-950 bg-opacity-90 p-4 fixed top-0 left-0 w-full z-50 transition-opacity duration-300 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <img src={logo} alt="LAV APP Logo" className="w-6 h-6 mr-2" /> {/* Adjusted size */}
              <div className="text-white text-lg font-bold">LAV APP</div>
            </div>
            <ul className="flex space-x-4">
              <li><Link to="/" className="text-white hover:text-gray-300">Home</Link></li>
              <li><Link to="/about" className="text-white hover:text-gray-300">About</Link></li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage 
            cryptoData={cryptoData} 
            cryptoPrices={cryptoPrices}
            toggleNewsModal={toggleNewsModal}
            toggleVideoModal={toggleVideoModal}
          />} />
          <Route path="/about" element={<About />} />
        </Routes>

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

        {/* Footer */}
        <footer className="bg-gray-800 p-4 mt-8 w-full fixed bottom-0 left-0 z-50">
          <div className="container mx-auto flex justify-between items-center flex-wrap">
            <img src={logo} alt="LAV APP Logo" className="w-6 h-6" /> {/* Adjusted size */}
            <p className="text-white/90 text-center w-full md:w-auto">© 2023 LAV APP. All rights reserved.</p>
            <ul className="flex space-x-4">
              <li><Link to="/" className="text-white hover:text-gray-300">Home</Link></li>
              <li><Link to="/about" className="text-white hover:text-gray-300">About</Link></li>
            </ul>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;