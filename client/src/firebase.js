// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-corpsite.firebaseapp.com",
  projectId: "mern-corpsite",
  storageBucket: "mern-corpsite.appspot.com",
  messagingSenderId: "874152977540",
  appId: "1:874152977540:web:d918915680b9d97c3e8ed1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
