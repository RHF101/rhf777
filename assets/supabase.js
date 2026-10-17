// Menghubungkan halaman situs dengan layanan awan
const SUPABASE_URL = 'https://zteyvjflniyehvnjakvd.supabase.co';
const SUPABASE_KEY = 'sb_publishable_m2VxTR2Q4WTN4LvmkEMHFQ_ySEwcAzf';

// Membuat alat penghubung yang bisa dipakai di seluruh halaman
window.penghubung = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Fungsi untuk mengambil data profil pemain yang sedang masuk
window.ambilProfil = async function() {
  const { data: { user } } = await window.penghubung.auth.getUser();
  if (!user) return null;

  const { data: profil, error } = await window.penghubung
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    console.log('Kesalahan mengambil profil:', error.message);
    return null;
  }

  return { user, profil };
};

// Fungsi untuk memperbarui angka saldo di layar
window.perbaruiSaldo = async function() {
  const data = await window.ambilProfil();
  const elemenSaldo = document.getElementById('balanceAmount');
  
  if (data && data.profil && elemenSaldo) {
    const angka = Number(data.profil.balance).toLocaleString('id-ID');
    elemenSaldo.textContent = 'Rp ' + angka;
  } else if (elemenSaldo) {
    elemenSaldo.textContent = 'Rp 0';
  }
};
