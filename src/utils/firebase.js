// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXIFLPkApzgOAdjKP-uSASvLw9-PpKj98",
  authDomain: "netflixgpt-c43a3.firebaseapp.com",
  projectId: "netflixgpt-c43a3",
  storageBucket: "netflixgpt-c43a3.firebasestorage.app",
  messagingSenderId: "939748997537",
  appId: "1:939748997537:web:00c224201f0d88b387f3e0",
  measurementId: "G-QYCM9LLEJJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();


