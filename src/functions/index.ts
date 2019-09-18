import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import next from "next";

// Cache for 12 hours on the client and 7 days on the server
const CACHE_CONTROL = `public, max-age=${12 * 60 * 60}, s-maxage=${7 *
  24 *
  60 *
  60}`;

admin.initializeApp();
const db = admin.firestore();

/**
 * SSR with NextJS
 */
const app = next({
  dev: false,
  dir: __dirname,
  conf: { distDir: "next" }
});
const handle = app.getRequestHandler();
const ssr = functions.https.onRequest(async (req, res) => {
  res.setHeader("Cache-control", CACHE_CONTROL);
  await app.prepare();
  return handle(req, res);
});

/**
 * Get Event by id
 */
const event = functions.https.onRequest(async (req, res) => {
  const eventId = req.query.id;
  if (!eventId) res.send("event id is required");
  const docRef = await db.collection("events").doc(eventId);
  const docSnap = await docRef.get();
  let event = docSnap.data();
  if (event) {
    const querySnapshot = await docRef.collection("editions").get();
    let editions = [];
    querySnapshot.forEach(doc => {
      editions.push(doc.data());
    });
    event.editions = editions;
  }
  res.setHeader("Cache-control", CACHE_CONTROL);
  res.json(event);
});

const heroes = {
  event,
  ssr
};

export { heroes };
