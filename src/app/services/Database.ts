import firebase from "firebase/app";
import "firebase/auth";
import { Event, EventEdition, Talk, User } from "../schema";
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

  getEditionsByCountry = async (
    country: string,
    stackid: string = "-1"
  ): Promise<EventEdition[]> => {
    const res = await fetch(
      `${API}editionsByCountry?id=${country}&stackid=${stackid}`
    );
    return ((await res.json()) as unknown) as EventEdition[];
  };

  getEditionsByYear = async (
    year: string,
    stackid: string = "-1"
  ): Promise<EventEdition[]> => {
    const res = await fetch(
      `${API}editionsByYear?id=${year}&stackid=${stackid}`
    );
    return ((await res.json()) as unknown) as EventEdition[];
  };

  getRecentEditions = async (
    stackid: string = "-1"
  ): Promise<EventEdition[]> => {
    const res = await fetch(`${API}recentEditions?stackid=${stackid}`);
    return ((await res.json()) as unknown) as EventEdition[];
  };

  getJustAddedEditions = async (
    stackid: string = "-1"
  ): Promise<EventEdition[]> => {
    const res = await fetch(`${API}justAddedEditions?stackid=${stackid}`);
    return ((await res.json()) as unknown) as EventEdition[];
  };

  getUpcomingEditions = async (
    stackid: string = "-1"
  ): Promise<EventEdition[]> => {
    const res = await fetch(`${API}upcomingEditions?stackid=${stackid}`);
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

  getRecentTalks = async (stackid: string = "-1"): Promise<Talk[]> => {
    const res = await fetch(`${API}recentTalks?stackid=${stackid}`);
    return ((await res.json()) as unknown) as Talk[];
  };

  getRisingTalks = async (stackid: string = "-1"): Promise<Talk[]> => {
    const res = await fetch(`${API}risingTalks?stackid=${stackid}`);
    return ((await res.json()) as unknown) as Talk[];
  };

  getAddedTalks = async (stackid: string = "-1"): Promise<Talk[]> => {
    const res = await fetch(`${API}justAddedTalks?stackid=${stackid}`);
    return ((await res.json()) as unknown) as Talk[];
  };

  getHeroTalks = async (name: string): Promise<Talk[]> => {
    const res = await fetch(`${API}heroTalks?name=${encodeURIComponent(name)}`);
    return ((await res.json()) as unknown) as Talk[];
  };

  getCuratedTalks = async (stackid: string = "-1"): Promise<Talk[]> => {
    const res = await fetch(`${API}curatedTalks?stackid=${stackid}`);
    return ((await res.json()) as unknown) as Talk[];
  };

  getHotTalks = async (stackid: string = "-1"): Promise<Talk[]> => {
    const res = await fetch(`${API}hotTalks?stackid=${stackid}`);
    return ((await res.json()) as unknown) as Talk[];
  };

  getTopTalks = async (stackid: string = "-1"): Promise<Talk[]> => {
    const res = await fetch(`${API}topTalks?stackid=${stackid}`);
    return ((await res.json()) as unknown) as Talk[];
  };

  getTalksByTopic = async (
    topicid: string,
    stackid?: string
  ): Promise<Talk[]> => {
    const res = await fetch(
      `${API}talksByTopic?id=${topicid}&stackid=${stackid}`
    );
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
    if (!token || !talkId) return Promise.reject();
    const res = await fetch(
      `${API}saveTalkInUserProfile?talkId=${talkId}&accessToken=${token}`
    );
    return (await (res.json() as unknown)) as User;
  };

  unsaveTalkInUserProfile = async (talkId: string) => {
    const token = await this.token();
    if (!token || !talkId) return Promise.reject();
    const res = await fetch(
      `${API}unsaveTalkInUserProfile?talkId=${talkId}&accessToken=${token}`
    );
    return (await (res.json() as unknown)) as User;
  };

  likeTalk = async (talkId: string) => {
    const token = await this.token();
    if (!token || !talkId) return Promise.reject();
    const res = await fetch(
      `${API}likeTalk?talkId=${talkId}&accessToken=${token}`
    );
    return (await (res.json() as unknown)) as User;
  };

  dislikeTalk = async (talkId: string) => {
    const token = await this.token();
    if (!token || !talkId) return Promise.reject();
    const res = await fetch(
      `${API}dislikeTalk?talkId=${talkId}&accessToken=${token}`
    );
    return (await (res.json() as unknown)) as User;
  };
}

export default new Database();
