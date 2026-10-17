function toggleMobileMenu(event) {
  if(event) {
    event.preventDefault(); 
    event.stopPropagation(); // Mencegah klik tembus ke elemen lain
  }
  
  const menu = document.getElementById('mobileMenu');
  if(menu) {
    menu.classList.toggle('open');
  }
}

// Data Permainan untuk Halaman Depan
const GAMES_DEPAN = [
  { name: 'Gates of Olympus', provider: 'Pragmatic Play' },
  { name: 'Sweet Bonanza', provider: 'Pragmatic Play' }
];

function renderGamesDepan() {
  const grid = document.getElementById('gameGridPopuler');
  if (!grid) return;
  grid.innerHTML = GAMES_DEPAN.map(g => `
    <div class="game-card" onclick="alert('Membuka game ${g.name}')">
      <div class="game-img-wrap"><img src="assets/img/games/${g.name.toLowerCase().replace(/ /g, '-')}.png" class="game-img"></div>
      <div class="game-info"><div class="game-name">${g.name}</div><div class="game-provider">${g.provider}</div></div>
    </div>
  `).join('');
}

function openModal(title, body) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').textContent = body;
  document.getElementById('modal').classList.add('open');
}
function closeModal() {
  document.getElementById('modal').classList.remove('open');
}
function openDeposit() { openModal('Deposit', 'Fitur deposit akan segera tersedia.'); }
function jebakan(event) { event.preventDefault(); openModal('Galat', 'Halaman tidak ditemukan.'); }

renderGamesDepan();
if (typeof window.perbaruiSaldo === 'function') window.perbaruiSaldo();
