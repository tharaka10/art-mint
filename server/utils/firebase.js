import admin from "firebase-admin";
import path from "path";
import { fileURLToPath } from "url";

// For ESModules __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to service account JSON
const serviceAccountPath = path.join(__dirname, "../firebase-service-account.json");

// Initialize Firebase admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath),
  });
}

export const db = admin.firestore();
