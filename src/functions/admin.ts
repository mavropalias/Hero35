import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// Init Firebase
admin.initializeApp();
export const db = admin.firestore();
