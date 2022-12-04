import { initializeApp } from "firebase/app"
import { getFirestore } from "@firebase/firestore"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB9XrOTQ4_J5sIUYA3jedl7gzG0r_Dk42E",
  authDomain: "vintage-leaderboard.firebaseapp.com",
  projectId: "vintage-leaderboard",
  storageBucket: "vintage-leaderboard.appspot.com",
  messagingSenderId: "274851278452",
  appId: "1:274851278452:web:4129f31db052184e466b21",
  measurementId: "G-MC5W2GFZW3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app);
