// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCFsT9dBNlBnmAbCQSJcUah-V7oIkf19X4",
  authDomain: "crypto-c771f.firebaseapp.com",
  projectId: "crypto-c771f",
  storageBucket: "crypto-c771f.firebasestorage.app",
  messagingSenderId: "107126874925",
  appId: "1:107126874925:web:c8432a555d2dc4918229a4",
  measurementId: "G-HVDR8WVG41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, auth };