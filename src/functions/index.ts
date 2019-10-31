import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import algoliasearch from "algoliasearch";
import { Talk, TalkPreview, User } from "./schema";

// Cache for 12 hours on the client and 24 hours on the server
const CACHE_CONTROL = `public, max-age=${12 * 3600}, s-maxage=${24 * 3600}`;

// Init Firebase
admin.initializeApp();
const db = admin.firestore();

// Middleware
const middleware = (
  req: functions.https.Request,
  res: functions.Response,
  cacheControl?: boolean
): [functions.https.Request, functions.Response, boolean] => {
  // Disallow requests from foreign origins
  let approved = false;
  if (
    !["hero35.com", "heroes-9c313.web.app", "localhost"].includes(req.headers[
      "x-forwarded-host"
    ] as string)
  ) {
    res.set("Access-Control-Allow-Origin", "https://hero35.com");
  } else {
    approved = true;
    res.set({
      "Access-Control-Allow-Origin": "*"
    });
    if (cacheControl) {
      res.set({
        "Cache-control": CACHE_CONTROL
      });
    }
  }
  return [req, res, approved];
};

/**
 * Verifies access token and returns uid.
 */
const verifyIdToken = async (req: functions.https.Request): Promise<string> => {
  let decodedIdToken: admin.auth.DecodedIdToken;
  try {
    decodedIdToken = await admin
      .auth()
      .verifyIdToken(req.query.accessToken || "");
    return Promise.resolve(decodedIdToken.uid);
  } catch (error) {
    return Promise.reject(
      `accessToken: ${req.query.accessToken}, error: ${error}`
    );
  }
};

/**
 * SSR /index
 */
const ssrIndex = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = middleware(req, res);
  if (!approved) return response.send();
  const page = require("./next/serverless/pages/index");
  return page.render(request, response);
});

/**
 * SSR /account
 */
const ssrAccount = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = middleware(req, res);
  if (!approved) return response.send();
  response.sendFile(`${__dirname}/next/serverless/pages/account.html`);
});

/**
 * SSR /curated
 */
const ssrCurated = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = middleware(req, res);
  if (!approved) return response.send();
  const page = require("./next/serverless/pages/curated-conference-talks");
  return page.render(request, response);
});

/**
 * SSR /country
 */
const ssrCountry = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = middleware(req, res);
  if (!approved) return response.send();
  const page = require("./next/serverless/pages/country/[countryid]");
  return page.render(request, response);
});

/**
 * SSR /event
 */
const ssrEvent = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = middleware(req, res);
  if (!approved) return response.send();
  const page = require("./next/serverless/pages/[eventid]");
  return page.render(request, response);
});

/**
 * SSR /edition
 */
const ssrEdition = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = middleware(req, res);
  if (!approved) return response.send();
  const page = require("./next/serverless/pages/[eventid]/[editionid]");
  return page.render(request, response);
});

/**
 * SSR /hero
 */
const ssrHero = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = middleware(req, res);
  if (!approved) return response.send();
  const page = require("./next/serverless/pages/hero/[heroid]");
  return page.render(request, response);
});

/**
 * SSR /privacy-policy
 */
const ssrPrivacyPolicy = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = middleware(req, res);
  if (!approved) return response.send();
  response.sendFile(`${__dirname}/next/serverless/pages/privacy-policy.html`);
});

/**
 * SSR /terms-of-service
 */
const ssrTermsOfService = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = middleware(req, res);
  if (!approved) return response.send();
  response.sendFile(`${__dirname}/next/serverless/pages/terms-of-service.html`);
});

/**
 * SSR /talk
 */
const ssrTalk = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = middleware(req, res);
  if (!approved) return response.send();
  const page = require("./next/serverless/pages/[eventid]/[editionid]/[talkslug]");
  return page.render(request, response);
});

/**
 * SSR /topic
 */
const ssrTopic = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = middleware(req, res);
  if (!approved) return response.send();
  const page = require("./next/serverless/pages/topic/[topicid]");
  return page.render(request, response);
});

/**
 * SSR /year
 */
const ssrYear = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = middleware(req, res);
  if (!approved) return response.send();
  const page = require("./next/serverless/pages/year/[yearid]");
  return page.render(request, response);
});

/**
 * Update Algolia search index, on talk create/update/delete
 */
const indexTalk = functions.firestore
  .document("events/{eventid}/editions/{editionid}/talks/{talkid}")
  .onWrite((snap, context) => {
    // Init algolia
    const algolia = algoliasearch(
      functions.config().algolia.app_id,
      functions.config().algolia.api_key
    );
    const algoliaIndex = algolia.initIndex("talks");
    let talk: Talk;
    if (snap.after.exists) {
      talk = (snap.after.data() as unknown) as Talk;
      // Do not index like/dislike UIDs
      delete talk.likesUIDs;
      delete talk.dislikesUIDs;
      // Add an 'objectID' field which Algolia requires
      talk.objectID = talk.id;
    }
    return algoliaIndex.saveObject(talk || { objectID: snap.before.data().id });
  });

/**
 * Get Event
 */
const event = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = middleware(req, res);
  if (!approved) return response.send();
  const eventId = request.query.id;
  if (!eventId) response.send("event id is required");
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
  response.json(event);
});

/**
 * Get Edition
 */
const edition = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = middleware(req, res);
  if (!approved) return response.send();
  const eventId = request.query.eventId;
  const editionId = request.query.editionId;
  if (!eventId) response.send("eventId is required");
  if (!editionId) response.send("editionId is required");
  const docSnap = await db
    .collection("events")
    .doc(eventId)
    .collection("editions")
    .doc(editionId)
    .get();
  const edition = docSnap.data();
  response.json(edition);
});

/**
 * Get editions by country
 */
const editionsByCountry = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = middleware(req, res);
  if (!approved) return response.send();
  const docSnap = await db
    .collectionGroup("editions")
    .where("country", "==", request.query.id)
    .orderBy("dateTimestamp", "desc")
    .limit(1000)
    .get();
  let editions = [];
  docSnap.forEach(doc => {
    editions.push(doc.data());
  });
  response.json(editions);
});

/**
 * Get editions by year
 */
const editionsByYear = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = middleware(req, res);
  if (!approved) return response.send();
  const docSnap = await db
    .collectionGroup("editions")
    // TODO use timestamp
    .where("id", "==", request.query.id)
    .orderBy("dateTimestamp", "desc")
    .limit(1000)
    .get();
  let editions = [];
  docSnap.forEach(doc => {
    editions.push(doc.data());
  });
  response.json(editions);
});

/**
 * Get recent Editions
 */
const recentEditions = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = middleware(req, res);
  if (!approved) return response.send();
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
  response.json(editions);
});

/**
 * Get upcoming Editions
 */
const upcomingEditions = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = middleware(req, res);
  if (!approved) return response.send();
  const docSnap = await db
    .collectionGroup("editions")
    .where("status", "==", "published-notalks")
    .where("dateTimestamp", ">", admin.firestore.Timestamp.now())
    .orderBy("dateTimestamp", "asc")
    .limit(4)
    .get();
  let editions = [];
  docSnap.forEach(doc => {
    editions.push(doc.data());
  });
  response.json(editions);
});

/**
 * Get Talk
 */
const talk = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = middleware(req, res);
  if (!approved) return response.send();
  const eventId = request.query.eventId;
  const editionId = request.query.editionId;
  const talkSlug = request.query.talkSlug;
  if (!eventId) response.send("eventId is required");
  if (!editionId) response.send("editionId is required");
  if (!talkSlug) response.send("talkSlug is required");
  const docSnap = await db
    .collectionGroup("talks")
    .where("eventId", "==", eventId)
    .where("editionId", "==", editionId)
    .where("slug", "==", talkSlug)
    .limit(1)
    .get();
  const talk: Talk = docSnap.docs[0]
    ? ((docSnap.docs[0].data() as unknown) as Talk)
    : null;
  delete talk.dislikesUIDs;
  delete talk.likesUIDs;
  response.json(talk);
});

/**
 * Get filtered Talks
 */
const filterTalks = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = middleware(req, res);
  if (!approved) return response.send();
  const docSnap = await db
    .collectionGroup("talks")
    .where("type", "==", request.query.type)
    .where("tags", "array-contains", request.query.topic)
    .where("isCurated", "==", request.query.curated)
    .orderBy(request.query.orderBy, request.query.sortOrder)
    .limit(100)
    .get();
  let talks = [];
  docSnap.forEach(doc => {
    talks.push(doc.data());
  });
  response.json(talks);
});

/**
 * Get recent Talks
 */
const recentTalks = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = middleware(req, res);
  if (!approved) return response.send();
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
  response.json(talks);
});

/**
 * Get user
 */
const getUser = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = middleware(req, res);
  if (!approved) return response.send();
  let uid;
  try {
    uid = await verifyIdToken(request);
  } catch (e) {
    response.send(e);
  }
  const user = await db
    .collection("users")
    .doc(uid)
    .get();
  response.json(user.data());
});

/**
 * Get hero Talks
 */
const heroTalks = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = middleware(req, res);
  if (!approved) return response.send();
  const docSnap = await db
    .collectionGroup("talks")
    .where("speaker", "==", decodeURIComponent(request.query.name))
    .orderBy("dateTimestamp", "desc")
    .get();
  let talks = [];
  docSnap.forEach(doc => {
    talks.push(doc.data());
  });
  response.json(talks);
});

/**
 * Get curated Talks
 */
const curatedTalks = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = middleware(req, res);
  if (!approved) return response.send();
  const docSnap = await db
    .collectionGroup("talks")
    .where("isCurated", "==", true)
    .orderBy("dateTimestamp", "desc")
    .orderBy("order", "desc")
    .limit(80)
    .get();
  let talks = [];
  docSnap.forEach(doc => {
    talks.push(doc.data());
  });
  response.json(talks);
});

/**
 * Get talks by topic
 */
const talksByTopic = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = middleware(req, res);
  if (!approved) return response.send();
  const docSnap = await db
    .collectionGroup("talks")
    .where("tags", "array-contains", request.query.id)
    .orderBy("dateTimestamp", "desc")
    .limit(1000)
    .get();
  let talks = [];
  docSnap.forEach(doc => {
    talks.push(doc.data());
  });
  response.json(talks);
});

/**
 * Like talk
 */
const likeTalk = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = middleware(req, res, false);
  if (!approved) return response.send();
  let uid: string;
  try {
    uid = await verifyIdToken(request);
  } catch (e) {
    response.send(e);
  }
  const userDocRef = await db.collection("users").doc(uid);
  const talkDocSnap = await db
    .collectionGroup("talks")
    .where("id", "==", request.query.talkId)
    .get();
  const talk: Talk = talkDocSnap.docs[0]
    ? ((talkDocSnap.docs[0].data() as unknown) as Talk)
    : null;
  if (!talk) {
    response.send(null);
  }
  await db
    .collection("events")
    .doc(talk.eventId)
    .collection("editions")
    .doc(talk.editionId)
    .collection("talks")
    .doc(talk.id)
    .set(
      {
        dislikesUIDs: admin.firestore.FieldValue.arrayRemove(uid),
        likes: talk.likesUIDs ? talk.likesUIDs.length + 1 : 1,
        likesUIDs: admin.firestore.FieldValue.arrayUnion(uid)
      },
      { merge: true }
    );
  await userDocRef.set(
    {
      dislikedTalks: admin.firestore.FieldValue.arrayRemove(talk.id),
      likedTalks: admin.firestore.FieldValue.arrayUnion(talk.id)
    },
    { merge: true }
  );
  const user = await userDocRef.get();
  response.json((user.data() as unknown) as User);
});

/**
 * Dislike talk
 */
const dislikeTalk = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = middleware(req, res, false);
  if (!approved) return response.send();
  let uid: string;
  try {
    uid = await verifyIdToken(request);
  } catch (e) {
    response.send(e);
  }
  const userDocRef = await db.collection("users").doc(uid);
  const talkDocSnap = await db
    .collectionGroup("talks")
    .where("id", "==", request.query.talkId)
    .get();
  const talk: Talk = talkDocSnap.docs[0]
    ? ((talkDocSnap.docs[0].data() as unknown) as Talk)
    : null;
  if (!talk) {
    response.send(null);
  }
  await db
    .collection("events")
    .doc(talk.eventId)
    .collection("editions")
    .doc(talk.editionId)
    .collection("talks")
    .doc(talk.id)
    .set(
      {
        dislikesUIDs: admin.firestore.FieldValue.arrayUnion(uid),
        dislikes: talk.dislikesUIDs ? talk.dislikesUIDs.length + 1 : 1,
        likesUIDs: admin.firestore.FieldValue.arrayRemove(uid)
      },
      { merge: true }
    );
  await userDocRef.set(
    {
      dislikedTalks: admin.firestore.FieldValue.arrayUnion(talk.id),
      likedTalks: admin.firestore.FieldValue.arrayRemove(talk.id)
    },
    { merge: true }
  );
  const user = await userDocRef.get();
  response.json((user.data() as unknown) as User);
});

/**
 * Save talk
 */
const saveTalkInUserProfile = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = middleware(req, res, false);
  if (!approved) return response.send();
  let uid;
  try {
    uid = await verifyIdToken(request);
  } catch (e) {
    response.send(e);
  }
  const userDocRef = await db.collection("users").doc(uid);
  const talkDocSnap = await db
    .collectionGroup("talks")
    .where("id", "==", request.query.talkId)
    .get();
  const talk: any = talkDocSnap.docs[0] ? talkDocSnap.docs[0].data() : null;
  if (!talk) {
    response.send(null);
  }
  const savedTalk = {
    categories: talk.categories,
    curationDescription: talk.curationDescription || "",
    date: talk.date,
    editionId: talk.editionId,
    editionTitle: talk.editionTitle,
    eventId: talk.eventId,
    eventTitle: talk.eventTitle,
    id: talk.id,
    isCurated: talk.isCurated || false,
    slug: talk.slug,
    speaker: talk.speaker,
    tags: talk.tags,
    times: talk.times,
    title: talk.title,
    type: talk.type
  };
  await userDocRef.set(
    {
      savedTalks: admin.firestore.FieldValue.arrayUnion(savedTalk)
    },
    { merge: true }
  );
  const user = await userDocRef.get();
  response.json(user.data());
});

/**
 * Unsave talk
 */
const unsaveTalkInUserProfile = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = middleware(req, res, false);
  if (!approved) return response.send();
  let uid;
  try {
    uid = await verifyIdToken(request);
  } catch (e) {
    response.send(e);
  }
  const userDocRef = await db.collection("users").doc(uid);
  const talkDocSnap = await db
    .collectionGroup("talks")
    .where("id", "==", request.query.talkId)
    .get();
  const talk: any = talkDocSnap.docs[0] ? talkDocSnap.docs[0].data() : null;
  if (!talk) {
    response.send(null);
  }
  const savedTalk = {
    categories: talk.categories,
    curationDescription: talk.curationDescription || "",
    date: talk.date,
    editionId: talk.editionId,
    editionTitle: talk.editionTitle,
    eventId: talk.eventId,
    eventTitle: talk.eventTitle,
    id: talk.id,
    isCurated: talk.isCurated || false,
    slug: talk.slug,
    speaker: talk.speaker,
    tags: talk.tags,
    times: talk.times,
    title: talk.title,
    type: talk.type
  };
  await userDocRef.set(
    {
      savedTalks: admin.firestore.FieldValue.arrayRemove(savedTalk)
    },
    { merge: true }
  );
  const user = await userDocRef.get();
  response.json(user.data());
});

const heroes = {
  curatedTalks,
  dislikeTalk,
  edition,
  editionsByCountry,
  editionsByYear,
  event,
  filterTalks,
  getUser,
  heroTalks,
  indexTalk,
  likeTalk,
  recentEditions,
  recentTalks,
  saveTalkInUserProfile,
  ssrIndex,
  ssrAccount,
  ssrCountry,
  ssrCurated,
  ssrEdition,
  ssrEvent,
  ssrHero,
  ssrPrivacyPolicy,
  ssrTalk,
  ssrTermsOfService,
  ssrTopic,
  ssrYear,
  talk,
  talksByTopic,
  unsaveTalkInUserProfile,
  upcomingEditions
};

export { heroes };
