import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDCeZLVFNSX7HVjCDu5k3EW_0Jm8ZWwVzo",
  authDomain: "mobile-fitness-tracker-cbb21.firebaseapp.com",
  projectId: "mobile-fitness-tracker-cbb21",
  storageBucket: "mobile-fitness-tracker-cbb21.firebasestorage.app",
  messagingSenderId: "745657768347",
  appId: "1:745657768347:web:d2901d054b3e992009a93e"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);