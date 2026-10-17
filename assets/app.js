// ============ DATA PERMAINAN ============
const GAMES = [
  { name: 'Gates of Olympus', provider: 'Pragmatic Play', cat: 'slot' },
  { name: 'Sweet Bonanza', provider: 'Pragmatic Play', cat: 'slot' },
  { name: 'Mahjong Ways', provider: 'PG Soft', cat: 'slot' },
  { name: 'Fortune Tiger', provider: 'PG Soft', cat: 'slot' },
  { name: 'Starlight Princess', provider: 'Pragmatic Play', cat: 'slot' },
  { name: 'Sugar Rush', provider: 'Pragmatic Play', cat: 'slot' },
  { name: 'Wild West Gold', provider: 'Pragmatic Play', cat: 'slot' },
  { name: 'Big Bass Bonanza', provider: 'Pragmatic Play', cat: 'slot' },
  { name: '5 Lions Megaways', provider: 'Pragmatic Play', cat: 'slot' },
  { name: 'Aztec Gems', provider: 'Pragmatic Play', cat: 'slot' },
  { name: 'Blackjack', provider: 'Kasino Langsung', cat: 'live' },
  { name: 'Roulette', provider: 'Kasino Langsung', cat: 'live' },
  { name: 'Baccarat', provider: 'Kasino Langsung', cat: 'live' },
  { name: 'Dragon Tiger', provider: 'Kasino Langsung', cat: 'live' },
  { name: 'Taruhan Olahraga', provider: 'Saba Sports', cat: 'sports' },
  { name: 'Olahraga Elektronik', provider: 'TF Gaming', cat: 'sports' },
  { name: 'Togel 4D', provider: 'Internal', cat: 'togel' },
  { name: 'Crash', provider: 'Internal', cat: 'arcade' },
  { name: 'Dadu', provider: 'Internal', cat: 'arcade', playUrl: 'games/dice.html' },
  { name: 'Tambang', provider: 'Internal', cat: 'arcade' },
];

// ============ TAMPILKAN PERMAINAN ============
let currentFilter = 'all';

function renderGames() {
  const grid = document.getElementById('gameGrid');
  const filtered = currentFilter === 'all'
    ? GAMES
    : GAMES.filter(g => g.cat === currentFilter);

  grid.innerHTML = filtered.map(g => {
    const imgName = g.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.png';

    return `
    <div class="game-card" onclick="openGame('${g.name}')">
      <div class="game-img-wrap">
        <img src="assets/img/games/${imgName}" alt="${g.name}" class="game-img" onerror="this.style.display='none'">
      </div>
      <div class="game-play">MAIN</div>
      <div class="game-info">
        <div class="game-name">${g.name}</div>
        <div class="game-provider">${g.provider}</div>
      </div>
    </div>
  `}).join('');
}

// ============ TAB KATEGORI ============
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentFilter = tab.dataset.cat;
    renderGames();
  });
});

// ============ MENU PONSEL ============
function toggleMobileMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// ============ JENDELA MELAYANG ============
function openModal(title, body) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').textContent = body;
  document.getElementById('modal').classList.add('open');
}
function closeModal() {
  document.getElementById('modal').classList.remove('open');
}

// ============ TINDAKAN SEMENTARA ============
function openDeposit() {
  openModal('Deposit', 'Fitur deposit akan segera tersedia.');
}
function openLogin() {
  openModal('Masuk', 'Halaman masuk sedang disiapkan.');
}
function openRegister() {
  openModal('Daftar', 'Halaman daftar sedang disiapkan.');
}
function openPromo() {
  document.getElementById('promosi').scrollIntoView({ behavior: 'smooth' });
}
function openChat() {
  openModal('Obrolan Langsung', 'Layanan pelanggan daring 24/7.');
}
function openGame(name) {
  const game = GAMES.find(g => g.name === name);
  if (game && game.playUrl) {
    window.open(game.playUrl, '_blank');
    return;
  }
  openModal('Permainan', 'Permainan ini akan segera tersedia.');
}

// ============ MULAI ============
renderGames();

if (typeof window.perbaruiSaldo === 'function') {
  window.perbaruiSaldo();
}

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// ============ JEBAKAN ANGKA ACAK ============
function jebakan(event) {
  event.preventDefault();
  // Melempar pengunjung iseng ke halaman kosong atau sekadar menampilkan pesan
  const pesan = ['Akses ditolak', 'Halaman tidak ditemukan', 'Kesalahan sistem', 'Silakan coba lagi nanti'];
  const acak = pesan[Math.floor(Math.random() * pesan.length)];
  openModal('Galat', acak);
}

// ============ MENAMPILKAN ANGKA RAHASIA ============
// Angka acak tampil di kaki halaman. Satu di antaranya menuju halaman admin.
// Kamu bisa melihat angka rahasia dengan memeriksa kode halaman ini di peramban.
