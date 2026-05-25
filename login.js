import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/* ================= REGISTER ================= */
window.register = async function () {
  try {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    await createUserWithEmailAndPassword(auth, email, password);

    alert("Account created!");
    window.location.href = "login.html";

  } catch (error) {
    alert(error.message);
  }
};

/* ================= LOGIN (FIXED) ================= */
window.login = async function () {
  try {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    await signInWithEmailAndPassword(auth, email, password);

    alert("Login success!");

    // IMPORTANT FIX HERE
    window.location.href = "dashboard.html";

  } catch (error) {
    alert(error.message);
  }
};

/* ================= RESET PASSWORD ================= */
window.resetPassword = async function () {
  try {
    const email = document.getElementById("email").value;

    await sendPasswordResetEmail(auth, email);

    alert("Reset email sent");

  } catch (error) {
    alert(error.message);
  }
};