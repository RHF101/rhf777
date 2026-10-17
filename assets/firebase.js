// ============ HUBUNGAN KE FIREBASE ============
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

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

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Daftarkan ke jendela global agar bisa dipakai di file lain
window.fbAuth = auth;
window.fbDb = db;
window.fbGoogleProvider = googleProvider;
window.fbSignInGoogle = signInWithPopup;

console.log("Firebase siap digunakan!");

// Impor fungsi otentikasi tambahan
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// Impor fungsi database (Firestore)
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  getDocs 
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Daftarkan semua ke jendela global (window)
window.fbCreateUserWithEmailAndPassword = createUserWithEmailAndPassword;
window.fbSignInWithEmailAndPassword = signInWithEmailAndPassword;
window.fbSignOut = signOut;
window.fbOnAuthStateChanged = onAuthStateChanged;

window.fbDoc = doc;
window.fbGetDoc = getDoc;
window.fbSetDoc = setDoc;
window.fbUpdateDoc = updateDoc;
window.fbCollection = collection;
window.fbGetDocs = getDocs;

// Impor fungsi pengaturan database agar tidak offline
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Ganti inisialisasi database lama agar lebih stabil
window.fbDb = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
});
