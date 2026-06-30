import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "reliable-woodland-hgxqk",
  appId: "1:984630601246:web:7d2fbbe8e2adba6054700f",
  apiKey: "AIzaSyDN8ejrIXpP5lixfAX4s-1l7TuB2sYIdPM",
  authDomain: "reliable-woodland-hgxqk.firebaseapp.com",
  storageBucket: "reliable-woodland-hgxqk.firebasestorage.app",
  messagingSenderId: "984630601246",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, "ai-studio-ac1aa336-d4c4-41ec-b6d2-a386df03e3c3");
