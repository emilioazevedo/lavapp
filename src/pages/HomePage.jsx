import React from 'react';
import ChartComponent from "../components/ChartComponent";
import NewsFeed from "../components/NewsFeed";
import VideoPlayer from "../components/VideoPlayer";
import CryptoInfo from '../components/CryptoInfo';
import CryptoStats from '../components/CryptoStats';
import LatestTick from '../components/LatestTick'; // Import LatestTick

function HomePage({ cryptoPrices, toggleNewsModal, toggleVideoModal }) {
  return (
    <div className="flex flex-col items-center relative z-[1] mt-[-50] w-full"> {/* Added width */}
      <main className="flex-1 w-full max-w-6xl px-4 lg:px-8 relative z-[1] pb-[200px] min-h-[1200px]"> {/* Adjusted max-width */}
        {/* Background glow effect */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-[390px] h-[200px] bg-purple-600/80 rounded-full blur-[90px]" />
        </div>

        {/* Content wrapper */}
        <div className="flex flex-col items-center relative z-[30] mt-[140px]">
          <header className="text-center p-4">
            <div id="chart" className='mb-[-50px]'></div>
            <img src="/lav-app-logo1.png" alt="LAV APP Logo" className="mx-auto w-32 h-27 " /> {/* Adjusted size */}
            <h1 className="text-2xl font-bold">LAV APP</h1>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              BTC Buy and Sell Signals
            </h1>
          </header>

          <div className="flex justify-center h-[100%] w-full mb-0">
            <div className="w-full h-[100%] max-w-6xl"> {/* Adjusted height and max-width */}
              <ChartComponent style={{ height: "100%" }} />
            </div>
          </div>
  
          {/* Background glow effect */}
          <div className="pointer-events-none absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[590px] h-[800px] bg-gradient-to-br from-orange-500/20 via-green-800/40 to-purple-800 rounded-full blur-[90px]" />
          </div>

          {/* Background glow effect */}
          <div className="pointer-events-none absolute inset-0 z-0">
            <div className="absolute bottom-5 right-1/2 transform translate-x-1/2 w-[390px] h-[200px] bg-purple-600/80 rounded-full blur-[90px]" />
          </div>
          <div id="info" className='mt-[100px]'></div>
          <div className="z-0 relative w-full max-w-6xl mx-auto"> {/* Adjusted max-width */}
            <div className="w-full border-1 border-transparent bg-clip-border bg-gradient-to-br from-white/80 via-gray-800 to-gray-950 rounded p-0.5 relative mb-8 mt-[100px]">
              <CryptoInfo />
            </div>
          </div>
          <div className='mt-[-80px]'id="stats"></div>

          <div className="w-full border-2 border-gray-500/70 rounded p-2 relative mb-8 mt-[100px]">
            <CryptoStats data={cryptoPrices} />
          </div>

          {/* Latest Tick */}
          <div id="latest-tick" className='mt-[-50px] relative z-[40]'></div>
          <div className="relative z-[40]">
            <div className="w-full h-full p-2">
              <LatestTick /> {/* Include LatestTick component */}
            </div>
          </div>

          {/* News Feed */}
          <div id="news" className='mt-[-50px]'></div>
          <div className="w-full border-1 border-transparent bg-clip-border bg-gradient-to-br from-white/80 via-gray-800 to-gray-950 rounded p-0.5 relative mb-8 mt-[80px]">
            <div className="w-full h-full bg-gradient-to-br from-purple-800 via-custom-dark-purple to-green-900 rounded p-2">
              <h2 className="text-2xl font-bold mb-4"></h2>
              <NewsFeed onArticleClick={toggleNewsModal} /> 
            </div>
          </div>

          {/* Video Player */}
          <div id="videos" className='mt-[-50px]'></div>
          <div className="w-full border-1 border-transparent bg-clip-border bg-gradient-to-br from-white/80 via-gray-800 to-gray-950 rounded p-0.5 relative mt-[70px] mb-[100px]"> {/* Added margin-bottom */}
            <div className="w-full h-full bg-gradient-to-br from-purple-800 via-custom-dark-purple to-green-900 rounded p-2">
              <VideoPlayer onVideoClick={toggleVideoModal} /> 
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default HomePage;