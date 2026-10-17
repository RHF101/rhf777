import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getDatabase, ref, set, get, child, update, remove, onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB-6xbQLaV7gBUxu3xXqJkp_8_6Yu1oAKE",
  authDomain: "rhf777-44bc1.firebaseapp.com",
  databaseURL: "https://rhf777-44bc1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "rhf777-44bc1",
  storageBucket: "rhf777-44bc1.firebasestorage.app",
  messagingSenderId: "819275932186",
  appId: "1:819275932186:web:b6dda67391347cc8cd67a3",
  measurementId: "G-6GQD1EE5RH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app); // Ganti ke Realtime Database
const googleProvider = new GoogleAuthProvider();

// Daftarkan ke jendela global
window.fbAuth = auth;
window.fbDb = db;
window.fbGoogleProvider = googleProvider;
window.fbSignInGoogle = signInWithPopup;
window.fbCreateUserWithEmailAndPassword = createUserWithEmailAndPassword;
window.fbSignInWithEmailAndPassword = signInWithEmailAndPassword;
window.fbSignOut = signOut;
window.fbOnAuthStateChanged = onAuthStateChanged;

// Fungsi khusus Realtime Database
window.fbRef = ref;
window.fbSet = set;
window.fbGet = get;
window.fbChild = child;
window.fbUpdate = update;
window.fbRemove = remove;
window.fbOnValue = onValue;

console.log("Firebase Realtime Database siap!");
