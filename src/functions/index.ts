import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import next from "next";

// Cache for 12 hours on the client and 7 days on the server
const CACHE_CONTROL = `public, max-age=${12 * 60 * 60}, s-maxage=${7 *
  24 *
  60 *
  60}`;

// Allow all origins
// TODO limit this to hero.com and admin users
const ACCESS_CONTROL = "*";
const API_HEADERS = {
  "Access-Control-Allow-Origin": ACCESS_CONTROL,
  "Cache-control": CACHE_CONTROL
};

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
  res.set("Cache-control", CACHE_CONTROL);
  await app.prepare();
  return handle(req, res);
});

/**
 * Get Event
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
  res.set(API_HEADERS);
  res.json(event);
});

/**
 * Get Edition
 */
const edition = functions.https.onRequest(async (req, res) => {
  const eventId = req.query.eventId;
  const editionId = req.query.editionId;
  if (!eventId) res.send("eventId is required");
  if (!editionId) res.send("editionId is required");
  const docSnap = await db
    .collection("events")
    .doc(eventId)
    .collection("editions")
    .doc(editionId)
    .get();
  const edition = docSnap.data();
  res.set(API_HEADERS);
  res.json(edition);
});

/**
 * Get recent Editions
 */
const recentEditions = functions.https.onRequest(async (req, res) => {
  const docSnap = await db
    .collectionGroup("editions")
    .where("status", "==", "published")
    .orderBy("endDate", "desc")
    .limit(6)
    .get();
  let editions = [];
  docSnap.forEach(doc => {
    editions.push(doc.data());
  });
  res.set(API_HEADERS);
  res.json(editions);
});

/**
 * Get upcoming Editions
 */
const upcomingEditions = functions.https.onRequest(async (req, res) => {
  const docSnap = await db
    .collectionGroup("editions")
    .where("status", "==", "published-notalks")
    .orderBy("endDate", "asc")
    .limit(4)
    .get();
  let editions = [];
  docSnap.forEach(doc => {
    editions.push(doc.data());
  });
  res.set(API_HEADERS);
  res.json(editions);
});

/**
 * Get Talk
 */
const talk = functions.https.onRequest(async (req, res) => {
  const eventId = req.query.eventId;
  const editionId = req.query.editionId;
  const talkId = req.query.talkId;
  if (!eventId) res.send("eventId is required");
  if (!editionId) res.send("editionId is required");
  if (!talkId) res.send("talkId is required");
  const docSnap = await db
    .collection("events")
    .doc(eventId)
    .collection("editions")
    .doc(editionId)
    .collection("talks")
    .doc(talkId)
    .get();
  const talk = docSnap.data();
  res.set(API_HEADERS);
  res.json(talk);
});

/**
 * Get recent Talks
 */
const recentTalks = functions.https.onRequest(async (req, res) => {
  const docSnap = await db
    .collectionGroup("talks")
    .where("type", "==", "2")
    .orderBy("date", "desc")
    .orderBy("order", "desc")
    .limit(6)
    .get();
  let talks = [];
  docSnap.forEach(doc => {
    talks.push(doc.data());
  });
  res.set(API_HEADERS);
  res.json(talks);
});

/**
 * Get curated Talks
 */
const curatedTalks = functions.https.onRequest(async (req, res) => {
  const docSnap = await db
    .collectionGroup("talks")
    .where("isCurated", "==", true)
    .orderBy("date", "desc")
    .orderBy("order", "desc")
    .limit(3)
    .get();
  let talks = [];
  docSnap.forEach(doc => {
    talks.push(doc.data());
  });
  res.set(API_HEADERS);
  res.json(talks);
});

const heroes = {
  curatedTalks,
  edition,
  event,
  recentEditions,
  ssr,
  talk,
  recentTalks,
  upcomingEditions
};

export { heroes };
