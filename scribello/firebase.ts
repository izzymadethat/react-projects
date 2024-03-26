// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDLJyfCDTyJrNu_5trIEFIrwsqhzuXE4Qs",
  authDomain: "bookbunny-56207.firebaseapp.com",
  projectId: "bookbunny-56207",
  storageBucket: "bookbunny-56207.appspot.com",
  messagingSenderId: "712700781036",
  appId: "1:712700781036:web:551aaabda53282dd4e20c9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
