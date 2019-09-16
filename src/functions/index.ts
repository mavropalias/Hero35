import * as functions from "firebase-functions";
import next from "next";

const app = next({ dev: false, conf: { distDir: "dist/functions/next" } });
const handle = app.getRequestHandler();

const ssr = functions.https.onRequest(async (req, res) => {
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
