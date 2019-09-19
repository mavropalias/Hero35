const withCSS = require("@zeit/next-css");

module.exports = withCSS({
  poweredByHeader: false,
  distDir: "../../dist/functions/next",
  compress: false,
  env: {
    STORAGE_PATH:
      "https://firebasestorage.googleapis.com/v0/b/heroes-9c313.appspot.com/o/"
  }
});
