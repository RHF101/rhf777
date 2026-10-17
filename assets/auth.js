// ============ HALAMAN MASUK DAN DAFTAR ============
// Berkas ini mengatur pembuatan akun, masuk, keluar, dan menampilkan saldo.

// Membuat jendela melayang untuk masuk dan daftar
(function() {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.id = 'authModal';
  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close" onclick="tutupAuth()">Tutup</button>

      <div id="tampilanMasuk">
        <h3>Masuk</h3>
        <form id="formMasuk" onsubmit="prosesMasuk(event)">
          <input type="email" id="surelMasuk" placeholder="Alamat surel" required>
          <input type="password" id="sandiMasuk" placeholder="Kata sandi" required>
          <button type="submit" class="btn btn-gold" style="width:100%; margin-top:8px;">Masuk</button>
        </form>
        <p style="text-align:center; margin-top:16px; font-size:14px; color:var(--text-dim);">
          Belum punya akun?
          <a href="#" onclick="tampilkanDaftar(); return false;" style="color:var(--gold);">Daftar di sini</a>
        </p>
      </div>

      <div id="tampilanDaftar" style="display:none;">
        <h3>Daftar Akun</h3>
        <form id="formDaftar" onsubmit="prosesDaftar(event)">
          <input type="text" id="namaPengguna" placeholder="Nama pengguna" required minlength="3">
          <input type="email" id="surelDaftar" placeholder="Alamat surel" required>
          <input type="password" id="sandiDaftar" placeholder="Kata sandi (minimal 6 huruf)" required minlength="6">
          <button type="submit" class="btn btn-gold" style="width:100%; margin-top:8px;">Daftar</button>
        </form>
        <p style="text-align:center; margin-top:16px; font-size:14px; color:var(--text-dim);">
          Sudah punya akun?
          <a href="#" onclick="tampilkanMasuk(); return false;" style="color:var(--gold);">Masuk di sini</a>
        </p>
      </div>

      <p id="pesanAuth" style="text-align:center; margin-top:16px; font-size:13px; min-height:18px;"></p>
    </div>
  `;
  document.body.appendChild(modal);
})();

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
  const surel = document.getElementById('surelDaftar').value;
  const sandi = document.getElementById('sandiDaftar').value;
  const pesan = document.getElementById('pesanAuth');

  pesan.style.color = '#ffd700';
  pesan.textContent = 'Sedang mendaftarkan...';

  const { error } = await window.penghubung.auth.signUp({
    email: surel,
    password: sandi,
    options: {
      data: { username: nama }
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
// Mengubah tombol Masuk/Daftar menjadi tombol Keluar jika sudah masuk
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
      btnDaftar.textContent = 'Profil';
      btnDaftar.onclick = () => openModal('Profil', 'Nama: ' + data.profil.username);
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

// ============ MULAI ============
window.periksaStatusTampilan();
