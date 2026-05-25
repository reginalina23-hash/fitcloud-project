import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  setDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ================= REGISTER ================= */
window.register = async function () {
  try {
    console.log("REGISTER CLICKED"); // 👈 check if button works

    const fullname = document.getElementById("fullname").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value;
    const goal = document.getElementById("goal").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Email and password required");
      return;
    }

    console.log("Creating user...");

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log("User created:", user.uid);

    await setDoc(doc(db, "users", user.uid), {
      fullname,
      age,
      gender,
      weight,
      height,
      goal,
      email,
      createdAt: new Date()
    });

    console.log("Saved to Firestore");

    alert("Account created!");

    window.location.href = "login.html";

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    alert(error.message);
  }
};

/* ================= LOGIN ================= */
window.login = async function () {
  try {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    await signInWithEmailAndPassword(auth, email, password);

    sessionStorage.setItem("loggedIn", "true");

    window.location.href = "welcome.html";

  } catch (error) {
    alert(error.message);
  }
};

/* ================= RESET ================= */
window.resetPassword = async function () {
  const email = document.getElementById("email").value;
  await sendPasswordResetEmail(auth, email);
  alert("Reset email sent");
};