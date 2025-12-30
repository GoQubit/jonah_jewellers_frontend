import withPWA from "next-pwa";

const nextConfig = {
  reactStrictMode: false,

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
