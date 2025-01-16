const CACHE_DURATION = 20 * 60 * 1000; // 5 minutes in milliseconds

export const cacheService = {
  set: (key, data) => {
    const item = {
      data,
      timestamp: new Date().getTime()
    };
    localStorage.setItem(key, JSON.stringify(item));
  },

  get: (key) => {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const parsedItem = JSON.parse(item);
    const now = new Date().getTime();

    if (now - parsedItem.timestamp > CACHE_DURATION) {
      localStorage.removeItem(key);
      return null;
    }

    return parsedItem.data;
  }
};