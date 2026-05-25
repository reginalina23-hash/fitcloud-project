


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 🔥 PUT YOUR FIREBASE CONFIG HERE
const firebaseConfig = {

apiKey: "AIzaSyDCeZLVFNSX7HVjCDu5k3EW_0Jm8ZWwVzo",
authDomain: "mobile-fitness-tracker-cbb21.firebaseapp.com",
projectId: "mobile-fitness-tracker-cbb21",
storageBucket: "mobile-fitness-tracker-cbb21.firebasestorage.app",
messagingSenderId: "745657768347",
appId: "1:745657768347:web:d2901d054b3e992009a93e"

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ================= REGISTER =================
window.register = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Account created!");
    window.location.href = "login.html";
  } catch (error) {
    alert(error.message);
  }
};

// ================= LOGIN =================
window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful!");
    window.location.href = "dashboard.html";
  } catch (error) {
    alert(error.message);
  }
};

// ================= FORGOT PASSWORD =================
window.resetPassword = async function () {
  const email = document.getElementById("email").value;

  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent!");
  } catch (error) {
    alert(error.message);
  }
};
