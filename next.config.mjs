/** @type {import('next').NextConfig} */
const nextConfig = {
  // SSR оставляем (НЕ ставим output: 'export')
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://donation-backend:5000/api/:path*'
      }
    ];
  }
};

export default nextConfig;
