// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: process.env.VITE_FIREBASE_API_KEY, //wont work if used in vite
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, //when used in vite
  authDomain: "social-media-app-e2c8a.firebaseapp.com",
  projectId: "social-media-app-e2c8a",
  storageBucket: "social-media-app-e2c8a.firebasestorage.app",
  messagingSenderId: "447133473146",
  appId: "1:447133473146:web:0396a9e44f55e5891c5ec3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
