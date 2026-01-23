import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import {
  initializeFirestore,
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyCYDI8FgxMKAtVB3ClvDAEr-gzJm2bIEOI",
  authDomain: "artmint-df97c.firebaseapp.com",
  projectId: "artmint-df97c",
  storageBucket: "artmint-df97c.firebasestorage.app",
  messagingSenderId: "227823992744",
  appId: "1:227823992744:web:2405909a74e1e4567aa79d",
  measurementId: "G-1FQ3PZWWSC"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

let db;

try {
  db = initializeFirestore(app, {
    ignoreUndefinedProperties: true,
  });
} catch (e) {
  // If already initialized, get existing instance
  db = getFirestore(app);
}

// Auth
const auth = getAuth(app);
signInAnonymously(auth).then(() =>
  console.log("✅ Signed in to Firebase anonymously")
);

export { app, db, auth };
