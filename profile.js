import { auth, db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/* =========================
   LOAD USER PROFILE SAFELY
========================= */
onAuthStateChanged(auth, async (user) => {

  // If not logged in → redirect
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  try {

    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      console.log("No profile data found for user");
      return;
    }

    const data = snap.data();

    // SAFE UI UPDATE (prevents null errors)
    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.innerText = value ?? "-";
    };

    setText("name", data.fullname);
    setText("age", data.age);
    setText("gender", data.gender);
    setText("weight", data.weight + " kg");
    setText("height", data.height + " cm");
    setText("goal", data.goal);
    setText("email", data.email);

  } catch (error) {
    console.log("PROFILE LOAD ERROR:", error);
  }
});

window.logout = async function () {

  await signOut(auth);

  sessionStorage.clear();
  localStorage.clear();

  window.location.href = "login.html";
};