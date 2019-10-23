import firebase from "firebase/app";
import "firebase/auth";
import { Event, EventEdition, Talk, TalkPreview, User } from "../schema";
import fetch from "isomorphic-unfetch";

// Use Firebase internal network address for SSR
const API =
  typeof window !== "undefined"
    ? "https://hero35.com/api/"
    : "https://heroes-9c313.web.app/api/";

const config = {
  apiKey: process.env.API_KEY || "AIzaSyCDkhN8TpWw5-5Ukn4cfPXI8ufjAxelcDA",
  authDomain: "heroes-9c313.firebaseapp.com",
  databaseURL: "https://heroes-9c313.firebaseio.com",
  projectId: "heroes-9c313",
  storageBucket: "heroes-9c313.appspot.com"
};

class Database {
  auth: firebase.auth.Auth;
  app: firebase.app.App;

  constructor() {
    if (!firebase.apps.length) {
      this.app = firebase.initializeApp(config);
    }

    this.auth = firebase.auth(firebase.app());
  }

  token = async () => {
    return await firebase.auth().currentUser.getIdToken();
  };

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

  getEditionsByCountry = async (country: string): Promise<EventEdition[]> => {
    const res = await fetch(`${API}editionsByCountry?id=${country}`);
    return ((await res.json()) as unknown) as EventEdition[];
  };

  getEditionsByYear = async (year: string): Promise<EventEdition[]> => {
    const res = await fetch(`${API}editionsByYear?id=${year}`);
    return ((await res.json()) as unknown) as EventEdition[];
  };

  getRecentEditions = async (): Promise<EventEdition[]> => {
    const res = await fetch(`${API}recentEditions`);
    return ((await res.json()) as unknown) as EventEdition[];
  };

  getUpcomingEditions = async (): Promise<EventEdition[]> => {
    const res = await fetch(`${API}upcomingEditions`);
    return ((await res.json()) as unknown) as EventEdition[];
  };

  getTalk = async (
    eventId: string,
    editionId: string,
    talkSlug: string
  ): Promise<Talk> => {
    const res = await fetch(
      `${API}talk?eventId=${eventId}&editionId=${editionId}&talkSlug=${talkSlug}`
    );
    return ((await res.json()) as unknown) as Talk;
  };

  getRecentTalks = async (): Promise<Talk[]> => {
    const res = await fetch(`${API}recentTalks`);
    return ((await res.json()) as unknown) as Talk[];
  };

  getHeroTalks = async (name: string): Promise<Talk[]> => {
    const res = await fetch(`${API}heroTalks?name=${encodeURIComponent(name)}`);
    return ((await res.json()) as unknown) as Talk[];
  };

  getCuratedTalks = async (records: number = 4): Promise<Talk[]> => {
    const res = await fetch(`${API}curatedTalks?records=${records}`);
    return ((await res.json()) as unknown) as Talk[];
  };

  getTalksByTopic = async (topic: string): Promise<Talk[]> => {
    const res = await fetch(`${API}talksByTopic?id=${topic}`);
    return ((await res.json()) as unknown) as Talk[];
  };

  getTalksByFilter = async (
    topic: string,
    curated: boolean,
    type: number = 2,
    orderBy: string = "dateTimestamp",
    sortOrder: string = "desc"
  ): Promise<Talk[]> => {
    const res = await fetch(
      `${API}filterTalks?topic=${topic}&curated=${curated}&type=${type}&orderBy=${orderBy}&sortOrder=${sortOrder}`
    );
    return ((await res.json()) as unknown) as Talk[];
  };

  // User API ------------------------------------------------------------------

  getUser = async () => {
    const token = await this.token();
    const res = await fetch(`${API}getUser?accessToken=${token}`);
    return (await (res.json() as unknown)) as User;
  };

  saveTalkInUserProfile = async (talkId: string) => {
    const token = await this.token();
    const res = await fetch(
      `${API}saveTalkInUserProfile?talkId=${talkId}&accessToken=${token}`
    );
    return (await (res.json() as unknown)) as User;
  };

  unsaveTalkInUserProfile = async (talkId: string) => {
    const token = await this.token();
    const res = await fetch(
      `${API}unsaveTalkInUserProfile?talkId=${talkId}&accessToken=${token}`
    );
    return (await (res.json() as unknown)) as User;
  };
}

export default new Database();
