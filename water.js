import { auth, db } from "./firebase.js";

import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


/* ================= CLOCK ================= */
function updateClock() {

  const now = new Date();

  let h = String(now.getHours()).padStart(2, '0');
  let m = String(now.getMinutes()).padStart(2, '0');
  let s = String(now.getSeconds()).padStart(2, '0');

  document.getElementById("clock").innerText =
    `${h}:${m}:${s}`;
}

setInterval(updateClock, 1000);
updateClock();


/* ================= LOAD WATER ================= */
function loadWater(user) {

  const q = query(
    collection(db, "water"),
    where("uid", "==", user.uid)
  );

  onSnapshot(q, (snap) => {

    let totalWater = 0;

    snap.forEach((doc) => {

      const data = doc.data();

      totalWater += Number(data.amount || 0);
    });

    // TOTAL WATER
    document.getElementById("todayWater").innerHTML =
      `<b>${totalWater} ml</b>`;

    // TOTAL GLASSES
    const glasses = totalWater / 250;

    document.getElementById("totalGlasses").innerText =
      glasses.toFixed(0);

    // STATUS
    let status = "Need more 💧";

    if (totalWater >= 2500) {
      status = "Perfect 💪";
    }
    else if (totalWater >= 2000) {
      status = "Good 👍";
    }

    document.getElementById("status").innerText = status;
  });
}


/* ================= ADD WATER ================= */
window.addWater = async function () {

  try {

    const user = auth.currentUser;

    if (!user) {
      alert("Please login first");
      return;
    }

    const amount = Number(
      document.getElementById("waterAmount").value
    );

    if (!amount || amount <= 0) {
      alert("Enter valid water amount");
      return;
    }

    await addDoc(collection(db, "water"), {

      uid: user.uid,
      amount: amount,
      createdAt: new Date()

    });

    document.getElementById("message").innerText =
      "Water added successfully ✅";

    document.getElementById("waterAmount").value = "";

  } catch (error) {

    console.log(error);
    alert(error.message);
  }
};


window.logout = async function () {

  await signOut(auth);

  sessionStorage.clear();
  localStorage.clear();

  window.location.href = "login.html";
};


/* ================= START ================= */
onAuthStateChanged(auth, (user) => {

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  loadWater(user);
});