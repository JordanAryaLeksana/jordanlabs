import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },

  outputFileTracingIncludes: {
    "/api/chat": [
      "./content/knowledge/**/*.md",
    ],
  },
};

export default nextConfig;