// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: "AIzaSyCq66HkTc854YDRxEF2S_DQfQ1_cKlQcdc",
  authDomain: "netflixgpt-52d6a.firebaseapp.com",
  projectId: "netflixgpt-52d6a",
  storageBucket: "netflixgpt-52d6a.firebasestorage.app",
  messagingSenderId: "1013209680319",
  appId: "1:1013209680319:web:fd1277101a065f00f8390a",
  measurementId: "G-M9RR2EZF0M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);