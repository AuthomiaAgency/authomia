import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBa43RLBqnsyNCSLOjt_-wCmSI-WNTnedQ",
  authDomain: "authomia-db.firebaseapp.com",
  projectId: "authomia-db",
  storageBucket: "authomia-db.firebasestorage.app",
  messagingSenderId: "600659741150",
  appId: "1:600659741150:web:a8b0b858bba0022e96f54f",
  measurementId: "G-43XD4CYYBY"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
