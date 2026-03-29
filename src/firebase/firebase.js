// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCldD8sU5Bx4aCyHE5G6u9MaLhjsTYFwbw",
  authDomain: "personal-website-bbbe9.firebaseapp.com",
  projectId: "personal-website-bbbe9",
  storageBucket: "personal-website-bbbe9.firebasestorage.app",
  messagingSenderId: "647209869687",
  appId: "1:647209869687:web:14a123aef426326745c172",
  measurementId: "G-EGSDBCJGB3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize services
export const auth = getAuth(app);         // For authentication
export const db = getFirestore(app);      // For Firestore database

export default app;