import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920, 2560],
  },
  async redirects() {
    return [
      // Leftover Wix-store demo product pages from the previous site
      { source: "/product-page/:slug*", destination: "/", permanent: true },
      { source: "/product-page", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
