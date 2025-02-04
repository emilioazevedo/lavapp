const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // Proxy all requests starting with `/api`
    createProxyMiddleware({
      target: 'https://pro-api.coinmarketcap.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Remove the `/api` prefix
      },
      headers: {
        'X-CMC_PRO_API_KEY': process.env.VITE_COINMARKETCAP_API_KEY, // Add API key
      },
      onProxyReq: (proxyReq, req, res) => {
        console.log('Proxying request:', req.url);
        console.log('Request headers:', proxyReq.getHeaders());
      },
      onProxyRes: (proxyRes, req, res) => {
        console.log('Received response from target:', proxyRes.statusCode);
        let responseBody = '';
        proxyRes.on('data', (chunk) => {
          responseBody += chunk.toString();
        });
        proxyRes.on('end', () => {
          console.log('Response body:', responseBody);
        });
      },
      onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.writeHead(500, {
          'Content-Type': 'text/plain',
        });
        res.end('Something went wrong. And we are reporting a custom error message.');
      },
    })
  );
};