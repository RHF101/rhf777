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




// ============ MESIN BANDAR KASINO (MUTLAK & MENYEBAR) ============
window.mainkanGame = async function(idPemain, taruhan, saldoPemain, peluangMenangGame = 50) {
  const snapBandar = await window.fbGet(window.fbRef(window.fbDb, "pengaturan/bandar"));
  let target = 0;
  let dompetTerkunci = 0;
  let dompetPembayar = 0;
  let resetTime = Date.now();

  if (snapBandar.exists()) {
    const data = snapBandar.val();
    target = Number(data.target) || 0;
    dompetTerkunci = Number(data.dompetBandar) || 0; // Dompet mutlak
    dompetPembayar = Number(data.dompetPembayar) || 0; // Dompet sirkulasi
    resetTime = data.resetTime || Date.now();
  }

  // 1. Cek Waktu Reset 24 Jam
  const bedaJam = (Date.now() - resetTime) / (1000 * 60 * 60);
  if (dompetTerkunci >= target && bedaJam >= 24) {
    // Reset jika sudah 24 jam
    dompetTerkunci = 0;
    dompetPembayar = 0;
    await window.fbUpdate(window.fbRef(window.fbDb, "pengaturan/bandar"), { 
      dompetBandar: 0, 
      dompetPembayar: 0,
      resetTime: Date.now()
    });
  }

  let pemainMenang = false;
  let updateDompetTerkunci = dompetTerkunci;
  let updateDompetPembayar = dompetPembayar;
  let pesan = "";

  // 2. Logika Mutlak: Jika Dompet Belum Penuh, Pemain PASTI Kalah
  if (target > 0 && dompetTerkunci < target) {
    pemainMenang = false;
    updateDompetTerkunci += taruhan; // Uang masuk ke dompet terkunci
    pesan = "KALAH! Target bandar belum tercapai.";
  } 
  // 3. Logika Setelah Target Penuh (Sirkulasi)
  else {
    // Jika target sudah penuh, baru pemain boleh menang.
    // Peluang menang dibuat menyebar (misal 50%)
    const roll = Math.random() * 100;
    pemainMenang = roll <= 50;

    if (pemainMenang) {
      // Menang: Diambil dari dompetPembayar (uang pemain lain yang kalah)
      
    // PEMBATAS KEMENANGAN: Pemain maksimal hanya bisa menang 5x dari taruhannya
    // agar kas sirkulasi tidak disedot habis oleh satu orang
    let untung = taruhan; 
    let batasMaksimal = taruhan * 5; // Kamu bisa ubah angka 5 ini nanti
    
    if (untung > batasMaksimal) untung = batasMaksimal;

    if (updateDompetPembayar >= untung) {
        updateDompetPembayar -= untung;
        pesan = "MENANG! +" + untung;
      } else {
        untung = updateDompetPembayar;
        updateDompetPembayar = 0;
        pesan = "MENANG (Sisa Kas)! +" + untung;
        saldoPemain += untung - taruhan; // Penyesuaian
      }
    } else {
      // Kalah: Uang masuk ke dompetPembayar untuk diputar ke pemain lain
      updateDompetPembayar += taruhan;
      pesan = "KALAH! Uang masuk ke kas sirkulasi.";
    }
  }

  // 4. Hitung Saldo Akhir
  let saldoBaru = saldoPemain;
  if (pemainMenang) {
    saldoBaru += taruhan; // Dapat untung
  } else {
    saldoBaru -= taruhan; // Kalah
  }

  // 5. Simpan ke Database
  await window.fbUpdate(window.fbRef(window.fbDb, "users/" + idPemain), { balance: saldoBaru });
  
  await window.fbUpdate(window.fbRef(window.fbDb, "pengaturan/bandar"), { 
    dompetBandar: updateDompetTerkunci,
    dompetPembayar: updateDompetPembayar
  });

  return {
    menang: pemainMenang,
    saldoBaru: saldoBaru,
    pesan: pesan
  };
};
