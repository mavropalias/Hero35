"use strict";

const functions = require("firebase-functions");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
// @ts-ignore
const app = next({ dev, conf: { distDir: "next" } });
const handle = app.getRequestHandler();

exports.next = functions.https.onRequest(async (req, res) => {
  await app.prepare();
  res.setHeader("Cache-control", "public, max-age=300, s-maxage=600");
  handle(req, res);
});
