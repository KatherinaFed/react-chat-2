import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAiNkmzVSkedhlX6AIzqBdVAXCfB8UZUls",
  authDomain: "chat-r2.firebaseapp.com",
  projectId: "chat-r2",
  storageBucket: "chat-r2.appspot.com",
  messagingSenderId: "272871622100",
  appId: "1:272871622100:web:7620e226efb4810d5cc241"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();