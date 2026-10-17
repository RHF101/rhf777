// ============ HALAMAN MASUK DAN DAFTAR PROFESIONAL ============
(function() {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.id = 'authModal';
  
  // Desain form yang lebih mewah dan lengkap
  modal.innerHTML = `
    <div class="modal-content" style="background: linear-gradient(180deg, #1a1a2e 0%, #14141f 100%); border: 1px solid #ffd70040; box-shadow: 0 10px 40px rgba(255, 215, 0, 0.15);">
      <button class="modal-close" onclick="tutupAuth()">✕</button>

      <div id="tampilanMasuk">
        <h3 style="color: #ffd700; text-align: center; margin-bottom: 20px; font-size: 24px;">MASUK</h3>
        <form id="formMasuk" onsubmit="prosesMasuk(event)">
          <div style="margin-bottom: 12px;">
            <label style="font-size: 12px; color: #8b8b9e; margin-bottom: 4px; display: block;">Alamat Surel</label>
            <input type="email" id="surelMasuk" placeholder="Masukkan surel Anda" required style="background: #0a0a0f; border: 1px solid #2a2a3a; color: #fff; padding: 12px; border-radius: 6px; width: 100%; outline: none;">
          </div>
          <div style="margin-bottom: 20px;">
            <label style="font-size: 12px; color: #8b8b9e; margin-bottom: 4px; display: block;">Kata Sandi</label>
            <input type="password" id="sandiMasuk" placeholder="Masukkan kata sandi" required style="background: #0a0a0f; border: 1px solid #2a2a3a; color: #fff; padding: 12px; border-radius: 6px; width: 100%; outline: none;">
          </div>
          <button type="submit" class="btn btn-gold" style="width:100%; padding: 14px; font-size: 16px;">MASUK SEKARANG</button>
        </form>
        <p style="text-align:center; margin-top:20px; font-size:13px; color:#8b8b9e;">
          Belum punya akun? <a href="#" onclick="tampilkanDaftar(); return false;" style="color:#ffd700; font-weight: bold;">DAFTAR DISINI</a>
        </p>
      </div>

      <div id="tampilanDaftar" style="display:none;">
        <h3 style="color: #ffd700; text-align: center; margin-bottom: 20px; font-size: 24px;">DAFTAR AKUN</h3>
        <form id="formDaftar" onsubmit="prosesDaftar(event)">
          <div style="margin-bottom: 12px;">
            <label style="font-size: 12px; color: #8b8b9e; margin-bottom: 4px; display: block;">Nama Lengkap / Pengguna</label>
            <input type="text" id="namaPengguna" placeholder="Minimal 3 huruf" required minlength="3" style="background: #0a0a0f; border: 1px solid #2a2a3a; color: #fff; padding: 12px; border-radius: 6px; width: 100%; outline: none;">
          </div>
          <div style="margin-bottom: 12px;">
            <label style="font-size: 12px; color: #8b8b9e; margin-bottom: 4px; display: block;">Nomor Telepon / WhatsApp</label>
            <input type="tel" id="teleponDaftar" placeholder="Contoh: 08123456789" required style="background: #0a0a0f; border: 1px solid #2a2a3a; color: #fff; padding: 12px; border-radius: 6px; width: 100%; outline: none;">
          </div>
          <div style="margin-bottom: 12px;">
            <label style="font-size: 12px; color: #8b8b9e; margin-bottom: 4px; display: block;">Alamat Surel (Email)</label>
            <input type="email" id="surelDaftar" placeholder="email@contoh.com" required style="background: #0a0a0f; border: 1px solid #2a2a3a; color: #fff; padding: 12px; border-radius: 6px; width: 100%; outline: none;">
          </div>
          <div style="margin-bottom: 20px;">
            <label style="font-size: 12px; color: #8b8b9e; margin-bottom: 4px; display: block;">Kata Sandi</label>
            <input type="password" id="sandiDaftar" placeholder="Minimal 6 karakter" required minlength="6" style="background: #0a0a0f; border: 1px solid #2a2a3a; color: #fff; padding: 12px; border-radius: 6px; width: 100%; outline: none;">
          </div>
          <button type="submit" class="btn btn-gold" style="width:100%; padding: 14px; font-size: 16px;">DAFTAR SEKARANG</button>
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
  window.bukaAuth = function() {
    document.getElementById('authModal').classList.add('open');
  };

  window.tutupAuth = function() {
    document.getElementById('authModal').classList.remove('open');
    document.getElementById('pesanAuth').textContent = '';
  };

  window.tampilkanMasuk = function() {
    document.getElementById('tampilanMasuk').style.display = 'block';
    document.getElementById('tampilanDaftar').style.display = 'none';
    document.getElementById('pesanAuth').textContent = '';
  };

  window.tampilkanDaftar = function() {
    document.getElementById('tampilanMasuk').style.display = 'none';
    document.getElementById('tampilanDaftar').style.display = 'block';
    document.getElementById('pesanAuth').textContent = '';
  };

  // ============ PROSES MASUK ============
  window.prosesMasuk = async function(e) {
    e.preventDefault();
    const surel = document.getElementById('surelMasuk').value;
    const sandi = document.getElementById('sandiMasuk').value;
    const pesan = document.getElementById('pesanAuth');
    
    pesan.style.color = '#ffd700';
    pesan.textContent = 'Sedang memeriksa...';

    const { error } = await window.penghubung.auth.signInWithPassword({
      email: surel,
      password: sandi,
    });

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
    }, 1000);
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

    const { error } = await window.penghubung.auth.signUp({
      email: surel,
      password: sandi,
      options: {
        data: { 
          username: nama,
          phone: telepon
        }
      }
    });

    if (error) {
      pesan.style.color = '#ff3838';
      pesan.textContent = 'Gagal mendaftar: ' + error.message;
      return;
    }

    pesan.style.color = '#00e701';
    pesan.textContent = 'Berhasil mendaftar! Silakan masuk.';

    setTimeout(() => {
      tampilkanMasuk();
      document.getElementById('surelMasuk').value = surel;
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
    const btnMasuk = document.querySelector('.btn-outline.hide-mobile');
    const btnDaftar = document.querySelector('.btn-gold');

    if (data && data.user) {
      if (btnMasuk) {
        btnMasuk.textContent = 'Keluar';
        btnMasuk.onclick = prosesKeluar;
      }
      if (btnDaftar) {
        btnDaftar.textContent = 'Akun Saya';
        btnDaftar.onclick = () => window.location.href = 'akun.html';
      }
    } else {
      if (btnMasuk) {
        btnMasuk.textContent = 'Masuk';
        btnMasuk.onclick = bukaAuth;
      }
      if (btnDaftar) {
        btnDaftar.textContent = 'Daftar';
        btnDaftar.onclick = () => { bukaAuth(); tampilkanDaftar(); };
      }
    }
  };

  window.periksaStatusTampilan();
})();
