import { TalkBasic, Talk } from "schema";

const queryDocumentSnapshotToTalkBasic = (
  docSnapshot: FirebaseFirestore.QueryDocumentSnapshot
): TalkBasic => {
  const {
    categories,
    editionId,
    editionTitle,
    eventId,
    eventTitle,
    id,
    isCurated,
    slug,
    tags,
    title
  } = (docSnapshot.data() as unknown) as Talk;
  return {
    categories,
    editionId,
    editionTitle,
    eventId,
    eventTitle,
    id,
    isCurated,
    slug,
    tags,
    title
  };
};

const talkToTalkBasic = (talk: Talk): TalkBasic => {
  const {
    categories,
    editionId,
    editionTitle,
    eventId,
    eventTitle,
    id,
    isCurated,
    slug,
    tags,
    title
  } = talk;
  return {
    categories,
    editionId,
    editionTitle,
    eventId,
    eventTitle,
    id,
    isCurated,
    slug,
    tags,
    title
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
    talks.push((doc as unknown) as Talk);
  });
  return talks;
};

const talkArrayToTalkBasicArray = (talks: Talk[]): TalkBasic[] => {
  let talksBasic: TalkBasic[] = [];
  talks.forEach(talk => {
    talksBasic.push(talkToTalkBasic(talk));
  });
  return [];
};

export default {
  querySnapshotToTalkArray,
  querySnapshotToTalkBasicArray,
  talkArrayToTalkBasicArray
};
