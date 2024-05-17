// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPdMEemlBV6t_9ikzOJFhimxDqV9Tmbtk",
  authDomain: "athenian-note-sharing.firebaseapp.com",
  projectId: "athenian-note-sharing",
  storageBucket: "athenian-note-sharing.appspot.com",
  messagingSenderId: "1018758836281",
  appId: "1:1018758836281:web:d8c6cee2306baedd8f9de8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);