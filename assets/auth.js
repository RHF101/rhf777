// ============ HALAMAN MASUK DAN DAFTAR (FIREBASE) ============
(function() {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.id = 'authModal';
  
  // Desain form mewah dengan tombol Google
  modal.innerHTML = `
    <div class="modal-content" style="background: linear-gradient(180deg, #1a1a2e 0%, #14141f 100%); border: 1px solid #ffd70040; box-shadow: 0 10px 40px rgba(255, 215, 0, 0.15); padding: 24px;">
      <button class="modal-close" onclick="tutupAuth()" style="background:#2a2a3a; border-radius:5px; padding:4px 8px;">Tutup</button>

      <!-- TAMPILAN MASUK -->
      <div id="tampilanMasuk">
        <h3 style="color: #ffd700; text-align: center; margin-bottom: 20px; font-size: 22px;">MASUK</h3>
        
        <button onclick="masukGoogle()" class="btn" style="width:100%; background:#fff; color:#000; font-weight:bold; padding:12px; margin-bottom:16px; border-radius:6px; display:flex; align-items:center; justify-content:center; gap:8px;">
          <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Masuk dengan Google
        </button>

        <div style="text-align:center; color:#8b8b9e; margin-bottom:16px; font-size:12px;">── atau ──</div>

        <form id="formMasuk" onsubmit="prosesMasuk(event)">
          <div style="margin-bottom: 12px;">
            <label style="font-size: 12px; color: #8b8b9e; margin-bottom: 4px; display: block;">Alamat Surel</label>
            <input type="email" id="surelMasuk" placeholder="Masukkan surel Anda" required style="background: #0a0a0f; border: 1px solid #2a2a3a; color: #fff; padding: 12px; border-radius: 6px; width: 100%; outline: none;">
          </div>
          <div style="margin-bottom: 20px;">
            <label style="font-size: 12px; color: #8b8b9e; margin-bottom: 4px; display: block;">Kata Sandi</label>
            <input type="password" id="sandiMasuk" placeholder="Masukkan kata sandi" required style="background: #0a0a0f; border: 1px solid #2a2a3a; color: #fff; padding: 12px; border-radius: 6px; width: 100%; outline: none;">
          </div>
          <button type="submit" class="btn btn-gold" style="width:100%; padding: 12px; font-size: 14px;">MASUK</button>
        </form>
        <p style="text-align:center; margin-top:20px; font-size:13px; color:#8b8b9e;">
          Belum punya akun? <a href="#" onclick="tampilkanDaftar(); return false;" style="color:#ffd700; font-weight: bold;">DAFTAR DISINI</a>
        </p>
      </div>

      <!-- TAMPILAN DAFTAR -->
      <div id="tampilanDaftar" style="display:none;">
        <h3 style="color: #ffd700; text-align: center; margin-bottom: 20px; font-size: 22px;">DAFTAR AKUN</h3>
        <form id="formDaftar" onsubmit="prosesDaftar(event)">
          <div style="margin-bottom: 12px;">
            <label style="font-size: 12px; color: #8b8b9e; margin-bottom: 4px; display: block;">Nama Pengguna</label>
            <input type="text" id="namaPengguna" placeholder="Minimal 3 huruf" required minlength="3" style="background: #0a0a0f; border: 1px solid #2a2a3a; color: #fff; padding: 12px; border-radius: 6px; width: 100%; outline: none;">
          </div>
          <div style="margin-bottom: 12px;">
            <label style="font-size: 12px; color: #8b8b9e; margin-bottom: 4px; display: block;">Nomor Telepon / WA</label>
            <input type="tel" id="teleponDaftar" placeholder="08123456789" required style="background: #0a0a0f; border: 1px solid #2a2a3a; color: #fff; padding: 12px; border-radius: 6px; width: 100%; outline: none;">
          </div>
          <div style="margin-bottom: 12px;">
            <label style="font-size: 12px; color: #8b8b9e; margin-bottom: 4px; display: block;">Alamat Surel</label>
            <input type="email" id="surelDaftar" placeholder="email@contoh.com" required style="background: #0a0a0f; border: 1px solid #2a2a3a; color: #fff; padding: 12px; border-radius: 6px; width: 100%; outline: none;">
          </div>
          <div style="margin-bottom: 20px;">
            <label style="font-size: 12px; color: #8b8b9e; margin-bottom: 4px; display: block;">Kata Sandi</label>
            <input type="password" id="sandiDaftar" placeholder="Minimal 6 karakter" required minlength="6" style="background: #0a0a0f; border: 1px solid #2a2a3a; color: #fff; padding: 12px; border-radius: 6px; width: 100%; outline: none;">
          </div>
          <button type="submit" class="btn btn-gold" style="width:100%; padding: 12px; font-size: 14px;">DAFTAR</button>
        </form>
        <p style="text-align:center; margin-top:20px; font-size:13px; color:#8b8b9e;">
          Sudah punya akun? <a href="#" onclick="tampilkanMasuk(); return false;" style="color:#ffd700; font-weight: bold;">MASUK DISINI</a>
        </p>
      </div>

      <p id="pesanAuth" style="text-align:center; margin-top:16px; font-size:13px; min-height:18px;"></p>
    </div>
  `;
  document.body.appendChild(modal);

  // ============ BUKA TUTUP ============
  window.bukaAuth = function() { document.getElementById('authModal').classList.add('open'); };
  window.tutupAuth = function() { document.getElementById('authModal').classList.remove('open'); document.getElementById('pesanAuth').textContent = ''; };
  window.tampilkanMasuk = function() { document.getElementById('tampilanMasuk').style.display = 'block'; document.getElementById('tampilanDaftar').style.display = 'none'; };
  window.tampilkanDaftar = function() { document.getElementById('tampilanMasuk').style.display = 'none'; document.getElementById('tampilanDaftar').style.display = 'block'; };

  // ============ FUNGSI BANTU ============
  async function ambilAtauBuatProfil(user, namaTambahan = "") {
    const docRef = window.fbDoc(window.fbDb, "users", user.uid);
    const docSnap = await window.fbGetDoc(docRef);

    if (!docSnap.exists()) {
      const namaBaru = namaTambahan || user.displayName || user.email.split('@')[0];
      await window.fbSetDoc(docRef, {
        username: namaBaru,
        email: user.email,
        phone: "",
        balance: 1000,
        created_at: new Date().toISOString()
      });
      return { username: namaBaru, balance: 1000 };
    }
    return docSnap.data();
  }

  // ============ PROSES MASUK (EMAIL) ============
  window.prosesMasuk = async function(e) {
    e.preventDefault();
    const surel = document.getElementById('surelMasuk').value;
    const sandi = document.getElementById('sandiMasuk').value;
    const pesan = document.getElementById('pesanAuth');
    
    pesan.style.color = '#ffd700';
    pesan.textContent = 'Sedang memeriksa...';

    try {
      const userCredential = await window.fbSignInWithEmailAndPassword(window.fbAuth, surel, sandi);
      await ambilAtauBuatProfil(userCredential.user);
      
      pesan.style.color = '#00e701';
      pesan.textContent = 'Berhasil masuk!';
      setTimeout(() => { tutupAuth(); window.perbaruiSaldo(); window.periksaStatusTampilan(); }, 800);

    } catch (error) {
      pesan.style.color = '#ff3838';
      pesan.textContent = 'Gagal masuk: ' + error.message;
    }
  };

  // ============ PROSES MASUK (GOOGLE) ============
  window.masukGoogle = async function() {
    const pesan = document.getElementById('pesanAuth');
    pesan.style.color = '#ffd700';
    pesan.textContent = 'Menghubungkan ke Google...';

    try {
      const result = await window.fbSignInGoogle(window.fbAuth, window.fbGoogleProvider);
      await ambilAtauBuatProfil(result.user);
      
      pesan.style.color = '#00e701';
      pesan.textContent = 'Berhasil masuk!';
      setTimeout(() => { tutupAuth(); window.perbaruiSaldo(); window.periksaStatusTampilan(); }, 800);

    } catch (error) {
      pesan.style.color = '#ff3838';
      pesan.textContent = 'Gagal: ' + error.message;
    }
  };

  // ============ PROSES DAFTAR ============
  window.prosesDaftar = async function(e) {
    e.preventDefault();
    const nama = document.getElementById('namaPengguna').value;
    const telepon = document.getElementById('teleponDaftar').value;
    const surel = document.getElementById('surelDaftar').value;
    const sandi = document.getElementById('sandiDaftar').value;
    const pesan = document.getElementById('pesanAuth');

    pesan.style.color = '#ffd700';
    pesan.textContent = 'Sedang mendaftarkan...';

    try {
      const userCredential = await window.fbCreateUserWithEmailAndPassword(window.fbAuth, surel, sandi);
      
      // Simpan profil & telepon
      await window.fbSetDoc(window.fbDoc(window.fbDb, "users", userCredential.user.uid), {
        username: nama,
        email: surel,
        phone: telepon,
        balance: 1000,
        created_at: new Date().toISOString()
      });

      pesan.style.color = '#00e701';
      pesan.textContent = 'Berhasil daftar! Silakan masuk.';
      setTimeout(() => { tampilkanMasuk(); }, 1500);

    } catch (error) {
      pesan.style.color = '#ff3838';
      pesan.textContent = 'Gagal daftar: ' + error.message;
    }
  };

  // ============ KELUAR ============
  window.prosesKeluar = async function() {
    await window.fbSignOut(window.fbAuth);
    await window.perbaruiSaldo();
    await window.periksaStatusTampilan();
  };

  // ============ PERIKSA STATUS & SALDO ============
  window.perbaruiSaldo = function() {
    window.fbOnAuthStateChanged(window.fbAuth, async (user) => {
      const elSaldo = document.getElementById('balanceAmount');
      if (user) {
        const profil = await ambilAtauBuatProfil(user);
        if(elSaldo) elSaldo.textContent = Number(profil.balance).toLocaleString('id-ID');
      } else {
        if(elSaldo) elSaldo.textContent = '0';
      }
    });
  };

  window.periksaStatusTampilan = function() {
    window.fbOnAuthStateChanged(window.fbAuth, (user) => {
      const btnDaftar = document.querySelector('.header-actions .btn-gold');
      if (user) {
        if (btnDaftar) {
          btnDaftar.textContent = 'Akun';
          btnDaftar.onclick = () => window.bukaHalaman('akun');
        }
      } else {
        if (btnDaftar) {
          btnDaftar.textContent = 'Daftar';
          btnDaftar.onclick = () => { bukaAuth(); tampilkanDaftar(); };
        }
      }
    });
  };

  // Jalankan saat pertama dimuat
  window.perbaruiSaldo();
  window.periksaStatusTampilan();
})();
