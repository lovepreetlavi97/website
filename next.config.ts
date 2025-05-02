import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['www.giva.co'],
  },
  /* config options here */
  eslint: {
    // Ignore ESLint errors during build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
