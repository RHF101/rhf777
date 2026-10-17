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

import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
window.fbResetPassword = sendPasswordResetEmail;

// ============ MESIN PENGATUR BANDAR (ZERO-SUM) ============
window.mainkanGame = async function(idPemain, taruhan, saldoSaatIni, peluangMenangGame = 50) {
  // 1. Ambil pengaturan bandar
  const snap = await window.fbGet(window.fbRef(window.fbDb, "pengaturan/bandar"));
  let target = 0;
  let dompetBandar = 0;
  let rtpDasar = 45; // Default jika admin belum atur

  if (snap.exists()) {
    const data = snap.val();
    target = Number(data.target) || 0;
    dompetBandar = Number(data.dompetBandar) || 0;
    rtpDasar = Number(data.rtpDasar) || 45;
  }

  // 2. Hitung Peluang Menang (Logika Transisi Halus)
  let peluangFinal = rtpDasar;
  if (target > 0) {
    // Jika uang terkumpul mendekati target, peluang menang dikecilkan perlahan
    const persentaseMendekatiTarget = (dompetBandar / target) * 100;
    if (persentaseMendekatiTarget >= 100) {
      peluangFinal = 5; // Jika target sudah penuh, peluang menang sangat kecil (5%)
    } else if (persentaseMendekatiTarget > 80) {
      peluangFinal = 15; // Jika sudah 80% target, peluang mengecil (15%)
    } else {
      peluangFinal = rtpDasar; // Masih normal
    }
  }

  // 3. Tentukan Hasil (Bandar vs Pemain)
  const roll = Math.random() * 100;
  let pemainMenang = roll <= peluangFinal;

  // 4. Update Saldo (Zero-Sum)
  let saldoBaru = saldoSaatIni;
  let updateBandar = dompetBandar;

  if (pemainMenang) {
    // Uang kemenangan diambil dari dompet bandar
    saldoBaru += taruhan; 
    updateBandar -= taruhan; // Dompet bandar berkurang
    if (updateBandar < 0) updateBandar = 0; // Dompet tidak boleh minus
  } else {
    // Pemain kalah, uang masuk ke dompet bandar
    saldoBaru -= taruhan;
    updateBandar += taruhan;
  }

  // 5. Simpan ke Database
  await window.fbUpdate(window.fbRef(window.fbDb, "users/" + idPemain), { balance: saldoBaru });
  await window.fbUpdate(window.fbRef(window.fbDb, "pengaturan/bandar"), { dompetBandar: updateBandar });

  return {
    menang: pemainMenang,
    saldoBaru: saldoBaru,
    peluang: peluangFinal,
    dompetBandar: updateBandar
  };
};
