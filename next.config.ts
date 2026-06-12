import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
      {hostname: "1h3.googlecontent.com"},
    ]
  }
};

export default nextConfig;
