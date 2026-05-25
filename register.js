import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


/* =========================
   REGISTER USER
========================= */
window.register = async function () {

  try {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // optional fields (if you have)
    const age = document.getElementById("age")?.value || "";
    const weight = document.getElementById("weight")?.value || "";

    if (!name || !email || !password) {
      alert("Please fill all required fields");
      return;
    }

    // 1. CREATE AUTH USER
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    // 2. SAVE PROFILE TO FIRESTORE
    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      age,
      weight,
      createdAt: new Date()
    });

    alert("Account created successfully!");

    // 3. REDIRECT TO LOGIN
    window.location.href = "login.html";

  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};