// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDESi_Z6E3APCMr-M-w7_XaGxwvkE9X6sM",
  authDomain: "budget-friendly-553ef.firebaseapp.com",
  projectId: "budget-friendly-553ef",
  storageBucket: "budget-friendly-553ef.firebasestorage.app",
  messagingSenderId: "273221449739",
  appId: "1:273221449739:web:88469acba6a39e981f2f0e",
  measurementId: "G-CCXP0L9PKJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export Auth and Firestore instances
export const auth = getAuth(app);
export const db = getFirestore(app); // Export Firestore