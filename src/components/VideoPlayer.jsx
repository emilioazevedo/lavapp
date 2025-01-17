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
    <div className="h-screen p-2 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text sticky top-0 bg-black/20 backdrop-blur-sm">
        Crypto Videos
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="space-y-4">
          {videos.map((video) => (
            <div 
              key={video.id.videoId} 
              className="w-[70%] mx-auto bg-[purple]/60 backdrop-blur-sm rounded-lg overflow-hidden cursor-pointer" 
              onClick={() => onVideoClick(video)} 
            > 
              <div className="w-full h-100" style={{ position: 'relative' }}> 
                <iframe 
                  width="100%" 
                  height="100" 
                  src={`https://www.youtube.com/embed/${video.id.videoId}`} 
                  title={video.snippet.title} 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen 
                  className="rounded-t-lg" 
                  style={{ pointerEvents: 'none' }} // Corrected case
                />
              </div>
              <div className="p-2">
                <h3 className="text-xs font-semibold line-clamp-2">
                  {video.snippet.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VideoPlayer;