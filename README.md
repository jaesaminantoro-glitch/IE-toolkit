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
- **Arsip**: riwayat data, ditata dalam **folder** Line → Model → Mode (🔧 Mesin, 🔄 Siklus, 📋 Elemen). Klik folder untuk membuka/menutup (status buka/tutup diingat). Tombol *Buka semua* / *Tutup semua* tersedia, dan saat filter aktif semua folder otomatis terbuka. Di dalam folder mode, setiap arsip tampil sebagai satu baris dengan versi, bulan, jumlah item, dan tombol aksi.
- **Di HP:** semua tab tampil langsung di bilah tab (Input, Data, tab master sesuai mode yaitu Mesin/Elemen/Siklus, Analisa, Arsip). Kalau layar sangat sempit, bilah bisa digeser ke samping dan tab yang aktif otomatis dipusatkan.

## Cara pakai singkat

1. Buka aplikasi, pilih mode.
2. Pilih **Line** dan **Model** (tombol di pojok kanan atas).
3. Di tab **Input**, pilih mesin atau SOP, lalu mulai stopwatch dan rekam tiap siklus.
4. Klik **Simpan ke Master Data**.
5. Lihat hasilnya di tab **Data** dan **Analisa**.

### Edit langsung di tabel Data (mode Mesin)

- Klik angka di kolom kuning untuk mengubahnya langsung. Tekan Enter untuk simpan dan Esc untuk batal.
- Klik angka **S1–Sn** (siklus) untuk mengubahnya. Klik sel kosong tepat setelah siklus terakhir untuk **menambah** siklus. Kosongkan sel lalu Enter untuk **menghapus** siklus itu (minimal 1 siklus per baris).
- Klik angka di kolom **No** untuk mengganti nomor seluruh sub mesin dalam satu proses.
- Klik **✂️** di samping Sub Mesin untuk memisahkan satu sub mesin ke No lain, misalnya `19` menjadi `19-1` dan `19-2`. Setelah dipisah, keduanya dihitung sebagai proses terpisah, jadi Total Kapasitas tidak lagi dijumlahkan.
- Untuk menggabungkan lagi, ganti No salah satunya kembali ke nomor yang sama. Penggabungan ditolak kalau nama sub mesinnya sama.

### Duplikat baris (mode Mesin)

- Tombol **📑 Duplikat** di kolom Aksi menambah baris baru di bawah kelompok No yang sama, dengan **data yang sama** (siklus, NG%, Gerakan, Jml Mesin).
- Baris baru otomatis menjadi **Sub Mesin berikutnya** (misalnya 1, 2 menjadi 3; "Mesin 1" menjadi "Mesin 2"), jadi tidak bentrok dengan baris asal. Total Kapasitas kelompok langsung ikut bertambah.
- Setelah diduplikat, ubah angkanya sesuai kebutuhan.

### Time study ulang (Mesin, Siklus, Elemen)

- Tombol **🔁 Ulang** di kolom Aksi tabel Data (di mode Elemen: **🔁 Ulang SOP**, untuk seluruh elemen SOP itu) membuka tab **Input** dengan line, model, dan mesin/SOP yang sudah terisi. Di mode Mesin, nilai No, NG%, Gerakan, dan Jml Mesin juga terisi dari data lama.
- Sebuah banner kuning "Time study ulang" muncul di tab Input. Klik **Batalkan** kalau tidak jadi.
- Rekam siklus seperti biasa, lalu klik simpan. Aplikasi menawarkan dua pilihan:
  - **🔁 Ganti data lama**: siklus lama diganti hasil baru (jumlah sesi kembali ke 1).
  - **➕ Gabungkan ke data lama**: siklus baru ditambahkan ke siklus yang sudah ada.
- Pada mode Elemen, hanya elemen yang ikut direkam yang diganti.
- Data **preinstallasi** tidak bisa diulang dari tombol ini (ulangi lewat mode Preinstall).
- Pilihan **Ganti data lama** menimpa siklus lama. Kalau ingin menyimpan kondisi sebelumnya, buat arsip dulu lewat **Arsipkan Data Sekarang** (tab Arsip).

## Penyimpanan dan sinkronisasi

Data disimpan di dua tempat: **localStorage** browser (offline) dan **Firebase** (sinkron antar perangkat).

- Setiap Mode punya kunci penyimpanan lokal sendiri, jadi data Mesin, Elemen, dan Siklus tidak saling menimpa.
- **Antrean sinkronisasi:** kalau koneksi putus saat menyimpan, data masuk antrean dan dikirim ulang otomatis (dicoba tiap 30 detik, dan saat koneksi kembali). Badge **⏳ N belum tersinkron** muncul di header. Ketuk badge untuk sinkron sekarang.
- Saat refresh, data dari server **digabung** dengan data lokal yang belum terkirim, bukan menimpanya.
- **Autosave rekaman:** rekaman siklus yang belum disimpan ke Master Data (mode Siklus dan Elemen) disimpan sementara. Setelah refresh, aplikasi menawarkan untuk memulihkannya. Mode Mesin belum mendukung ini.
- Browser memberi peringatan kalau Anda menutup atau me-refresh halaman saat masih ada rekaman atau data yang belum tersinkron.

> Beri jeda beberapa detik setelah menyimpan sebelum menutup halaman, dan pastikan indikator sync hijau (online) kalau memungkinkan.

## Arsip

Arsip dibuat **manual**. Tidak ada lagi arsip otomatis.

- **ARSIP** (tab Data) memindahkan data ke Arsip dan menghapusnya dari Master Data. **Arsipkan Data Sekarang** (tab Arsip) menyalin data ke Arsip tanpa menghapusnya.
- **Versi arsip:** setiap arsip baru diberi nomor versi per **Mode + Line + Model**: arsip pertama `V1.0`, berikutnya `V1.1`, `V1.2`, dan seterusnya. Nomor berlanjut dari versi tertinggi yang sudah ada (termasuk arsip lama berlabel 🤖 Otomatis) dan tidak pernah menimpa arsip sebelumnya. Versi tampil sebagai label ungu di barisnya dan menjadi bagian dari nama arsip dan nama file unduhan. Arsip yang dibuat sebelum ada nomor versi tetap memakai nama bertanggal (`... Manual 21 Sep 2026`). Nomor ini juga dipakai saat memilih **Arsipkan dulu** ketika menghapus data.
- **Nama arsip:** setiap arsip punya nama, ditampilkan di barisnya dengan ikon 📄 (mis. `Time Study Mesin TAC607 Digibaby-S3 Manual 14 Nov 2026`). Klik ✏️ di samping nama untuk menggantinya sendiri (kosongkan untuk kembali ke nama otomatis). Nama ini juga dipakai sebagai nama file saat unduh Excel/CSV.
- **👁️ Buka** pada baris arsip menampilkan isi arsip (siklus S1..Sn, rata-rata, kapasitas/UPH) tanpa mengubah Master Data. Ada kolom pencarian, dan dari tampilan itu Anda bisa langsung unduh Excel/CSV atau Restore.
- **Restore** mengembalikan isi arsip ke Master Data. Untuk arsip yang dibuat oleh versi aplikasi sebelumnya (berlabel 🤖 Otomatis dan nomor versi seperti `V1.0`), baris yang sudah ada di Master Data dilewati, bukan digabung, supaya tidak dobel. Arsip lama itu tetap tersimpan, hanya tidak ada yang baru dibuat.
- Arsip ditata dalam **folder** Line → Model → Mode (🔧 Mesin, 🔄 Siklus, 📋 Elemen). Klik folder untuk membuka/menutup (status buka/tutup diingat). Ada tombol *Buka semua* / *Tutup semua*, dan saat filter aktif semua folder otomatis terbuka.

### Menghapus data (Hapus per baris dan Reset)

Saat menghapus, aplikasi memeriksa apakah datanya **sudah ada di arsip** (isi barisnya sama persis dengan yang tersimpan di arsip mana pun pada mode yang sama):

- **Semua sudah ada di arsip:** data langsung dihapus, **tanpa peringatan**.
- **Ada yang belum masuk arsip** (belum pernah diarsipkan, atau berubah sejak diarsipkan, termasuk time study yang baru): muncul peringatan dengan jumlahnya dan dua pilihan:
  - **📦 Arsipkan dulu, lalu hapus**: yang belum masuk arsip disimpan ke Arsip, lalu data dihapus.
  - **🗑️ Hapus tanpa diarsipkan**: data yang belum diarsipkan hilang (hanya bisa dipulihkan dari **Backup**).
  - **Batal** membatalkan penghapusan.

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
