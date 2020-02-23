import { db } from "../admin";
import { TalkBasic, Talk, TALK_TYPE } from "../schema";
import util from "../util/util";
import admin = require("firebase-admin");

export const getTalksCurated = async (
  topic?: string,
  stack?: string
): Promise<TalkBasic[]> => {
  let query = db.collectionGroup("talks");
  if (topic) {
    query = query.where("tags", "array-contains", topic);
  }
  if (!!stack) {
    query = query.where(`stacks.${stack}`, "==", "true");
  }
  const docSnap = await query
    .where("isCurated", "==", true)
    .orderBy("dateAddedTimestamp", "desc")
    .limit(30)
    .get();
  return util.shuffleArray(util.querySnapshotToTalkBasicArray(docSnap));
};

export const getTalksHot = async (
  topic?: string,
  stack?: string
): Promise<TalkBasic[]> => {
  let query = db.collectionGroup("talks");
  if (topic) {
    query = query.where("tags", "array-contains", topic);
  }
  if (!!stack) {
    query = query.where(`stacks.${stack}`, "==", "true");
  }
  const docSnap = await query
    .where("hasLikes", "==", true)
    .orderBy("dateAddedTimestamp", "desc")
    .limit(50)
    .get();
  let talks: Talk[] = util.querySnapshotToTalkArray(docSnap);
  talks.forEach(talk => {
    const score = talk.likes;
    const order = Math.log10(score);
    const seconds = Math.round(
      talk.dateAddedTimestamp.toDate().getTime() / 1000
    );
    // talks 10 days older will need 10x the amount of upvotes:
    talk.score = order + seconds / (10 * 24 * 60 * 60);
  });
  talks.sort((a, b) => b.score - a.score);
  talks = talks.slice(0, 30);
  return util.shuffleArray(util.talkArrayToTalkBasicArray(talks));
};

export const getTalksRising = async (
  topic?: string,
  stack?: string
): Promise<TalkBasic[]> => {
  let query = db.collectionGroup("talks");
  if (topic) {
    query = query.where("tags", "array-contains", topic);
  }
  if (!!stack) {
    query = query.where(`stacks.${stack}`, "==", "true");
  }
  const docSnap = await query
    .where("hasLikes", "==", true)
    .orderBy("dateAddedTimestamp", "desc")
    .limit(30)
    .get();
  return util.querySnapshotToTalkBasicArray(docSnap);
};

export const getTalksTop = async (
  topic?: string,
  stack?: string
): Promise<TalkBasic[]> => {
  let query = db.collectionGroup("talks");
  if (topic) {
    query = query.where("tags", "array-contains", topic);
  }
  if (!!stack) {
    query = query.where(`stacks.${stack}`, "==", "true");
  }
  const docSnap = await query
    .orderBy("likes", "desc")
    .limit(30)
    .get();
  return util.querySnapshotToTalkBasicArray(docSnap);
};

export const getTalksTopYear = async (): Promise<TalkBasic[]> => {
  let oneYearAgo: Date = new Date();
  oneYearAgo.setFullYear(new Date().getFullYear() - 1);
  let query = db.collectionGroup("talks");
  const docSnap = await query
    .where("hasLikes", "==", true)
    .where("dateTimestamp", ">", admin.firestore.Timestamp.fromDate(oneYearAgo))
    .get();
  const talks: Talk[] = util
    .querySnapshotToTalkArray(docSnap)
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 100);
  return util.talkArrayToTalkBasicArray(talks);
};

export const getTalksNew = async (
  topic?: string,
  stack?: string
): Promise<TalkBasic[]> => {
  let query = db.collectionGroup("talks");
  if (topic) {
    query = query.where("tags", "array-contains", topic);
  }
  if (!!stack) {
    query = query.where(`stacks.${stack}`, "==", "true");
  }
  const docSnap = await query
    .where("type", "==", TALK_TYPE.Talk)
    .orderBy("dateTimestamp", "desc")
    .limit(30)
    .get();
  return util.querySnapshotToTalkBasicArray(docSnap);
};

export const getTalksByFilter = async (
  topic?: string,
  stack?: string,
  type?: TALK_TYPE
): Promise<TalkBasic[]> => {
  let query = db.collectionGroup("talks");
  if (topic) {
    query = query.where("tags", "array-contains", topic);
  }
  if (!!stack) {
    query = query.where(`stacks.${stack}`, "==", "true");
  }
  if (type) {
    query = query.where("type", "==", type);
  }
  const docSnap = await query
    .orderBy("dateAddedTimestamp", "desc")
    .limit(30)
    .get();
  return util.querySnapshotToTalkBasicArray(docSnap);
};
