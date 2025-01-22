import React, { useState, useEffect } from 'react';
import { cacheService } from '../utils/cache';

function VideoPlayer({ onVideoClick }) { 
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

  useEffect(() => {
    const fetchVideos = async (retryCount = 0) => {
      try {
        const cachedVideos = cacheService.get('crypto-videos');
        if (cachedVideos) {
          setVideos(cachedVideos);
          setLoading(false);
          return;
        }

const response = await fetch(
  `https://www.googleapis.com/youtube/v3/search?part=snippet&q=bitcoin+crypto&type=video&maxResults=4&order=relevance&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
);
        if (response.status === 429) {
          if (retryCount < 3) {
            setTimeout(() => {
              fetchNews(retryCount + 1);
            }, 5000 * (retryCount + 1));
            return;
          }
        }

        const data = await response.json();
        if (data.items) {
          setVideos(data.items);
          // Cache the results
          cacheService.set('crypto-videos', data.items);
        }
      } catch (error) {
        setError('Error fetching videos: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="p-4 relative mx-auto max-w-7xl min-h-[500px]">
      <h2 className="text-xl font-bold mt-0 mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
        Crypto Videos
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos.map((video, index) => (
            <div
              key={index}
              className="w-full border-t-2 border-t-purple-500 rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow duration-200 bg-[#401b63] backdrop-blur-sm cursor-pointer relative"
              onClick={() => onVideoClick(video)} 
            >
              <div className="h-64 sm:h-36 mb-2 relative">
                <div className="absolute inset-0 bg-purple-500 rounded-md blur-lg"></div>
                <iframe 
                  width="100%" 
                  height="150" 
                  src={`https://www.youtube.com/embed/${video.id.videoId}`} 
                  title={video.snippet.title} 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen 
                  className="relative z-10"
                />
              </div>
              <h3 className="text-sm font-semibold mb-1 line-clamp-2">
                <a
                  href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] hover:text-white text-white transition-colors duration-200"
                >
                  {video.snippet.title}
                </a>
              </h3>
              <p className="text-[9px] text-white/60 line-clamp-2">
                {video.snippet.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VideoPlayer;