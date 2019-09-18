import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Event, EventEdition, Talk } from "../schema";
import fetch from "isomorphic-unfetch";

const API = "https://hero35.com/api/";

const config = {
  apiKey: process.env.API_KEY || "AIzaSyCDkhN8TpWw5-5Ukn4cfPXI8ufjAxelcDA",
  authDomain: "heroes-9c313.firebaseapp.com",
  databaseURL: "https://heroes-9c313.firebaseio.com",
  projectId: "heroes-9c313",
  storageBucket: "heroes-9c313.appspot.com"
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

  getEvent = async (eventId: string): Promise<Event> => {
    const res = await fetch(`${API}event?id=${eventId}`);
    return ((await res.json()) as unknown) as Event;
  };

  getEdition = async (
    eventId: string,
    editionId: string
  ): Promise<EventEdition> => {
    const res = await fetch(
      `${API}edition?eventId=${eventId}&editionId=${editionId}`
    );
    return ((await res.json()) as unknown) as EventEdition;
  };

  getRecentEditions = async (): Promise<EventEdition[]> => {
    const res = await fetch(`${API}recentEditions`);
    return ((await res.json()) as unknown) as EventEdition[];
  };

  getTalk = async (
    eventId: string,
    editionId: string,
    talkId: string
  ): Promise<Talk> => {
    const res = await fetch(
      `${API}talk?eventId=${eventId}&editionId=${editionId}&talkId=${talkId}`
    );
    return ((await res.json()) as unknown) as Talk;
  };

  getRecentTalks = async (): Promise<Talk[]> => {
    const res = await fetch(`${API}recentTalks`);
    return ((await res.json()) as unknown) as Talk[];
  };
}

export default new Database();
