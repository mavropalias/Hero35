import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import dotenv from "dotenv";
import { EventEdition, Talk } from "../schema";

dotenv.config();
const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET
};

class Database {
  auth: firebase.auth.Auth;
  db: firebase.firestore.Firestore;

  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    this.auth = firebase.auth();
    this.db = firebase.firestore();
  }

  // Auth API ------------------------------------------------------------------

  doCreateUserWithEmailAndPassword = (email: string, password: string) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email: string, password: string) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password: string) =>
    this.auth.currentUser.updatePassword(password);

  // User API ------------------------------------------------------------------

  user = (uid: string) => this.db.collection("users").doc(uid);

  // Content API ---------------------------------------------------------------

  // getEvent = async (eventId: string): Promise<Event> => {
  //   const docRef = await this.db.collection("events").doc(eventId);
  //   const docSnap = await docRef.get();
  //   let event: Event = (docSnap.data() as unknown) as Event;
  //   if (event) {
  //     event.editions = await this.getEventEditions(docRef);
  //   }
  //   return event;
  // };

  // getEventEditions = async (
  //   eventReference: firebase.firestore.DocumentReference
  // ): Promise<EventEdition[]> => {
  //   const querySnapshot = await eventReference.collection("editions").get();
  //   let editions: EventEdition[] = [];
  //   querySnapshot.forEach(doc => {
  //     editions.push((doc.data() as unknown) as EventEdition);
  //   });
  //   return editions;
  // };

  // getEdition = async (
  //   editionId: string,
  //   eventId: string
  // ): Promise<EventEdition> => {
  //   const docRef = await this.db
  //     .collection("events")
  //     .doc(eventId)
  //     .collection("editions")
  //     .doc(editionId);
  //   const docSnap = await docRef.get();
  //   let edition: EventEdition = (docSnap.data() as unknown) as EventEdition;
  //   if (edition) {
  //     edition.talks = await this.getEditionTalks(docRef);
  //   }
  //   return edition;
  // };

  // getEditionTalks = async (
  //   eventReference: firebase.firestore.DocumentReference
  // ): Promise<Talk[]> => {
  //   const querySnapshot = await eventReference.collection("talks").get();
  //   let talks: Talk[] = [];
  //   querySnapshot.forEach(doc => {
  //     talks.push((doc.data() as unknown) as Talk);
  //   });
  //   return talks;
  // };

  getRecentEditions = async (): Promise<EventEdition[]> => {
    const querySnapshot = await this.db
      .collectionGroup("editions")
      .where("status", "==", "published")
      .orderBy("endDate", "desc")
      .limit(6)
      .get();

    let editions: EventEdition[] = [];
    querySnapshot.forEach(doc => {
      editions.push((doc.data() as unknown) as EventEdition);
    });
    return editions;
    // return (querySnapshot.docs as unknown) as EventEdition[];
  };

  getTalks = async (): Promise<Talk[]> => {
    const querySnapshot = await this.db
      .collectionGroup("talks")
      .where("type", "==", "2")
      .orderBy("date", "desc")
      .orderBy("order", "desc")
      .limit(6)
      .get();
    let talks: Talk[] = [];
    querySnapshot.forEach(doc => {
      talks.push((doc.data() as unknown) as Talk);
    });
    return talks;
    // return (querySnapshot.docs as unknown) as Talk[];
  };
}

export default new Database();
