import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const apiKey = import.meta.env.VITE_FIREBASE_APIKEY;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "food-delivery-b5272.firebaseapp.com",
  projectId: "food-delivery-b5272",
  storageBucket: "food-delivery-b5272.firebasestorage.app",
  messagingSenderId: "985128502569",
  appId: "1:985128502569:web:ce3958040f4779ed11a338",
};

let app = null;
let auth = null;

if (apiKey && typeof apiKey === "string" && apiKey.trim() !== "") {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
  } catch (error) {
    console.warn("[Firebase] Initialization failed:", error.message);
  }
}

export { auth };
export default app;