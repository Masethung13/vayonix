import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAC57rB_JoqVKtuWNk0vkqjthQ4w99wnUs",
  authDomain: "vayonix-info.firebaseapp.com",
  projectId: "vayonix-info",
  storageBucket: "vayonix-info.firebasestorage.app",
  messagingSenderId: "511578652582",
  appId: "1:511578652582:web:0f473ad8a22bf8edd6d967",
  measurementId: "G-W7Q1TB7ME0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
export const db = getFirestore(app);
export default app;