import { TalkBasic, Talk } from "schema";

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

export default {
  querySnapshotToTalkArray,
  querySnapshotToTalkBasicArray,
  talkArrayToTalkBasicArray
};
