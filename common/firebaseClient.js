import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/firestore";

import { FIREBASE_CLIENT_CONFIG } from "config";

if (typeof window !== "undefined" && !firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CLIENT_CONFIG);
  firebase.analytics();
  // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
}

export default firebase;
export const auth = firebase.apps.length ? firebase.auth() : null;
export const firestore = firebase.apps.length ? firebase.firestore() : null;
