import * as firebaseAdmin from "firebase-admin";

let cert = {};

if (process.env.FIREBASE_CREDS) {
  cert = JSON.parse(process.env.FIREBASE_CREDS);
} else {
  try {
    cert = require("sa.json"); // relative to project root path
  } catch (err) {
    // ignore
    console.log(err);
  }
}

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(cert),
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
  });
}

export default firebaseAdmin;
