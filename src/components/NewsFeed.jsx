import React, { useState, useEffect } from 'react';
import { cacheService } from '../utils/cache';
import './NewsFeed.css'; // Import the CSS file

function NewsFeed({ onArticleClick }) { 
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async (retryCount = 0) => {
      try {
        const cachedNews = cacheService.get('crypto-news');
        if (cachedNews) {
          setArticles(cachedNews);
          setLoading(false);
          return;
        }

        const response = await fetch(
          `https://newsdata.io/api/1/news?apikey=pub_65421fa08b3a9e0d832a882ee9897eeb9f614&q=crypto&language=en`
        );

        if (response.status === 429) {
          if (retryCount < 3) {
            setTimeout(() => {
              fetchNews(retryCount + 1);
            }, 2000 * (retryCount + 1));
            return;
          }
        }

        const data = await response.json();
        if (data.results) {
          setArticles(data.results);
          cacheService.set('crypto-news', data.results);
        }
      } catch (error) {
        setError('Error loading news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div className="p-4 text-white">Loading news...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-400">{error}</div>;
  }

  return (
    <div className="p-4 relative">
      <h2 className="text-xl font-bold mt-0 mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
        Crypto News
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {articles.map((article, index) => (
          <div
            key={index}
            className="w-full border-t-2 border-t-purple-500 rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow duration-200 bg-[#401b63] backdrop-blur-sm cursor-pointer relative hover:animate-shake"
            onClick={() => onArticleClick(article)} 
          >
            {article.image_url && (
              <div className="h-32 sm:h-16 mb-2 relative">
                <div className="absolute inset-0 bg-purple-500 rounded-md blur-lg"></div>
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full h-full object-cover rounded-md relative z-10"
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>
            )}
            <h3 className="text-sm font-semibold mb-1 line-clamp-2">
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] hover:text-white text-white transition-colors duration-200"
              >
                {article.title}
              </a>
            </h3>
            <p className="text-[9px] text-white/60 line-clamp-2">
              {article.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsFeed;