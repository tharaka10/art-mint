import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAsmCIXGkChqz--m-3Kb70B2ICv3JBLLk",
  authDomain: "nfthrive-8d704.firebaseapp.com",
  projectId: "nfthrive-8d704",
  storageBucket: "nfthrive-8d704.firebasestorage.app",
  messagingSenderId: "941067083783",
  appId: "1:941067083783:web:c8e0a21a6062b698b74aa2",
  measurementId: "G-6KVY5D31NW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
const auth = getAuth(app);

signInAnonymously(auth)
  .then(() => console.log("✅ Signed in to Firebase anonymously"))
  .catch((error) => console.error("❌ Firebase auth error:", error));