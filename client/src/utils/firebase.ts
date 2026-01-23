import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYDI8FgxMKAtVB3ClvDAEr-gzJm2bIEOI",
  authDomain: "artmint-df97c.firebaseapp.com",
  projectId: "artmint-df97c",
  storageBucket: "artmint-df97c.firebasestorage.app",
  messagingSenderId: "227823992744",
  appId: "1:227823992744:web:2405909a74e1e4567aa79d",
  measurementId: "G-1FQ3PZWWSC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
const auth = getAuth(app);

signInAnonymously(auth)
  .then(() => console.log("✅ Signed in to Firebase anonymously"))
  .catch((error) => console.error("❌ Firebase auth error:", error));