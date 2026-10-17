// ============ GAME DATA ============
const GAMES = [
  { name: 'Gates of Olympus', provider: 'Pragmatic Play', cat: 'slot', emoji: '⚡', bg: 'linear-gradient(135deg, #667eea, #764ba2)' },
  { name: 'Sweet Bonanza', provider: 'Pragmatic Play', cat: 'slot', emoji: '🍬', bg: 'linear-gradient(135deg, #f093fb, #f5576c)' },
  { name: 'Mahjong Ways', provider: 'PG Soft', cat: 'slot', emoji: '🀄', bg: 'linear-gradient(135deg, #f6d365, #fda085)' },
  { name: 'Fortune Tiger', provider: 'PG Soft', cat: 'slot', emoji: '🐯', bg: 'linear-gradient(135deg, #ff6a00, #ee0979)' },
  { name: 'Starlight Princess', provider: 'Pragmatic Play', cat: 'slot', emoji: '⭐', bg: 'linear-gradient(135deg, #8e2de2, #4a00e0)' },
  { name: 'Sugar Rush', provider: 'Pragmatic Play', cat: 'slot', emoji: '🍭', bg: 'linear-gradient(135deg, #ff9a9e, #fecfef)' },
  { name: 'Wild West Gold', provider: 'Pragmatic Play', cat: 'slot', emoji: '🤠', bg: 'linear-gradient(135deg, #b79891, #94716b)' },
  { name: 'Big Bass Bonanza', provider: 'Pragmatic Play', cat: 'slot', emoji: '🎣', bg: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
  { name: '5 Lions Megaways', provider: 'Pragmatic Play', cat: 'slot', emoji: '🦁', bg: 'linear-gradient(135deg, #f12711, #f5af19)' },
  { name: 'Aztec Gems', provider: 'Pragmatic Play', cat: 'slot', emoji: '💎', bg: 'linear-gradient(135deg, #00b09b, #96c93d)' },
  { name: 'Blackjack', provider: 'Live Casino', cat: 'live', emoji: '🃏', bg: 'linear-gradient(135deg, #0f2027, #2c5364)' },
  { name: 'Roulette', provider: 'Live Casino', cat: 'live', emoji: '🎡', bg: 'linear-gradient(135deg, #7b4397, #dc2430)' },
  { name: 'Baccarat', provider: 'Live Casino', cat: 'live', emoji: '🎴', bg: 'linear-gradient(135deg, #16a085, #f4d03f)' },
  { name: 'Dragon Tiger', provider: 'Live Casino', cat: 'live', emoji: '🐉', bg: 'linear-gradient(135deg, #cb2d3e, #ef473a)' },
  { name: 'Sports Betting', provider: 'Saba Sports', cat: 'sports', emoji: '⚽', bg: 'linear-gradient(135deg, #11998e, #38ef7d)' },
  { name: 'E-Sports', provider: 'TF Gaming', cat: 'sports', emoji: '🎮', bg: 'linear-gradient(135deg, #FC466B, #3F5EFB)' },
  { name: '4D Togel', provider: 'Internal', cat: 'togel', emoji: '🎯', bg: 'linear-gradient(135deg, #c31432, #240b36)' },
  { name: 'Crash', provider: 'Internal', cat: 'arcade', emoji: '🚀', bg: 'linear-gradient(135deg, #3a1c71, #d76d77)' },
  { name: 'Dice', provider: 'Internal', cat: 'arcade', emoji: '🎲', bg: 'linear-gradient(135deg, #2c3e50, #4ca1af)' },
  { name: 'Mines', provider: 'Internal', cat: 'arcade', emoji: '💣', bg: 'linear-gradient(135deg, #8e2de2, #4a00e0)' },
];

// ============ RENDER GAMES ============
let currentFilter = 'all';

function renderGames() {
  const grid = document.getElementById('gameGrid');
  const filtered = currentFilter === 'all'
    ? GAMES
    : GAMES.filter(g => g.cat === currentFilter);

  grid.innerHTML = filtered.map(g => `
    <div class="game-card" onclick="openGame('${g.name}')">
      <div class="game-bg" style="background: ${g.bg};">${g.emoji}</div>
      <div class="game-play">MAIN</div>
      <div class="game-info">
        <div class="game-name">${g.name}</div>
        <div class="game-provider">${g.provider}</div>
      </div>
    </div>
  `).join('');
}

// ============ TABS ============
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentFilter = tab.dataset.cat;
    renderGames();
  });
});

// ============ MOBILE MENU ============
function toggleMobileMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// ============ MODAL ============
function openModal(title, body) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').textContent = body;
  document.getElementById('modal').classList.add('open');
}
function closeModal() {
  document.getElementById('modal').classList.remove('open');
}

// ============ PLACEHOLDER ACTIONS ============
function openDeposit() {
  openModal('💳 Deposit', 'Fitur deposit akan segera tersedia. Untuk sekarang, hubungi live chat.');
}
function openLogin() {
  openModal('🔐 Masuk', 'Form login akan segera hadir. Nantikan update berikutnya!');
}
function openRegister() {
  openModal('📝 Daftar', 'Form registrasi akan segera hadir. Nantikan update berikutnya!');
}
function openPromo() {
  document.getElementById('promosi').scrollIntoView({ behavior: 'smooth' });
}
function openChat() {
  openModal('💬 Live Chat', 'Customer service kami online 24/7. Fitur chat akan segera hadir.');
}
function openGame(name) {
  openModal('🎮 ' + name, 'Game akan segera tersedia. Nantikan update berikutnya!');
}

// ============ INIT ============
renderGames();

// format saldo
function updateBalance(amount) {
  const formatted = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
  document.getElementById('balanceAmount').textContent = formatted;
}
updateBalance(0);

// update header active link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});
