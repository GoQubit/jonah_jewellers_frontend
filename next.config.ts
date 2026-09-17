import withPWA from "next-pwa";

const nextConfig = {
  reactStrictMode: false,
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },

  images: {
    unoptimized: false,
    domains: [
      "www.dressyzone.com",
      "img.kwcdn.com",
      "jonahblob.blob.core.windows.net",
    ],
  },
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
})(nextConfig);
