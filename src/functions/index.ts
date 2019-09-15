import * as functions from "firebase-functions";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, conf: { distDir: "next" } });
const handle = app.getRequestHandler();

const ssr = functions.https.onRequest(async (req, res) => {
  console.log("SERVING_URL: " + req.url);
  // Cache for 12 hours on the client and 3 days on the server
  res.setHeader(
    "Cache-control",
    `public, max-age=${12 * 60 * 60}, s-maxage=${3 * 24 * 60 * 60}`
  );
  await app.prepare();
  return handle(req, res);
});

const heroes = {
  ssr
};

export { heroes };
