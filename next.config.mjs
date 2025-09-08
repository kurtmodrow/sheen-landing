// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'header', key: 'accept', value: 'text/html' }],
        destination: '/',
      },
    ];
  },
};

module.exports = nextConfig;
