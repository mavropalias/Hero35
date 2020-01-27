import { db } from "../admin";
import * as admin from "firebase-admin";
import { EventEdition } from "../schema";

/**
 * Get hot Editions
 */
const getHotEditions = async (stackid?: string): Promise<EventEdition[]> => {
  const [justAdded, recent, upcoming] = await Promise.all([
    getJustAddedEditions(stackid),
    getRecentEditions(stackid),
    getUpcomingEditions(stackid)
  ]);
  let hotEditions = [...justAdded, ...recent, ...upcoming];
  // Remove duplicates + old confs
  let hotEditionIds = [];
  let oneYearAgo = new Date();
  oneYearAgo.setFullYear(new Date().getFullYear() - 1);
  hotEditions = hotEditions.filter(edition => {
    if (
      edition.dateTimestamp.seconds <
      admin.firestore.Timestamp.fromDate(oneYearAgo).seconds
    ) {
      return false;
    } else if (!hotEditionIds.includes(edition.eventId)) {
      hotEditionIds.push(edition.eventId);
      return true;
    } else {
      return false;
    }
  });
  return hotEditions;
};

/**
 * Get just added Editions
 */
const getJustAddedEditions = async stackid => {
  let query = db
    .collectionGroup("editions")
    .where("status", "==", "published")
    .orderBy("dateAddedTimestamp", "desc");
  if (stackid > 0) {
    query = query.where("categories", "array-contains", stackid);
  }
  query = query.limit(3);
  const docSnap = await query.get();
  let editions: EventEdition[] = [];
  docSnap.forEach(doc => {
    const edition = (doc.data() as unknown) as EventEdition;
    edition.isJustAdded = true;
    editions.push(edition);
  });
  return editions;
};

/**
 * Get recent Editions
 */
const getRecentEditions = async stackid => {
  let query = db
    .collectionGroup("editions")
    .where("status", "==", "published")
    .orderBy("dateTimestamp", "desc");
  if (stackid > 0) {
    query = query.where("categories", "array-contains", stackid);
  }
  query = query.limit(10);
  const docSnap = await query.get();
  let editions: EventEdition[] = [];
  docSnap.forEach(doc => {
    const edition = (doc.data() as unknown) as EventEdition;
    edition.isRecent = true;
    editions.push(edition);
  });
  return editions;
};

/**
 * Get upcoming Editions
 */
const getUpcomingEditions = async stackid => {
  let query = db
    .collectionGroup("editions")
    .where("status", "==", "published-notalks")
    .where("dateTimestamp", ">", admin.firestore.Timestamp.now());
  if (stackid > 0) {
    query = query.where("categories", "array-contains", stackid);
  }
  query = query.limit(3);
  const docSnap = await query.get();
  let editions: EventEdition[] = [];
  docSnap.forEach(doc => {
    const edition = (doc.data() as unknown) as EventEdition;
    edition.isUpcoming = true;
    editions.push(edition);
  });
  return editions;
};

export { getHotEditions };
