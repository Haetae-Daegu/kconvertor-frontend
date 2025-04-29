/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:5000/:path*',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'accommodations.lon1.cdn.digitaloceanspaces.com',
      },
      {
        protocol: "https",
        hostname: "accommodations.lon1.digitaloceanspaces.com",
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig; 