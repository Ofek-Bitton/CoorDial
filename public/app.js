// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDF3hDo9jYXblBjBF0NvP3GlPtaNuvqwrw",
  authDomain: "coordial.firebaseapp.com",
  projectId: "coordial",
  storageBucket: "coordial.appspot.com",
  messagingSenderId: "251604251043",
  appId: "1:251604251043:web:b889ca4ddf68521735ea16",
  measurementId: "G-C6X4X9Q7SN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firebase = getAuth(app);