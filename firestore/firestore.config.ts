import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDhD6mRNdCkdHSaxQsD-g9Gc2ZWYkIAxLs",
  authDomain: "kalkulator-panen-padi.firebaseapp.com",
  projectId: "kalkulator-panen-padi",
  storageBucket: "kalkulator-panen-padi.firebasestorage.app",
  messagingSenderId: "1057208877378",
  appId: "1:1057208877378:web:c55a3c3150ebf65f8948db",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
