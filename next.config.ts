import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },

  outputFileTracingIncludes: {
    "/api/chat": ["./content/knowledge/**/*.md"],
  },
};

export default nextConfig;