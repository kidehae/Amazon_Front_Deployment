// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgc9b7Mu1PPGqhJHkmaJuVOVbdIL76pjc",
  authDomain: "clone-45927.firebaseapp.com",
  projectId: "clone-45927",
  storageBucket: "clone-45927.appspot.com", // Corrected storage bucket format
  messagingSenderId: "360915385871",
  appId: "1:360915385871:web:ab55cb2d43626ba4502d7a", // Using the newer appId from your first version
  measurementId: "G-N5K2ZDVJD5", // Using the newer measurementId from your first version
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only if supported (avoids errors in non-browser environments)
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) analytics = getAnalytics(app);
  });
}

// Initialize other services
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, analytics };
