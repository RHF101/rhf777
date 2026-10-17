// ============ HALAMAN MASUK DAN DAFTAR PROFESIONAL ============
(function() {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.id = 'authModal';
  
  // Desain form mewah
  modal.innerHTML = `
    <div class="modal-content" style="background: linear-gradient(180deg, #1a1a2e 0%, #14141f 100%); border: 1px solid #ffd70040; box-shadow: 0 10px 40px rgba(255, 215, 0, 0.15); padding: 24px;">
      <button class="modal-close" onclick="tutupAuth()" style="background:#2a2a3a; border-radius:5px; padding:4px 8px;">Tutup</button>

      <!-- TAMPILAN MASUK -->
      <div id="tampilanMasuk">
        <h3 style="color: #ffd700; text-align: center; margin-bottom: 20px; font-size: 22px;">MASUK</h3>
        <form id="formMasuk" onsubmit="prosesMasuk(event)">
          <div style="margin-bottom: 12px;">
            <label style="font-size: 12px; color: #8b8b9e; margin-bottom: 4px; display: block;">Alamat Surel</label>
            <input type="email" id="surelMasuk" placeholder="Masukkan surel Anda" required style="background: #0a0a0f; border: 1px solid #2a2a3a; color: #fff; padding: 12px; border-radius: 6px; width: 100%; outline: none;">
          </div>
          <div style="margin-bottom: 20px;">
            <label style="font-size: 12px; color: #8b8b9e; margin-bottom: 4px; display: block;">Kata Sandi</label>
            <input type="password" id="sandiMasuk" placeholder="Masukkan kata sandi" required style="background: #0a0a0f; border: 1px solid #2a2a3a; color: #fff; padding: 12px; border-radius: 6px; width: 100%; outline: none;">
          </div>
          <button type="submit" class="btn btn-gold" style="width:100%; padding: 12px; font-size: 14px;">MASUK SEKARANG</button>
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
          <button type="submit" class="btn btn-gold" style="width:100%; padding: 12px; font-size: 14px;">DAFTAR SEKARANG</button>
        </form>
        <p style="text-align:center; margin-top:20px; font-size:13px; color:#8b8b9e;">
          Sudah punya akun? <a href="#" onclick="tampilkanMasuk(); return false;" style="color:#ffd700; font-weight: bold;">MASUK DISINI</a>
        </p>
      </div>

      <p id="pesanAuth" style="text-align:center; margin-top:16px; font-size:13px; min-height:18px;"></p>
    </div>
  `;
  document.body.appendChild(modal);

  // ============ BUKA DAN TUTUP JENDELA ============
  window.bukaAuth = function() { document.getElementById('authModal').classList.add('open'); };
  window.tutupAuth = function() { document.getElementById('authModal').classList.remove('open'); document.getElementById('pesanAuth').textContent = ''; };
  window.tampilkanMasuk = function() { document.getElementById('tampilanMasuk').style.display = 'block'; document.getElementById('tampilanDaftar').style.display = 'none'; };
  window.tampilkanDaftar = function() { document.getElementById('tampilanMasuk').style.display = 'none'; document.getElementById('tampilanDaftar').style.display = 'block'; };

  // ============ PROSES MASUK ============
  window.prosesMasuk = async function(e) {
    e.preventDefault();
    const surel = document.getElementById('surelMasuk').value;
    const sandi = document.getElementById('sandiMasuk').value;
    const pesan = document.getElementById('pesanAuth');
    
    pesan.style.color = '#ffd700';
    pesan.textContent = 'Sedang memeriksa...';

    const { error } = await window.penghubung.auth.signInWithPassword({ email: surel, password: sandi });

    if (error) {
      pesan.style.color = '#ff3838';
      pesan.textContent = 'Gagal masuk: ' + error.message;
      return;
    }

    pesan.style.color = '#00e701';
    pesan.textContent = 'Berhasil masuk!';
    
    setTimeout(async () => {
      tutupAuth();
      await window.perbaruiSaldo();
      await window.periksaStatusTampilan();
    }, 800);
  };

  
  // ============ PROSES DAFTAR ============
  window.prosesDaftar = async function(e) {
    e.preventDefault();
    const nama = document.getElementById("namaPengguna").value;
    const telepon = document.getElementById("teleponDaftar").value;
    const surel = document.getElementById("surelDaftar").value;
    const sandi = document.getElementById("sandiDaftar").value;
    const pesan = document.getElementById("pesanAuth");

    pesan.style.color = "#ffd700";
    pesan.textContent = "Sedang mendaftarkan...";

    // 1. Daftarkan email dan sandi ke sistem Supabase
    const { data, error } = await window.penghubung.auth.signUp({
      email: surel,
      password: sandi
    });

    if (error) {
      pesan.style.color = "#ff3838";
      pesan.textContent = "Gagal mendaftar: " + error.message;
      return;
    }

    // 2. Jika berhasil, simpan nama dan nomor telepon ke profil
    if (data && data.user) {
      await window.penghubung.from("profiles").update({
        username: nama,
        phone: telepon
      }).eq("id", data.user.id);
    }

    pesan.style.color = "#00e701";
    pesan.textContent = "Berhasil mendaftar! Silakan masuk.";

    setTimeout(() => {
      tampilkanMasuk();
      document.getElementById("surelMasuk").value = surel;
    }, 1500);
  };


  // ============ KELUAR ============
  window.prosesKeluar = async function() {
    await window.penghubung.auth.signOut();
    await window.perbaruiSaldo();
    await window.periksaStatusTampilan();
  };

  // ============ PERIKSA STATUS TAMPILAN ============
  window.periksaStatusTampilan = async function() {
    const data = await window.ambilProfil();
    const btnDaftar = document.querySelector('.header-actions .btn-gold');
    const btnDeposit = document.querySelector('.header-actions .btn-primary');

    if (data && data.user) {
      // Jika sudah login
      if (btnDaftar) {
        btnDaftar.textContent = 'Akun';
        btnDaftar.onclick = () => window.bukaHalaman('akun');
      }
    } else {
      // Jika belum login
      if (btnDaftar) {
        btnDaftar.textContent = 'Daftar';
        btnDaftar.onclick = () => { bukaAuth(); tampilkanDaftar(); };
      }
    }
  };

  // Jalankan pengecekan saat halaman dimuat
  window.periksaStatusTampilan();
})();
