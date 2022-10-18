// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyClAEZBNYZM88t2fw2T-cDfEcxN5vB4qv0",
  authDomain: "chat-app-ff73f.firebaseapp.com",
  projectId: "chat-app-ff73f",
  storageBucket: "chat-app-ff73f.appspot.com",
  messagingSenderId: "141607201268",
  appId: "1:141607201268:web:dce5edb8c268622682b1a1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();