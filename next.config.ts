import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The old "free trial" flow was folded into the demo-request page.
      { source: "/trial", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
