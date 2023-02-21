const { env } = require("./src/lib/env.js");

const backendURL = new URL(env.BACKEND_URL);

/** @type {import('next').NextConfig} */
const config = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: backendURL.protocol.replace(":", ""),
        hostname: backendURL.hostname,
      },
    ],
    minimumCacheTTL: 60 * 60,
  },
};

module.exports = config;
