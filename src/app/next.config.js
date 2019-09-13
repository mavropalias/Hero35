module.exports = {
  poweredByHeader: false,
  distDir: "../../dist/functions/next",
  env: {
    STORAGE_PATH:
      "https://firebasestorage.googleapis.com/v0/b/heroes-9c313.appspot.com/o/"
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: "empty"
      };
    }

    // Fixes npm packages that depend on `grpc` module
    if (process.env.NODE_ENV !== "development") {
      config.externals = {
        grpc: "grpc"
      };
    }

    return config;
  }
};
