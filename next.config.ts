import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "13.38.232.174",
        port: "3000",
      },
      {
        protocol: "https",
        hostname: "13.38.232.174",
        port: "3000",
      },
    ],
  },
};

export default nextConfig;
