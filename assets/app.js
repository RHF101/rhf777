// Data Permainan (Hanya untuk halaman depan)
const GAMES_DEPAN = [
  { name: 'Gates of Olympus', provider: 'Pragmatic Play' },
  { name: 'Sweet Bonanza', provider: 'Pragmatic Play' },
  { name: 'Mahjong Ways', provider: 'PG Soft' },
  { name: 'Fortune Tiger', provider: 'PG Soft' },
  { name: 'Starlight Princess', provider: 'Pragmatic Play' },
  { name: 'Koi Gate', provider: 'Habanero' }
];

function renderGamesDepan() {
  const grid = document.getElementById('gameGridPopuler');
  if (!grid) return;

  grid.innerHTML = GAMES_DEPAN.map(g => {
    const imgName = g.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.png';
    return `
    <div class="game-card" onclick="alert('Membuka game ${g.name}')">
      <div class="game-img-wrap">
        <img src="assets/img/games/${imgName}" alt="${g.name}" class="game-img" onerror="this.style.display='none'">
      </div>
      <div class="game-play">MAIN</div>
      <div class="game-info">
        <div class="game-name">${g.name}</div>
        <div class="game-provider">${g.provider}</div>
      </div>
    </div>`;
  }).join('');
}

// Menu Ponsel
function toggleMobileMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// Jendela Melayang
function openModal(title, body) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').textContent = body;
  document.getElementById('modal').classList.add('open');
}
function closeModal() {
  document.getElementById('modal').classList.remove('open');
}

// Tindakan
function openDeposit() { openModal('Deposit', 'Fitur deposit akan segera tersedia.'); }
function openPromo() { window.location.href = 'promosi.html'; }
function jebakan(event) {
  event.preventDefault();
  openModal('Galat', 'Halaman tidak ditemukan.');
}

// Mulai
renderGamesDepan();
if (typeof window.perbaruiSaldo === 'function') {
  window.perbaruiSaldo();
}
