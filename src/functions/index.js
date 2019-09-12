import * as functions from "firebase-functions";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
// @ts-ignore
const app = next({ dev, conf: { distDir: "next" } });
const handle = app.getRequestHandler();

exports.next = functions.https.onRequest(async (req, res) => {
  await app.prepare();
  // Cache for 12 hours
  res.setHeader("Cache-control", "public, max-age=43200, s-maxage=43200");
  handle(req, res);
});
