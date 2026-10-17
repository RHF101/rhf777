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


// ============ MESIN PENGATUR BANDAR (KAS TERKUNCI) ============
window.mainkanGame = async function(idPemain, taruhan, saldoPemain, peluangMenangGame = 50) {
  const snapBandar = await window.fbGet(window.fbRef(window.fbDb, "pengaturan/bandar"));
  let target = 0;
  let dompetBandar = 0;
  let rtpDasar = 45;

  if (snapBandar.exists()) {
    const data = snapBandar.val();
    target = Number(data.target) || 0;
    dompetBandar = Number(data.dompetBandar) || 0;
    rtpDasar = Number(data.rtpDasar) || 45;
  }

  // 1. Cek Apakah Dompet Bandar Penuh (Target Tercapai)
  let dompetPenuh = (target > 0 && dompetBandar >= target);

  // 2. Tentukan Peluang Menang
  let peluangFinal = rtpDasar;
  
  if (dompetPenuh) {
    // Jika dompet penuh, sistem berhenti "menahan". Pemain mulai bisa menang.
    // Peluang dinaikkan secara halus (misal jadi 55%)
    peluangFinal = 55; 
  } else {
    // Jika dompet belum penuh, sistem menahan kemenangan.
    // Peluang mengecil perlahan seiring dompet mendekati target.
    const persentase = (dompetBandar / target) * 100;
    if (persentase > 80) peluangFinal = 10; // Sangat susah menang jika hampir penuh
    else if (persentase > 50) peluangFinal = 25; // Susah menang
    else peluangFinal = rtpDasar; // Normal di awal
  }

  // 3. Tentukan Hasil
  const roll = Math.random() * 100;
  let pemainMenang = roll <= peluangFinal;

  // 4. Logika Uang (Zero-Sum & Batas Saldo)
  let saldoBaru = saldoPemain;
  let updateBandar = dompetBandar;
  let pesanKhusus = "";

  if (pemainMenang) {
    let kemenangan = taruhan; // Asumsi menang dapat 2x taruhan (modal + untung)
    let untungPemain = taruhan; 

    // Cek apakah dompet bandar cukup untuk membayar
    if (dompetBandar >= untungPemain) {
      saldoBaru += untungPemain;
      updateBandar -= untungPemain;
      pesanKhusus = "MENANG! +" + untungPemain;
    } else {
      // Jika dompet bandar tidak cukup, pemain hanya dapat sisa dompet
      let sisaDompet = dompetBandar;
      saldoBaru += sisaDompet;
      updateBandar = 0;
      pesanKhusus = "MENANG (Sisa Kas)! +" + sisaDompet;
    }
  } else {
    // Pemain kalah
    saldoBaru -= taruhan;
    updateBandar += taruhan;
    pesanKhusus = "KALAH! -" + taruhan;
  }

  // 5. Simpan ke Database
  await window.fbUpdate(window.fbRef(window.fbDb, "users/" + idPemain), { balance: saldoBaru });
  
  // Jika dompet baru saja penuh, catat waktu resetnya
  let waktuReset = (dompetPenuh && updateBandar < target) ? Date.now() : (snapBandar.exists() ? snapBandar.val().resetTime : Date.now());
  
  await window.fbUpdate(window.fbRef(window.fbDb, "pengaturan/bandar"), { 
    dompetBandar: updateBandar,
    resetTime: waktuReset
  });

  return {
    menang: pemainMenang,
    saldoBaru: saldoBaru,
    peluang: peluangFinal,
    pesan: pesanKhusus,
    dompetPenuh: dompetPenuh
  };
};
