import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    unoptimized: false,
  },
  // Vercel-ready: no special config needed for App Router
};

export default nextConfig;
