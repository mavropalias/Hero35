import { observable, action, computed, reaction, autorun, when } from "mobx";
import { TalkBasic } from "../schema";
import Database from "../services/Database";
import firebase from "firebase/app";

// Declare global variables
declare const FS: any;
declare const gtag: any;

// Check if the user has been redirected to the app, after choosing email login
let forceShouldSignIn = false;
if (typeof window !== "undefined") {
  const url = new URL(window.location.href);
  const mode = url.searchParams.get("mode");
  if (mode === "select") forceShouldSignIn = true;
}

export class UserStore {
  // Properties
  // ---------------------------------------------------------------------------
  @observable email: string = "";
  @observable dislikedTalks: string[] = [];
  @observable isSignedIn: boolean = false;
  @observable isHydrated: boolean = false;
  @observable likedTalks: string[] = [];
  @observable name: string = "";
  @observable picture: string = "";
  @observable savedTalks: TalkBasic[] = [];
  @observable shouldSignIn: boolean = false;

  // Computed properties
  // ---------------------------------------------------------------------------

  isTalkLiked(talkId: string) {
    return computed(
      () => !!this.likedTalks?.find(likedTalkId => likedTalkId === talkId)
    ).get();
  }

  isTalkSaved(talkId: string) {
    return computed(
      () => !!this.savedTalks?.find(talk => talk.id === talkId)
    ).get();
  }

  // Store methods
  // ---------------------------------------------------------------------------
  constructor() {
    this.shouldSignIn = forceShouldSignIn;
    when(
      () => !!firebase.auth && typeof window !== "undefined",
      () => this.hydrateStore()
    );
  }

  private hydrateStore() {
    if (firebase.auth) {
      this.isHydrated = true;
      firebase.auth().onAuthStateChanged(async user => {
        if (!!user) {
          if (!this.isSignedIn) {
            this.name = user.displayName;
            this.email = user.email;
            this.picture = user.photoURL;
            this.setIsSignedIn(true);
            if (typeof FS !== "undefined") {
              FS.identify(user.uid);
            }
            if (typeof gtag !== "undefined") {
              gtag("set", { user_id: user.uid });
            }
          }
          const updatedUser = await Database.getUser();
          this.savedTalks = updatedUser.savedTalks || [];
          this.likedTalks = updatedUser.likedTalks || [];
          this.dislikedTalks = updatedUser.dislikedTalks || [];
        } else {
          this.setIsSignedIn(false);
          if (typeof FS !== "undefined") {
            FS.identify(false);
          }
          if (typeof gtag !== "undefined") {
            gtag("set", { user_id: null });
          }
        }
      });
    }
  }

  // Reactions
  // ---------------------------------------------------------------------------

  // Actions
  // ---------------------------------------------------------------------------

  @action private setIsSignedIn(signedIn: boolean) {
    this.isSignedIn = signedIn;
    signedIn && this.setShouldSignIn(false);
  }

  @action private setName(name: string) {
    this.name = name;
  }

  @action setShouldSignIn(status: boolean) {
    this.shouldSignIn = status;
  }

  @action async likeTalk(talkId: string) {
    if (!this.isSignedIn) {
      this.shouldSignIn = true;
      return;
    }
    if (this.isTalkLiked(talkId)) {
      return;
    }
    try {
      this.likedTalks.push(talkId);
      const updatedUser = await Database.likeTalk(talkId);
      this.likedTalks = updatedUser.likedTalks;
    } catch (e) {
      const index = this.likedTalks.findIndex(t => t === talkId);
      this.likedTalks.splice(index, 1);
    }
  }

  @action async saveTalk(talk: TalkBasic) {
    if (!this.isSignedIn) {
      this.shouldSignIn = true;
      return;
    }
    if (this.isTalkSaved(talk.id)) {
      return;
    }
    try {
      this.savedTalks.push(talk);
      const updatedUser = await Database.saveTalkInUserProfile(talk.id);
      this.savedTalks = updatedUser.savedTalks;
    } catch (e) {
      const index = this.savedTalks.findIndex(t => t.id === talk.id);
      this.savedTalks.splice(index, 1);
    }
  }

  @action async unsaveTalk(talk: TalkBasic) {
    if (!this.isTalkSaved(talk.id)) {
      return;
    }
    try {
      const index = this.savedTalks.findIndex(t => t.id === talk.id);
      this.savedTalks.splice(index, 1);
      const updatedUser = await Database.unsaveTalkInUserProfile(talk.id);
      this.savedTalks = updatedUser.savedTalks;
    } catch (e) {
      this.savedTalks.push(talk);
    }
  }
}
