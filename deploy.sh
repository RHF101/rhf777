#!/data/data/com.termux/files/usr/bin/bash
# deploy.sh — push perubahan ke GitHub (Vercel auto-deploy dari sini)
# Pakai: bash ~/rhf777/deploy.sh "pesan commit"
# Contoh: bash ~/rhf777/deploy.sh "fix layout mesir.html"

cd "$HOME/rhf777" || { echo "Folder ~/rhf777 gak ketemu."; exit 1; }

PESAN="$1"
if [ -z "$PESAN" ]; then
  PESAN="update $(date '+%Y-%m-%d %H:%M')"
fi

echo "== Cek perubahan =="
git status -s

echo "== Tambah semua perubahan =="
git add -A

echo "== Commit =="
git commit -m "$PESAN"

if [ $? -ne 0 ]; then
  echo "Gak ada perubahan buat di-commit, atau commit gagal."
  exit 1
fi

echo "== Push ke GitHub (ini yang trigger auto-deploy Vercel) =="
git push origin main

if [ $? -eq 0 ]; then
  echo "Berhasil push. Vercel bakal auto-deploy dalam beberapa menit."
else
  echo "Push gagal. Cek koneksi / login GitHub (token/SSH)."
  exit 1
fi
