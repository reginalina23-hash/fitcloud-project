import { db, auth } from "./firebase.js";

import {
  collection,
  onSnapshot,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


/* =========================
   CLOCK
========================= */
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


/* =========================
   LOAD CURRENT USER DASHBOARD
========================= */
function loadDashboard() {

  const user = auth.currentUser;

  if (!user) {
    console.log("No user logged in yet");
    return;
  }

  const q = query(
    collection(db, "workouts"),
    where("uid", "==", user.uid)
  );

  onSnapshot(q, (snap) => {

    let totalCal = 0;
    let totalTime = 0;

    snap.forEach(doc => {

      const data = doc.data();

      totalCal += Number(data.cal || 0);
      totalTime += Number(data.time || 0);
    });

    document.getElementById("cal").innerText =
      totalCal;

    document.getElementById("time").innerText =
      totalTime + " min";

    document.getElementById("count").innerText =
      snap.size;

    renderChart(totalCal, totalTime);
  });
}


/* =========================
   CHART
========================= */
let chart;

function renderChart(cal, time) {

  const ctx = document.getElementById("chart");

  if (!ctx) return;

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {

    type: "doughnut",

    data: {

      labels: [
        "Calories",
        "Workout Time"
      ],

      datasets: [{
        data: [cal, time],

        backgroundColor: [
          "#22c55e",
          "#3b82f6"
        ]
      }]
    },

    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}


/* =========================
   LOGOUT
========================= */
window.logout = async function () {

  await signOut(auth);

  sessionStorage.clear();
  localStorage.clear();

  window.location.href = "login.html";
};


/* =========================
   WAIT FOR LOGIN
========================= */
auth.onAuthStateChanged((user) => {

  if (user) {
    loadDashboard();
  }
});