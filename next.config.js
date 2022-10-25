/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['raw.githubusercontent.com'],
  },
  target: "experimental-serverless-trace",
};

module.exports = nextConfig;
