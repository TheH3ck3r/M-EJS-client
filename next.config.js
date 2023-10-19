const withPWA = require("next-pwa")({
  disable: process.env.NODE_ENV === "development",
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  env: {
    BASE_ENDPOINT: process.env.BASE_ENDPOINT,
    VERSION: process.env.npm_package_version,
  },
});

module.exports = nextConfig;
