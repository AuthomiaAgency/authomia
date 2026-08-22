import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";

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

// Inicialización segura de App Check (solo en producción autorizada)
let appCheck: any = null;
if (typeof window !== "undefined") {
  try {
    const isProd = window.location.hostname === 'authomia.cloud' || window.location.hostname === 'www.authomia.cloud';
    if (isProd) {
      appCheck = initializeAppCheck(app, {
        provider: new ReCaptchaEnterpriseProvider('6LcZX5IsAAAAAM8Wa4TtF0lELSabzFUKtrzGFZNW'),
        isTokenAutoRefreshEnabled: true
      });
    }
  } catch (e) {
    // Graceful fallback if AppCheck is not reachable
  }
}

export const db = getFirestore(app);
export const auth = getAuth(app);
export { appCheck };

