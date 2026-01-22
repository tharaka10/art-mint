// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//     apiKey: "AIzaSyDAsmCIXGkChqz--m-3Kb70B2ICv3JBLLk",
//     authDomain: "nfthrive-8d704.firebaseapp.com",
//     projectId: "nfthrive-8d704",
//     storageBucket: "nfthrive-8d704.firebasestorage.app",
//     messagingSenderId: "941067083783",
//     appId: "1:941067083783:web:c8e0a21a6062b698b74aa2",
//     measurementId: "G-6KVY5D31NW"
//   };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import {
  initializeFirestore,
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAsmCIXGkChqz--m-3Kb70B2ICv3JBLLk",
  authDomain: "nfthrive-8d704.firebaseapp.com",
  projectId: "nfthrive-8d704",
  storageBucket: "nfthrive-8d704.firebasestorage.app",
  messagingSenderId: "941067083783",
  appId: "1:941067083783:web:c8e0a21a6062b698b74aa2",
  measurementId: "G-6KVY5D31NW",
};

// ✅ Make sure Firebase app is created only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ⛔ initializeFirestore only once
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
