import * as functions from "firebase-functions";
import { TalkBasic, Talk } from "schema";

const CACHE_CONTROL = `public, max-age=${12 * 3600}, s-maxage=${12 * 3600}`;
const CACHE_CONTROL_LONG = `public, max-age=${24 * 3600}, s-maxage=${24 *
  3600}`;

// Middleware
const middleware = (
  req: functions.https.Request,
  res: functions.Response,
  cacheResponse?: boolean,
  longCache?: boolean
): [functions.https.Request, functions.Response, boolean] => {
  // Disallow requests from foreign origins
  let approved = false;
  if (
    !["hero35.com", "heroes-9c313.web.app", "localhost"].includes(
      req.headers["x-forwarded-host"] as string
    )
  ) {
    res.set("Access-Control-Allow-Origin", "https://hero35.com");
  } else {
    approved = true;
    res.set({
      "Access-Control-Allow-Origin": "*"
    });
    if (cacheResponse) {
      res.set({
        "Cache-control": longCache ? CACHE_CONTROL_LONG : CACHE_CONTROL
      });
    }
  }
  return [req, res, approved];
};

const queryDocumentSnapshotToTalkBasic = (
  docSnapshot: FirebaseFirestore.QueryDocumentSnapshot
): TalkBasic => {
  const {
    categories,
    coverImage,
    curationDescription,
    editionId,
    editionTitle,
    eventId,
    eventTitle,
    id,
    isCurated,
    slug,
    speaker,
    tags,
    title,
    youtubeId
  } = (docSnapshot.data() as unknown) as Talk;
  return {
    categories,
    coverImage,
    curationDescription,
    editionId,
    editionTitle,
    eventId,
    eventTitle,
    id,
    isCurated,
    slug,
    speaker,
    tags,
    title,
    youtubeId
  };
};

const talkToTalkBasic = (talk: Talk): TalkBasic => {
  const {
    categories,
    coverImage,
    curationDescription,
    editionId,
    editionTitle,
    eventId,
    eventTitle,
    id,
    isCurated,
    slug,
    speaker,
    tags,
    title,
    youtubeId
  } = talk;
  return {
    categories,
    coverImage,
    curationDescription,
    editionId,
    editionTitle,
    eventId,
    eventTitle,
    id,
    isCurated,
    slug,
    speaker,
    tags,
    title,
    youtubeId
  };
};

const querySnapshotToTalkBasicArray = (
  snapshot: FirebaseFirestore.QuerySnapshot
): TalkBasic[] => {
  let talks: TalkBasic[] = [];
  snapshot.forEach(doc => {
    talks.push(queryDocumentSnapshotToTalkBasic(doc));
  });
  return talks;
};

const querySnapshotToTalkArray = (
  snapshot: FirebaseFirestore.QuerySnapshot
): Talk[] => {
  let talks: Talk[] = [];
  snapshot.forEach(doc => {
    talks.push((doc.data() as unknown) as Talk);
  });
  return talks;
};

const talkArrayToTalkBasicArray = (talks: Talk[]): TalkBasic[] => {
  let talksBasic: TalkBasic[] = [];
  talks.forEach(talk => {
    talksBasic.push(talkToTalkBasic(talk));
  });
  return talksBasic;
};

const shuffleArray = (array: any[]): any[] =>
  [...array].sort(() => Math.random() - 0.5);

export default {
  querySnapshotToTalkArray,
  querySnapshotToTalkBasicArray,
  middleware,
  shuffleArray,
  talkArrayToTalkBasicArray
};
