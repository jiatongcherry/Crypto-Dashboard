import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);