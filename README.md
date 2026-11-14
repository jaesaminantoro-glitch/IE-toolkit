# Time Study – Multi Mode

Aplikasi web untuk mencatat dan menganalisa **time study** di lini produksi. Berjalan langsung di browser (HP, tablet, atau PC), data tersinkron real-time lewat Firebase, dan tetap bisa dipakai saat koneksi putus-nyambung.

## Mode

| Mode | Fungsi |
|---|---|
| 🔧 **Time Study Mesin** | Ukur cycle time per mesin untuk menghitung kapasitas (UPH) dan membandingkannya dengan standar line. |
| 📋 **Time Study Elemen** | Ukur breakdown gerakan per elemen di dalam satu No. SOP. |
| 🔄 **Time Study Siklus** | Ukur cycle time satu SOP secara keseluruhan. |
| 📝 **IE Trial Tracker** | Catat hasil trial dan problem finding IE. |
| BOM | Tampilan BOM (halaman terpisah di dalam aplikasi). |

Mode dipilih dari halaman awal. Setiap mode punya data sendiri-sendiri.

## Tab di dalam aplikasi

- **Input**: stopwatch dan rekam siklus, lalu simpan ke Master Data.
- **Data**: tabel Master Data (rata-rata, NG%, gerakan, kapasitas, jumlah mesin, total kapasitas). Angka di kolom kuning bisa diedit langsung. Ada ekspor Excel dan CSV.
- **Mesin / Elemen / Siklus**: daftar master (mesin, elemen, atau SOP).
- **Analisa**: pengecekan UPH standar per proses, menampilkan proses yang masih di bawah standar.
- **Arsip**: riwayat data per Line + Model + Bulan.

## Cara pakai singkat

1. Buka aplikasi, pilih mode.
2. Pilih **Line** dan **Model** (tombol di pojok kanan atas).
3. Di tab **Input**, pilih mesin atau SOP, lalu mulai stopwatch dan rekam tiap siklus.
4. Klik **Simpan ke Master Data**.
5. Lihat hasilnya di tab **Data** dan **Analisa**.

### Edit langsung di tabel Data (mode Mesin)

- Klik angka di kolom kuning untuk mengubahnya langsung. Tekan Enter untuk simpan dan Esc untuk batal.
- Klik angka di kolom **No** untuk mengganti nomor seluruh sub mesin dalam satu proses.
- Klik **✂️** di samping Sub Mesin untuk memisahkan satu sub mesin ke No lain, misalnya `19` menjadi `19-1` dan `19-2`. Setelah dipisah, keduanya dihitung sebagai proses terpisah, jadi Total Kapasitas tidak lagi dijumlahkan.
- Untuk menggabungkan lagi, ganti No salah satunya kembali ke nomor yang sama. Penggabungan ditolak kalau nama sub mesinnya sama.

## Penyimpanan dan sinkronisasi

Data disimpan di dua tempat: **localStorage** browser (offline) dan **Firebase** (sinkron antar perangkat).

- Setiap Mode punya kunci penyimpanan lokal sendiri, jadi data Mesin, Elemen, dan Siklus tidak saling menimpa.
- **Antrean sinkronisasi:** kalau koneksi putus saat menyimpan, data masuk antrean dan dikirim ulang otomatis (dicoba tiap 30 detik, dan saat koneksi kembali). Badge **⏳ N belum tersinkron** muncul di header. Ketuk badge untuk sinkron sekarang.
- Saat refresh, data dari server **digabung** dengan data lokal yang belum terkirim, bukan menimpanya.
- **Autosave rekaman:** rekaman siklus yang belum disimpan ke Master Data (mode Siklus dan Elemen) disimpan sementara. Setelah refresh, aplikasi menawarkan untuk memulihkannya. Mode Mesin belum mendukung ini.
- Browser memberi peringatan kalau Anda menutup atau me-refresh halaman saat masih ada rekaman atau data yang belum tersinkron.

> Beri jeda beberapa detik setelah menyimpan sebelum menutup halaman, dan pastikan indikator sync hijau (online) kalau memungkinkan.

## Arsip

- **Arsip otomatis**: setiap data berubah, salinan terbaru disimpan ke tab Arsip, satu entri per mode + line + model + bulan (label 🤖 Otomatis). Master Data tidak berubah. Entri diperbarui terus, bukan dibuat baru setiap kali.
- **Arsip manual** (tombol **ARSIP** di tab Data): memindahkan data ke Arsip dan **menghapusnya** dari Master Data.
- **Restore** arsip otomatis hanya menambahkan baris yang belum ada di Master Data (tidak menggabung siklus yang sudah ada, supaya tidak dobel). Restore arsip manual menggabungkan siklus ke data yang sudah ada.
- Arsip otomatis adalah salinan terbaru, **bukan riwayat per perubahan**. Kalau ada baris terhapus tidak sengaja, arsip bulan itu ikut berubah. Untuk pengaman, gunakan **Backup**.

## Backup

Tombol **BACKUP** di header mengunduh semua data (line, mesin, elemen, siklus, model, master data, arsip) sebagai file JSON. File itu bisa dipakai untuk memulihkan data. Disarankan backup rutin, terutama setelah selesai time study.

## Struktur file

| File | Keterangan |
|---|---|
| `index.html` | Seluruh aplikasi (HTML, CSS, dan JavaScript dalam satu file). |
| `manifest.json` | Konfigurasi PWA (aplikasi bisa dipasang di layar utama HP). |
| `sw.js` | Service worker untuk cache offline. |

## Deploy

Aplikasi statis, jadi cukup di-host sebagai file biasa (saat ini di Vercel). Ganti `index.html` dengan versi terbaru, lalu deploy ulang. Setelah deploy, buka aplikasi sekali dalam keadaan online dan lakukan refresh keras (Ctrl+Shift+R) supaya service worker memuat versi baru.

## Data yang tersimpan di Firebase

| Node | Isi |
|---|---|
| `lineList` | Daftar line |
| `machineList` | Daftar mesin |
| `elemenMaster` | Master elemen / SOP (mode Elemen) |
| `siklusMaster` | Master SOP (mode Siklus) |
| `modelList` | Daftar model |
| `masterDataMesin` / `masterDataElemen` / `masterDataSiklus` | Master Data hasil time study per mode |
| `archive` | Arsip |

## Catatan teknis

- Tidak ada proses build: cukup satu file HTML. Library dimuat dari CDN (Tailwind, SheetJS untuk Excel, Firebase).
- Semua perubahan Master Data dari beberapa perangkat digabung lewat transaksi Firebase. Penghapusan dan edit angka langsung menimpa seluruh data node tersebut dari perangkat yang melakukannya.
- Data waktu (siklus) disimpan dalam detik.
