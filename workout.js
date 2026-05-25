import { auth, db } from "./firebase.js";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* =========================
   SAVE WORKOUT (USER BASED)
========================= */
window.saveWorkout = async function () {

  try {

    const user = auth.currentUser;

    if (!user) {
      alert("Not logged in");
      return;
    }

    const type = document.getElementById("type").value;
    const duration = Number(document.getElementById("duration").value);
    const calories = Number(document.getElementById("calories").value);

    if (!type || !duration || !calories) {
      alert("Please fill all fields");
      return;
    }

    await addDoc(collection(db, "workouts"), {
      uid: user.uid,           // ⭐ IMPORTANT (separate users)
      type,
      time: duration,
      cal: calories,
      createdAt: new Date()
    });

    document.getElementById("message").innerText = "Workout saved ✅";

    document.getElementById("type").value = "";
    document.getElementById("duration").value = "";
    document.getElementById("calories").value = "";

  } catch (error) {
    console.log("SAVE ERROR:", error);
    alert(error.message);
  }
};


/* =========================
   LOAD ONLY CURRENT USER DATA
========================= */
function loadWorkoutStats() {

  const user = auth.currentUser;

  if (!user) {
    console.log("No user logged in yet");
    return;
  }

  const q = query(
    collection(db, "workouts"),
    where("uid", "==", user.uid)   // ⭐ KEY FIX
  );

  onSnapshot(q, (snap) => {

    let cal = 0;
    let time = 0;

    snap.forEach(doc => {
      const data = doc.data();
      cal += Number(data.cal || 0);
      time += Number(data.time || 0);
    });

    document.getElementById("totalWorkouts").innerText = snap.size;
    document.getElementById("totalCalories").innerText = cal;
    document.getElementById("totalTime").innerText = time + " min";
  });
}


/* =========================
   WAIT FOR LOGIN BEFORE LOAD
========================= */
auth.onAuthStateChanged((user) => {
  if (user) {
    loadWorkoutStats();
  }
});

window.logout = async function () {

  await signOut(auth);

  sessionStorage.clear();
  localStorage.clear();

  window.location.href = "login.html";
};

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