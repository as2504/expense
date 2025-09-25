import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7VYV0QCo3R6UXvEns9JFQz_XrouVId1I",
  authDomain: "scribbles-6288b.firebaseapp.com",
  projectId: "scribbles-6288b",
  storageBucket: "scribbles-6288b.firebasestorage.app",
  messagingSenderId: "335644628692",
  appId: "1:335644628692:web:5ff532eb881bb169258d41",
  measurementId: "G-DFLJQGSXKF"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
