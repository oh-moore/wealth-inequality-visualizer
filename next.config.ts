import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/wealth-inequality-visualizer',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
