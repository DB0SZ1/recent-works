import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blocks.mvp-subha.me",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig