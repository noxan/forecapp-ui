/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/api-production/:slug",
        destination:
          "http://ec2-54-219-210-155.us-west-1.compute.amazonaws.com/:slug",
      },
    ];
  },
};

module.exports = nextConfig;
