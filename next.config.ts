import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  experimental: {
    turbo: undefined, // এটি Turbopack কে পুরোপুরি ডিজেবল করবে
  },
  
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co', 
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co.com', 
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', 
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      { protocol: 'https',
         hostname: 'ui-avatars.com' },
    ],
  },

};

export default nextConfig;
