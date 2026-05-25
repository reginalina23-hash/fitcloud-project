import { auth, db } from "./firebase.js";
import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ================= CALCULATE BMI ================= */
window.calcBMI = async function () {

  const weightEl = document.getElementById("weight");
  const heightEl = document.getElementById("height");
  const resultEl = document.getElementById("bmiResult");

  const w = Number(weightEl?.value);
  const h = Number(heightEl?.value) / 100;

  if (!w || !h) {
    resultEl.innerHTML = "Please enter valid values";
    return;
  }

  const bmi = w / (h * h);

  const status =
    bmi < 18.5 ? "Underweight" :
    bmi < 25 ? "Normal" :
    bmi < 30 ? "Overweight" : "Obese";

  resultEl.innerHTML =
    `<b>BMI:</b> ${bmi.toFixed(2)} <br><b>Status:</b> ${status}`;

  /* ================= SAVE PER USER ================= */
  const user = auth.currentUser;

  if (user) {
    await addDoc(collection(db, "bmi"), {
      uid: user.uid,
      bmi: bmi,
      status: status,
      createdAt: new Date()
    });
  }
};