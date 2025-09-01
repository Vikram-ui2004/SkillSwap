// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDNDzK1N4Ax9KR2XCthofDI_Mco5JU9jwg",
  authDomain: "skillswap-69646.firebaseapp.com",
  projectId: "skillswap-69646",
  storageBucket: "skillswap-69646.firebasestorage.app",
  messagingSenderId: "851253196428",
  appId: "1:851253196428:web:2a4a37a1f53594e1aeada9",
  measurementId: "G-ZKRK1RMWFH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Export services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
