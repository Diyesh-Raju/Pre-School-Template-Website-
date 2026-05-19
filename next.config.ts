import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow the local-network IP to access dev resources (HMR WebSocket, etc.)
  // so phones on the same Wi-Fi can hot-reload off the dev server.
  // Includes the LAN range patterns commonly seen.
  allowedDevOrigins: ["192.168.29.32", "192.168.*.*", "10.*.*.*"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
