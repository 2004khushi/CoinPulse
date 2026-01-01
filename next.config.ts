import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images:{
        /* we use this so these only specified external links of images could be used and no attacker could mibehave antg here*/
        remotePatterns: [
            {
                protocol: "https",
                hostname: "assets.coingecko.com",
            },
            {
                protocol: "https",
                hostname: "coin-images.coingecko.com",
            },
        ]
    }
};

export default nextConfig;
