// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
