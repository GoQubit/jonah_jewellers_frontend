import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    reactStrictMode: false,
    images: {
        unoptimized: false,
        domains: [
            "www.dressyzone.com",
            "www.dressyzone.com",
            "img.kwcdn.com",
            "jonahblob.blob.core.windows.net"
        ]
    },
};

export default nextConfig;
