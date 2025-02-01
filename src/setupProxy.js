const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://pro-api.coinmarketcap.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
      onProxyReq: (proxyReq, req, res) => {
        console.log('Proxying request:', req.url);
        console.log('Request headers:', proxyReq.getHeaders());
      },
      onProxyRes: (proxyRes, req, res) => {
        console.log('Received response from target:', proxyRes.statusCode);
        proxyRes.on('data', (chunk) => {
          console.log('Response chunk:', chunk.toString());
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
