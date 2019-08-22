import * as functions from "firebase-functions";
import * as next from "next";
import nextServer from "next-server";

const dev = process.env.NODE_ENV !== "production";
const app = nextServer({ conf: { distDir: "next" } });
const handle = app.getRequestHandler();

exports.next = functions.https.onRequest(async (req, res) => {
  console.log("File: " + req.originalUrl); // log the page.js file that is being requested
  await app.prepare();
  handle(req, res);
});
