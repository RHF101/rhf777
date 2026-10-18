#!/data/data/com.termux/files/usr/bin/bash
# ambil-update.sh — pindahin file hasil download Claude ke folder project RHF 777
# Pakai: bash ~/rhf777/ambil-update.sh nama_file.html games
# Contoh: bash ~/rhf777/ambil-update.sh mesir.html games

NAMA_FILE="$1"
TUJUAN_SUB="$2"

if [ -z "$NAMA_FILE" ]; then
  echo "Pakai: bash ambil-update.sh nama_file.html [subfolder_tujuan]"
  exit 1
fi

FOLDER_DOWNLOAD="$HOME/storage/downloads"
FOLDER_PROJECT="$HOME/rhf777"

if [ -n "$TUJUAN_SUB" ]; then
  FOLDER_TUJUAN="$FOLDER_PROJECT/$TUJUAN_SUB"
else
  FOLDER_TUJUAN="$FOLDER_PROJECT"
fi

if [ ! -d "$FOLDER_DOWNLOAD" ]; then
  echo "Folder Download belum ke-link. Jalanin dulu: termux-setup-storage"
  exit 1
fi

SUMBER="$FOLDER_DOWNLOAD/$NAMA_FILE"

if [ ! -f "$SUMBER" ]; then
  echo "File '$NAMA_FILE' gak ketemu di folder Download."
  echo "Isi folder Download saat ini:"
  ls -1 "$FOLDER_DOWNLOAD" | grep -i html
  exit 1
fi

mkdir -p "$FOLDER_TUJUAN"

mv -f "$SUMBER" "$FOLDER_TUJUAN/$NAMA_FILE"

if [ $? -eq 0 ]; then
  echo "Berhasil: $NAMA_FILE dipindah ke $FOLDER_TUJUAN/"
  echo "Folder Download sudah bersih dari file ini."
else
  echo "Gagal mindahin file."
  exit 1
fi
