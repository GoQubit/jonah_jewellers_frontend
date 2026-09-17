module.exports = {
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "https-cache",
        expiration: {
          maxEntries: 200,
        },
      },
    },
  ],
};
