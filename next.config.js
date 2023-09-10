/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: false,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: ".",
  webpack(
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
