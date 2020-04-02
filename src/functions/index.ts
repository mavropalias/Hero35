import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import algoliasearch from "algoliasearch";
import { Talk, TalkPreview, User, TALK_TYPE, TalkBasic } from "./schema";
import {
  getTalksCurated,
  getTalksHot,
  getTalksRising,
  getTalksTop,
  getTalksNew,
  getTalksByFilter
} from "./content/talk-getters";
import { talksTop } from "./content/talk-http-functions";
import { newsletterSubscribe } from "./util/newsletter";
import { db } from "./admin";
import util from "./util/util";
import { hub } from "./content/hub";

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
 * Determine talk vote count
 */
const determineVotesForTalkFromUser = (userid: string, talk: Talk): number => {
  const LEAD_CURATORS = ["OXXDuevPrfbLTaH4etkbUZZri2z1"];
  const CURATORS = [
    "4KjHQnWia8ZfZhK2YM01QSeWlE32",
    "COzP3Ri3NeexAV8LhHwXSZEfH7e2"
  ];
  let count = 1;
  // Add curator votes
  if (LEAD_CURATORS.includes(userid)) {
    count += 10 + (talk.times.totalMins % 10) + (talk.order % 10);
  } else if (CURATORS.includes(userid)) {
    count += 4 + (talk.order % 10);
  }
  return count;
};

/**
 * SSR /index
 */
const ssrIndex = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = util.middleware(req, res, true);
  if (!approved) return response.send();
  const page = require("./next/serverless/pages/index");
  return page.render(request, response);
});

/**
 * SSR /account
 */
const ssrAccount = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = util.middleware(req, res, true);
  if (!approved) return response.send();
  response.sendFile(`${__dirname}/next/serverless/pages/account.html`);
});

/**
 * SSR /Top100
 */
const ssrTop100 = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = util.middleware(req, res, true);
  if (!approved) return response.send();
  const page = require("./next/serverless/pages/top100");
  return page.render(request, response);
});

/**
 * SSR /country
 */
const ssrCountry = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = util.middleware(req, res, true);
  if (!approved) return response.send();
  const page = require("./next/serverless/pages/country/[countryid]");
  return page.render(request, response);
});

/**
 * SSR /curated
 */
const ssrCurated = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = util.middleware(req, res, true);
  if (!approved) return response.send();
  const page = require("./next/serverless/pages/curated-conference-talks");
  return page.render(request, response);
});

/**
 * SSR /event
 */
const ssrEvent = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = util.middleware(req, res, true);
  if (!approved) return response.send();
  const page = require("./next/serverless/pages/[eventid]");
  return page.render(request, response);
});

/**
 * SSR /edition
 */
const ssrEdition = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = util.middleware(req, res, true);
  if (!approved) return response.send();
  const page = require("./next/serverless/pages/[eventid]/[editionid]");
  return page.render(request, response);
});

/**
 * SSR /hero
 */
const ssrHero = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = util.middleware(req, res, true);
  if (!approved) return response.send();
  const page = require("./next/serverless/pages/hero/[heroid]");
  return page.render(request, response);
});

/**
 * SSR /privacy-policy
 */
const ssrPrivacyPolicy = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = util.middleware(req, res, true);
  if (!approved) return response.send();
  response.sendFile(`${__dirname}/next/serverless/pages/privacy-policy.html`);
});

/**
 * SSR /saved
 */
const ssrSaved = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = util.middleware(req, res, true);
  if (!approved) return response.send();
  response.sendFile(`${__dirname}/next/serverless/pages/saved.html`);
});

/**
 * SSR /stack
 */
const ssrStack = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = util.middleware(req, res, true);
  if (!approved) return response.send();
  const page = require("./next/serverless/pages/stack/[stackid]");
  return page.render(request, response);
});

/**
 * SSR /terms-of-service
 */
const ssrTermsOfService = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = util.middleware(req, res, true);
  if (!approved) return response.send();
  response.sendFile(`${__dirname}/next/serverless/pages/terms-of-service.html`);
});

/**
 * SSR /talk
 */
const ssrTalk = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = util.middleware(req, res, true);
  if (!approved) return response.send();
  const page = require("./next/serverless/pages/[eventid]/[editionid]/[talkslug]");
  return page.render(request, response);
});

/**
 * SSR /topic
 */
const ssrTopic = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = util.middleware(req, res, true);
  if (!approved) return response.send();
  const page = require("./next/serverless/pages/topic/[topicid]");
  return page.render(request, response);
});

/**
 * SSR /year
 */
const ssrYear = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = util.middleware(req, res, true);
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
  const [request, response, approved] = util.middleware(req, res, true);
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
  const [request, response, approved] = util.middleware(req, res, true);
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
  const [request, response, approved] = util.middleware(req, res, true);
  if (!approved) return response.send();
  let query = db
    .collectionGroup("editions")
    .where("country", "==", request.query.id);
  if (request.query.stackid > 0) {
    query = query.where("categories", "array-contains", request.query.stackid);
  }
  const docSnap = await query
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
  const [request, response, approved] = util.middleware(req, res, true);
  if (!approved) return response.send();
  let query = db
    .collectionGroup("editions")
    // TODO Use timestamp to get year
    .where("id", "==", request.query.id);
  if (request.query.stackid > 0) {
    query = query.where("categories", "array-contains", request.query.stackid);
  }
  const docSnap = await query
    .orderBy("dateTimestamp", "asc")
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
  const [request, response, approved] = util.middleware(req, res, true);
  if (!approved) return response.send();
  let query = db
    .collectionGroup("editions")
    .where("status", "in", ["published", "published-notalks"])
    .where("dateTimestamp", "<", admin.firestore.Timestamp.now())
    .orderBy("dateTimestamp", "desc");
  if (request.query.stackid > 0) {
    query = query.where("categories", "array-contains", request.query.stackid);
  }
  query = query.limit(20);
  const docSnap = await query.get();
  let editions = [];
  docSnap.forEach(doc => {
    editions.push(doc.data());
  });
  response.json(editions);
});

/**
 * Get just added Editions
 */
const justAddedEditions = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = util.middleware(req, res, true);
  if (!approved) return response.send();
  let query = db
    .collectionGroup("editions")
    .where("status", "==", "published")
    .orderBy("dateAddedTimestamp", "desc");
  if (request.query.stackid > 0) {
    query = query.where("categories", "array-contains", request.query.stackid);
  }
  query = query.limit(20);
  const docSnap = await query.get();
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
  const [request, response, approved] = util.middleware(req, res, true);
  if (!approved) return response.send();
  let query = db
    .collectionGroup("editions")
    .where("status", "==", "published-notalks")
    .where("dateTimestamp", ">", admin.firestore.Timestamp.now());
  if (request.query.stackid > 0) {
    query = query.where("categories", "array-contains", request.query.stackid);
  }
  const docSnap = await query
    .orderBy("dateTimestamp", "asc")
    .limit(20)
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
  const [request, response, approved] = util.middleware(req, res, true);
  if (!approved) return response.send();
  const eventId = request.query.eventId;
  const editionId = request.query.editionId;
  const talkSlug = request.query.talkSlug;
  console.log(talkSlug);
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
 * TODO
 */
const filterTalks = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = util.middleware(req, res, true);
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
  const [request, response, approved] = util.middleware(req, res, true);
  if (!approved) return response.send();
  let query = db.collectionGroup("talks").where("type", "==", "2");
  if (request.query.stackid > 0) {
    query = query.where("categories", "array-contains", request.query.stackid);
  }
  const docSnap = await query
    .orderBy("dateTimestamp", "desc")
    .limit(30)
    .get();
  let talks = [];
  docSnap.forEach(doc => {
    talks.push(doc.data());
  });
  response.json(talks);
});

/**
 * Get just added Talks
 */
const justAddedTalks = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = util.middleware(req, res, true);
  if (!approved) return response.send();
  let query = db.collectionGroup("talks").where("type", "==", "2");
  if (request.query.stackid > 0) {
    query = query.where("categories", "array-contains", request.query.stackid);
  }
  const docSnap = await query
    .orderBy("dateAddedTimestamp", "desc")
    .limit(30)
    .get();
  let talks = [];
  docSnap.forEach(doc => {
    talks.push(doc.data());
  });
  response.json(talks);
});

/**
 * Get rising Talks
 */
const risingTalks = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = util.middleware(req, res, true);
  if (!approved) return response.send();
  let query = db.collectionGroup("talks").where("type", "==", "2");
  if (request.query.stackid > 0) {
    query = query.where("categories", "array-contains", request.query.stackid);
  }
  const docSnap = await query
    .where("hasLikes", "==", true)
    .orderBy("dateAddedTimestamp", "desc")
    .limit(30)
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
  const [request, response, approved] = util.middleware(req, res, false);
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
  const [request, response, approved] = util.middleware(req, res, true);
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
  const [request, response, approved] = util.middleware(req, res, true);
  if (!approved) return response.send();
  let query = db.collectionGroup("talks").where("isCurated", "==", true);
  if (request.query.stackid > 0) {
    query = query.where("categories", "array-contains", request.query.stackid);
  }
  const docSnap = await query
    .orderBy("dateAddedTimestamp", "desc")
    .limit(30)
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
  const [request, response, approved] = util.middleware(req, res, true);
  if (!approved) return response.send();
  const docSnap = await db
    .collectionGroup("talks")
    .where("tags", "array-contains", request.query.id)
    .orderBy("dateTimestamp", "desc")
    .limit(1000)
    .get();
  let talks = [];
  if (request.query.stackid > 0) {
    docSnap.forEach(doc => {
      if (doc.data().categories.includes(request.query.stackid)) {
        talks.push(doc.data());
      }
    });
  } else {
    docSnap.forEach(doc => {
      talks.push(doc.data());
    });
  }
  response.json(talks);
});

/**
 * Like talk
 */
const likeTalk = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = util.middleware(req, res, true);
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
  const likes = talk.likesUIDs
    ? talk.likesUIDs
        .map(likeUid =>
          likeUid !== uid ? determineVotesForTalkFromUser(likeUid, talk) : 0
        )
        .reduce((prev, curr) => prev + curr, 0) +
      determineVotesForTalkFromUser(uid, talk) +
      (talk.isCurated ? 15 : 0)
    : determineVotesForTalkFromUser(uid, talk) + (talk.isCurated ? 15 : 0);
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
        hasLikes: likes > 0 ? true : false,
        likes,
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
  const [request, response, approved] = util.middleware(req, res, true);
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
  const [request, response, approved] = util.middleware(req, res, true);
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
  const savedTalk: TalkBasic = {
    categories: talk.categories,
    coverImage: talk.coverImage,
    curationDescription: talk.curationDescription || "",
    editionId: talk.editionId,
    editionTitle: talk.editionTitle,
    eventId: talk.eventId,
    eventTitle: talk.eventTitle,
    id: talk.id,
    isCurated: talk.isCurated || false,
    slug: talk.slug,
    speaker: talk.speaker,
    tags: talk.tags,
    title: talk.title,
    youtubeId: talk.youtubeId
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
  const [request, response, approved] = util.middleware(req, res, true);
  if (!approved) return response.send();
  let uid;
  try {
    uid = await verifyIdToken(request);
  } catch (e) {
    response.send(e);
  }
  const userDocRef = await db.collection("users").doc(uid);
  const userDocSnap = await userDocRef.get();
  const updatedSavedTalks: TalkPreview[] = ((userDocSnap.data() as unknown) as User).savedTalks.filter(
    talk => talk.id !== request.query.talkId
  );
  await userDocRef.set(
    {
      savedTalks: updatedSavedTalks
    },
    { merge: true }
  );
  const user = await userDocRef.get();
  response.json(user.data());
});

/**
 * Get hub content
 */
const hubContent = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = util.middleware(req, res, true);
  if (!approved) return response.send();
  const stack = request.query.stack;
  const topic = request.query.topic;
  const [
    curatedTalks,
    hotTalks,
    risingTalks,
    topTalks,
    newTalks,
    recentlyAddedTalks,
    keynotes,
    lightningTalks,
    panels,
    qaSessions,
    workshops,
    interviews
  ] = await Promise.all([
    getTalksCurated(topic, stack),
    getTalksHot(topic, stack),
    getTalksRising(topic, stack),
    getTalksTop(topic, stack),
    getTalksNew(topic, stack),
    getTalksByFilter(topic, stack, TALK_TYPE.Talk),
    getTalksByFilter(topic, stack, TALK_TYPE.Keynote),
    getTalksByFilter(topic, stack, TALK_TYPE.LightningTalk),
    getTalksByFilter(topic, stack, TALK_TYPE.Panel),
    getTalksByFilter(topic, stack, TALK_TYPE.QA),
    getTalksByFilter(topic, stack, TALK_TYPE.Workshop),
    getTalksByFilter(topic, stack, TALK_TYPE.Interview)
  ]);
  response.json({
    curatedTalks,
    hotTalks,
    risingTalks,
    topTalks,
    newTalks,
    recentlyAddedTalks,
    keynotes,
    lightningTalks,
    panels,
    qaSessions,
    workshops,
    interviews
  });
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
  hubContent,
  hub,
  indexTalk,
  justAddedEditions,
  justAddedTalks,
  likeTalk,
  newsletterSubscribe,
  recentEditions,
  recentTalks,
  risingTalks,
  saveTalkInUserProfile,
  ssrIndex,
  ssrAccount,
  ssrTop100,
  ssrCountry,
  ssrCurated,
  ssrEdition,
  ssrEvent,
  ssrHero,
  ssrPrivacyPolicy,
  ssrSaved,
  ssrStack,
  ssrTalk,
  ssrTermsOfService,
  ssrTopic,
  ssrYear,
  talk,
  talksByTopic,
  talksTop,
  unsaveTalkInUserProfile,
  upcomingEditions
};

export { heroes };
