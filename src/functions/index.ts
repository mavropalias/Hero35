import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import algoliasearch from "algoliasearch";
import next from "next";

// Cache for 12 hours on the client and 1 day on the server
const CACHE_CONTROL = `public, max-age=${12 * 60 * 60}, s-maxage=${1 *
  1 *
  60 *
  60}`;

// Allow all origins
// TODO limit this to hero.com and admin users
const ACCESS_CONTROL = "*";
const API_HEADERS = {
  "Access-Control-Allow-Origin": ACCESS_CONTROL,
  "Cache-control": CACHE_CONTROL
};

// Init algolia
const algolia = algoliasearch(
  functions.config().algolia.app_id,
  functions.config().algolia.api_key
);
const algoliaIndex = algolia.initIndex("talks");

// Init Firebase
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
 * Update Algolia search index, on talk create/update/delete
 */
const indexTalk = functions.firestore
  .document("events/{eventid}/editions/{editionid}/talks/{talkid}")
  .onWrite((snap, context) => {
    let talk: any;
    if (snap.after.exists) {
      talk = snap.after.data();
      // Add an 'objectID' field which Algolia requires
      talk.objectID = talk.id;
    } else {
      talk = { objectID: snap.before.data().id };
    }
    // Only index: Talk, Lightning talk, Panels, Q&A, Workshops, and Interviews
    if (["2", "3", "4", "5", "7", "8"].includes(talk.type)) {
      return algoliaIndex.saveObject(talk);
    } else {
      return true;
    }
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
 * Get editions by country
 */
const editionsByCountry = functions.https.onRequest(async (req, res) => {
  const docSnap = await db
    .collectionGroup("editions")
    .where("country", "==", req.query.id)
    .orderBy("dateTimestamp", "desc")
    .limit(100)
    .get();
  let editions = [];
  docSnap.forEach(doc => {
    editions.push(doc.data());
  });
  res.set(API_HEADERS);
  res.json(editions);
});

/**
 * Get editions by year
 */
const editionsByYear = functions.https.onRequest(async (req, res) => {
  const docSnap = await db
    .collectionGroup("editions")
    // TODO use timestamp
    .where("id", "==", req.query.id)
    .orderBy("dateTimestamp", "desc")
    .limit(100)
    .get();
  let editions = [];
  docSnap.forEach(doc => {
    editions.push(doc.data());
  });
  res.set(API_HEADERS);
  res.json(editions);
});

/**
 * Get recent Editions
 */
const recentEditions = functions.https.onRequest(async (req, res) => {
  const docSnap = await db
    .collectionGroup("editions")
    .where("status", "==", "published")
    .orderBy("dateTimestamp", "desc")
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
    .where("ticketsUrl", "==", "published-notalks")
    .where("dateTimestamp", ">", admin.firestore.Timestamp.now())
    .orderBy("dateTimestamp", "asc")
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
    .orderBy("dateTimestamp", "desc")
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
    .orderBy("dateTimestamp", "desc")
    .orderBy("order", "desc")
    .limit(4)
    .get();
  let talks = [];
  docSnap.forEach(doc => {
    talks.push(doc.data());
  });
  res.set(API_HEADERS);
  res.json(talks);
});

/**
 * Get talks by topic
 */
const talksByTopic = functions.https.onRequest(async (req, res) => {
  const docSnap = await db
    .collectionGroup("talks")
    .where("tags", "array-contains", req.query.id)
    .orderBy("dateTimestamp", "desc")
    .limit(30)
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
  editionsByCountry,
  editionsByYear,
  event,
  indexTalk,
  recentEditions,
  ssr,
  talk,
  recentTalks,
  talksByTopic,
  upcomingEditions
};

export { heroes };
