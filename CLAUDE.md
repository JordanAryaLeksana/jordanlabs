@AGENTS.md
# Panduan Proyek — Portfolio Chatbot RAG

File ini adalah sumber kebenaran untuk Claude Code di proyek ini. Baca sebelum membuat atau mengubah komponen apa pun.

## 1. Ringkasan proyek

Portfolio website personal yang fitur utamanya adalah chatbot AI berbasis RAG. Pengunjung bisa bertanya apa saja tentang pemilik (pengalaman, skill, hobi, proyek) dan chatbot menjawab dari knowledge base. Chatbot juga bisa bertindak (kirim CV, buka LinkedIn) lewat tool calling.

Prinsip produk: chatbot adalah bintang tamu yang mengesankan, BUKAN penghalang. Info inti (posisi, pengalaman, kontak, link CV) harus tetap bisa dilihat dalam ~20 detik tanpa mengetik — demi recruiter yang buru-buru dan demi SEO.

Tema visual proyek ini terinspirasi dari title sequence drama Korea "START-UP" (tvN). Yang diambil adalah bahasa visual flat-retro-nya (blok warna, geometri tegas, palet hangat), bukan reproduksi karyanya. Konteks ini penting untuk memahami arah estetika di §4-§6.

Fokus belajar pemilik: prioritas utama adalah mempelajari implementasi LLM (RAG, embedding, tool calling). Saat mengerjakan bagian §7, utamakan penjelasan yang mendidik — jelaskan alasan di balik keputusan, bukan sekadar memberi kode jadi.

## 2. Tech stack

- Framework: Next.js (App Router) + TypeScript
- Styling: Tailwind v4 (token di `app/globals.css` blok `@theme`, TIDAK ada tailwind.config.js)
- Layer AI/chat: Vercel AI SDK (streaming + tool calling + generative UI)
- LLM: via API (Claude / OpenAI / Gemini / Groq)
- Embedding + Vector DB: model embedding provider + Supabase pgvector (atau Pinecone/Qdrant)
- Rate limiting: Upstash
- Hosting: Vercel
- Animasi: dibuat MANUAL (bukan library preset). Adegan ilustratif berat pakai file Lottie/Rive.

## 3. Batasan (hard constraints)

- Sudut SIKU (0px) secara default. Lengkung hanya lewat `rounded-full` untuk elemen yang bentuk aslinya lingkaran. Jangan tambah radius kecil ke bar/kartu/blok.
- Tanpa gradient, drop shadow blur, atau glow. Kedalaman = offset blok solid (hard shadow tanpa blur).
- Background full-bleed HANYA dari token background (lihat §5). Warna aset tidak boleh jadi background halaman.
- Jangan hardcode hex di komponen — selalu pakai kelas token Tailwind (`bg-brick`, `text-coral`).
- Chatbot tidak boleh mengarang fakta: jawab hanya dari konteks retrieval; di luar konteks katakan tidak tahu.
- URL aset (CV, LinkedIn) di-hardcode dari sisi server, bukan dihasilkan model.
- Selalu hormati `prefers-reduced-motion`. Jangan pakai easing lembut/linear (bikin mood jatuh jadi "soft") — pakai `--ease-retro-bounce`.
- Jangan tiru persis karya referensi (title sequence START-UP berhak cipta). Tangkap bahasa visualnya sebagai karya orisinal.

## 4. Estetika: flat retro

Bergaya title sequence flat-retro (rujukan mood: START-UP main title). Blok warna solid, bentuk geometris tegas, kontras figure-ground kuat di atas dark/cream base. Kesan ceria-energetik datang dari BENTUK TEGAS + WARNA, bukan dari efek halus atau warna neon. Default gelap; cream untuk adegan terang.

## 5. Sistem warna

Sumber kebenaran token: `app/globals.css`. Warna dipisah tegas menjadi dua peran.

### Background (set tertutup — hanya ini yang boleh full-bleed)

| Token | Hex | Peran |
|---|---|---|
| `ink-base` | #16161C | Bg utama mode gelap |
| `ink-panel` | #1E1E26 | Panel/surface mode gelap |
| `ink-raised` | #2A2A34 | Surface terangkat mode gelap |
| `cream-base` | #F2EBDA | Bg utama mode terang |
| `cream-raised` | #EAE0CC | Surface mode terang |
| `backdrop-teal` | #55807F | Backdrop adegan (satu-satunya aksen yang boleh jadi latar) |

### Warna aset (isi bentuk; identik di kedua mode)

| Token | Hex | | Token | Hex |
|---|---|---|---|---|
| `brick` | #B0413E | | `pine` | #4C7A6B |
| `red` | #D6483F | | `teal-dark` | #2E5E52 |
| `maroon` | #7A2E2E | | `green` | #5C9E52 |
| `coral` | #E07856 | | `sage` | #93AE86 |
| `terracotta` | #E58A4B | | `slate` | #5B6B8A |
| `mustard` | #DDA83E | | `navy` | #33456B |
| `yellow` | #EAC64B | | `blue` | #3E7BB5 |
| `plum` | #6B5B7A | | `purple` | #7B4B9E |
| `cream-shape` | #EAE0CC | | `offwhite` | #F5EFE0 |

### Aksen & teks

| Token | Hex | Peran |
|---|---|---|
| `frame-green` | #4FA84F | State selected/active — BUKAN warna isi umum |
| `text-on-dark` | #EDE6D6 | Teks di mode gelap |
| `text-on-light` | #1C1C22 | Teks di mode terang |

### Aturan mode

Mode gelap/terang berbagi satu palet aset — yang berubah hanya `--bg` dan `--fg`. Untuk "bentuk terang" di mode terang, gunakan `--shape-contrast` (ink/navy/maroon), karena cream tak terlihat di atas cream. `yellow` dan `mustard` kontrasnya tipis di atas cream — beri outline 0.5px atau geser lebih gelap untuk elemen kecil/teks. Toggle mode via `data-theme="dark"` pada `<html>`.

Grid ikon aplikasi warna-warni (di frame ponsel) BUKAN token sistem — itu properti ilustrasi. Biarkan hidup di dalam file ilustrasi/Lottie, jangan masukkan ke `@theme`.

## 6. Highlight motif aset dari referensi

Ini bank motif visual yang diekstrak dari frame referensi. Tiap motif dipetakan ke komponen yang harus dibangun dan token warna yang dipakai. Gunakan ini sebagai kosakata visual saat menyusun halaman.

- Color-block bar + tile ikon. Bar warna solid diakhiri kotak ikon (amplop/gambar) berwarna kontras. Komponen: `ColorBlockBar`. Warna: bar `slate/brick/mustard`, tile `pine/cream-shape`.
- Kartu split-diagonal dua-tone. Persegi dibagi diagonal jadi dua warna via clip-path. Komponen: `SplitCard`. Warna: `slate`+`pine`, `pine`+`coral`, `plum`+`teal-dark`.
- Lantai heksagon. Kluster heksagon flat-top (tanpa radius). Komponen: `HexGrid`. Warna: `pine/mustard/cream-shape/brick`, satu heksagon `red` sebagai highlight.
- Kursi teater. Grid rapat blok kecil berulang (badan + sandaran) berwarna selang-seling. Komponen: `SeatGrid`. Warna: `coral/purple/pine/mustard`.
- Perspektif tunnel/road. Garis konvergen ke titik tengah untuk kesan kedalaman + gerak. Komponen: `PerspectiveScene`. Warna: dinding `pine`, garis `mustard/red/slate`.
- Garis diagonal berulang. Strip diagonal sejajar di atas dark. Komponen: `DiagonalStripes`. Warna: `red/brick` atau `mustard`.
- Kartu email/preview mini. Kartu putih kecil berisi mini-ilustrasi (gunung/segitiga warna). Komponen: `PreviewCard`. Warna: kartu `offwhite`, isi `slate/pine/brick`.
- Cityscape flat. Barisan gedung geometris beragam tinggi & warna. Komponen: `Cityscape` (idealnya file Lottie/SVG, bukan puluhan div). Warna: seluruh palet aset.
- Kinetic heading multicolor. Judul huruf per huruf beda warna, reveal berjenjang. Komponen: `KineticHeading`. Warna: siklus `coral/mustard/pine/slate/brick`.
- Frame bertingkat (nested outline). Bingkai persegi di dalam bingkai, satu bingkai `frame-green` menandai fokus. Komponen: `NestedFrame`. Warna: outline `text-on-dark`, fokus `frame-green`.

Catatan penting: referensi ini adalah karya MOTION. ~70% "rasa"-nya ada di gerakan (bar meluncur, perspektif menyempit, heksagon muncul beruntun), bukan di layout statis. Adegan ilustratif kompleks harus datang dari file animasi (Lottie/Rive), dibungkus komponen wrapper — jangan dikode frame-by-frame di React.

### Pembagian aset: dibuat via kode vs disiapkan pemilik

Aset kompleks (ilustrasi bespoke) disiapkan pemilik sebagai file, JANGAN dikode: ilustrasi karakter/figur, cityscape penuh, adegan teater/sirkuit/perspektif yang detail, grid ikon aplikasi. Ini diletakkan di `public/lottie/` (animasi) atau `public/illustrations/` (SVG/PNG statis), lalu dipanggil lewat komponen wrapper di `components/scenes/`.

Aset minor umum dibuat via kode (murni CSS/SVG, bentuk geometris sederhana): semua komponen di `components/retro/`, semua primitif di `components/ui/`, dan bentuk dekoratif kecil (bar, kartu split, heksagon, garis diagonal, frame). Panduan detailnya ada di §6a.

## 6a. Spesifikasi desain tiap komponen

Aturan yang berlaku untuk SEMUA komponen di bawah: sudut siku (0px) kecuali disebut lingkaran; tanpa gradient/shadow blur/glow; warna hanya dari token (§5); kedalaman lewat offset blok solid (mis. `translate` + blok warna di belakang), bukan bayangan lembut; teks memakai `text-on-dark`/`text-on-light` sesuai mode.

### Komponen retro (components/retro/)

`ColorBlockBar` — bar horizontal warna solid diakhiri kotak (tile) ikon berwarna kontras. Bentuk: persegi panjang siku, tinggi ~36-40px, tile bujur sangkar seukuran tinggi bar. Warna bar `slate`/`brick`/`mustard`; tile `pine` atau `cream-shape` dengan ikon di tengah. Ikon dari Phosphor/Iconoir (amplop, gambar). Props: `barColor`, `tileColor`, `icon`, `width`. Dipakai sebagai list item, label, atau elemen dekoratif hero.

`SplitCard` — kartu persegi dibagi diagonal jadi dua warna via `clip-path` (segitiga di atas segitiga). Bentuk: bujur sangkar/persegi siku, ~120-140px. Pasangan warna: `slate`+`pine`, `pine`+`coral`, `plum`+`teal-dark`. Props: `colorA`, `colorB`, `size`, opsional `label`. Dipakai sebagai kartu kategori/tag proyek.

`HexGrid` — kluster heksagon flat-top rapat (pola honeycomb). Bentuk: heksagon via `clip-path` polygon, tanpa radius. Warna selang-seling `pine`/`mustard`/`cream-shape`/`brick`, dengan satu heksagon `red` sebagai titik fokus. Props: `rows`, `cols`, `highlightIndex`. Dipakai sebagai lantai/alas dekoratif di bagian bawah section.

`SeatGrid` — grid rapat blok kecil berulang menyerupai kursi (blok badan + blok sandaran kecil di atasnya). Warna selang-seling `coral`/`purple`/`pine`/`mustard`. Props: `rows`, `cols`, `gap`. Dekoratif; kepadatan yang menciptakan tekstur, jadi jaga jarak antar-blok kecil dan konsisten.

`PerspectiveScene` — garis/bidang konvergen ke satu titik tengah untuk ilusi kedalaman. Bentuk: beberapa trapesium/garis yang menyempit ke tengah. Dinding `pine`, garis `mustard`/`red`/`slate`. Props: `vanishingPoint` (default tengah), `lineColors`. Wrapper kosong yang mengandalkan animasi manual untuk efek "maju".

`DiagonalStripes` — strip diagonal sejajar di atas latar gelap. Bentuk: garis miring ~45°, ketebalan seragam, jarak seragam. Warna `red`/`brick` atau `mustard` tunggal. Props: `color`, `angle`, `thickness`, `gap`. Dipakai sebagai pengisi latar section atau transisi.

`PreviewCard` — kartu kecil menyerupai preview email/media. Bentuk: persegi siku warna `offwhite`, berisi mini-ilustrasi geometris (beberapa segitiga warna sebagai "gunung", garis tipis sebagai "teks"). Warna isi `slate`/`pine`/`brick`. Props: `title`, opsional `thumbnail`. Ini aset minor yang boleh dibuat via kode (SVG sederhana).

`NestedFrame` — bingkai persegi kosong di dalam bingkai (outline bertingkat), satu bingkai `frame-green` menandai fokus/terpilih. Bentuk: hanya border siku (tanpa isi), ketebalan tipis (~1-2px). Outline luar `text-on-dark`, bingkai fokus `frame-green`. Props: `levels`, `focusLevel`, `children`. Dipakai membingkai konten yang sedang disorot.

`KineticHeading` — judul dengan tiap huruf berwarna berbeda dan reveal berjenjang. Bentuk: teks besar `font-display`, bobot tebal, tiap huruf `<span>` sendiri. Warna disikluskan `coral`/`mustard`/`pine`/`slate`/`brick`. Props: `text`, opsional `underline` (garis coretan SVG). Animasi manual: stagger per huruf, easing `--ease-retro-bounce`.

### Primitif UI (components/ui/)

Semua primitif bersudut siku, flat, tanpa bayangan lembut. Kedalaman/penekanan lewat offset blok solid.

`Button` — persegi siku, padding ~12px 20px, `font-display` atau `font-sans` tebal. Varian: primary = isi `brick` (atau `pine`) dengan teks `cream-shape`; secondary = latar transparan dengan border tegas 1.5-2px warna aset + teks warna sama; pressed/hover = geser 2px + blok offset solid di belakang untuk kesan "ditekan". Ikon opsional di kiri/kanan (Phosphor/Iconoir). Jangan pakai radius, jangan pakai shadow blur.

`Badge` / `Pill` — label kecil. Badge = persegi siku isi warna aset + teks kontras (mode-aware). Pill = satu-satunya yang boleh `rounded-full`, dipakai untuk status/tag ringan. Padding ~4px 10px, `font-mono` kecil untuk kesan teknikal.

`Card` — kontainer konten siku, latar `ink-panel` (gelap) / `cream-raised` (terang), border tipis opsional 0.5-1px. Aksen bisa lewat satu sisi border tebal warna aset (ingat: border satu sisi = radius 0). Tanpa bayangan lembut.

`Input` / `TextField` — kotak siku, border tegas 1.5px warna netral, fokus = border berganti ke `frame-green` atau `blue`. Latar `ink-panel`/`cream-raised`. Untuk input chat, boleh lebih tinggi dengan ikon kirim di kanan.

`IconButton` — bujur sangkar siku berisi satu ikon; hover = isi warna aset tipis. Untuk aksi tunggal (kirim pesan, tutup, menu).

`Divider` — garis tipis 0.5-1px warna `text` dengan opasitas rendah, atau blok warna aset tipis sebagai pemisah bergaya.

Panduan ikon: gunakan Phosphor atau Iconoir (garis flat berkarakter), ukuran 16-20px inline, 24px dekoratif. Konsisten satu set di seluruh proyek.

## 7. Dokumentasi LLM / RAG

### Konsep inti

Sistem ini RAG (Retrieval-Augmented Generation), BUKAN fine-tuning. Tidak ada training model, tidak butuh PyTorch. LLM dipakai via API. Yang dibangun adalah pipeline retrieval + prompt.

### Dua fase

Persiapan (sekali / saat data berubah): data diri (CV, LinkedIn, bio, proyek, hobi) -> chunking (potong per topik) -> embedding (ubah tiap chunk jadi vektor) -> simpan ke vector DB.

Saat pengunjung bertanya: pertanyaan -> embed -> cari chunk paling relevan di vector DB -> susun prompt (system + chunk konteks + pertanyaan) -> LLM API -> stream jawaban ke UI.

### Strategi bertahap

1. Versi awal: jejalkan seluruh knowledge base ke system prompt (data kecil, muat di context besar). Tanpa vector DB. Cukup untuk portfolio kecil.
2. Upgrade: pindah ke RAG sungguhan dengan embedding + vector DB begitu ingin menunjukkan pemahaman arsitektur atau data membesar.

### Tool calling

Definisikan tools yang boleh dipanggil model: `kirimCV`, `bukaLinkedIn`, `tampilkanKontak`, dst. Model memutuskan KAPAN memanggil; ISI (URL) selalu di-hardcode dari server. Hasil tool dirender jadi komponen UI (generative UI) — mis. kartu unduhan CV dengan tombol, bukan link mentah. Chatbot tidak "mengirim file"; ia memicu UI yang menampilkan tombol ke file statis di `public/`.

### Guardrail

System prompt tegas anti-halusinasi ("jawab hanya dari konteks; kalau tidak ada, katakan tidak tahu"). Rate limiting per pengunjung. Batasi panjang input & jumlah pesan per sesi. Jangan pernah ekspos API key ke client.

## 8. Struktur folder

```
.
├── app/
│   ├── layout.tsx            # root layout, setup next/font -> --font-display/sans/mono
│   ├── page.tsx              # halaman utama (hero + section + chatbot)
│   ├── globals.css           # @theme: token warna, radius siku, easing (sumber kebenaran)
│   └── api/
│       └── chat/route.ts     # endpoint chat: retrieval + LLM + tool calling
├── components/
│   ├── layout/               # struktur halaman
│   │   ├── SceneContainer.tsx
│   │   ├── Section.tsx
│   │   └── NavBar.tsx
│   ├── retro/                # motif visual reusable (lihat §6)
│   │   ├── ColorBlockBar.tsx
│   │   ├── SplitCard.tsx
│   │   ├── HexGrid.tsx
│   │   ├── SeatGrid.tsx
│   │   ├── PerspectiveScene.tsx
│   │   ├── DiagonalStripes.tsx
│   │   ├── PreviewCard.tsx
│   │   ├── NestedFrame.tsx
│   │   └── KineticHeading.tsx
│   ├── scenes/               # wrapper adegan animasi berat
│   │   ├── LottieScene.tsx
│   │   └── Cityscape.tsx
│   ├── chat/                 # chatbot RAG
│   │   ├── ChatWidget.tsx
│   │   ├── MessageBubble.tsx
│   │   └── tool-cards/       # generative UI hasil tool
│   │       ├── CvCard.tsx
│   │       ├── LinkedInCard.tsx
│   │       └── ContactCard.tsx
│   └── ui/                   # primitif kecil (Button, Badge, Pill)
├── lib/
│   ├── rag/
│   │   ├── embed.ts          # buat embedding
│   │   ├── retrieve.ts       # cari chunk relevan dari vector DB
│   │   ├── chunk.ts          # chunking data
│   │   └── prompt.ts         # susun system prompt + konteks
│   ├── tools/                # definisi tool calling (kirimCV, dll)
│   └── config/
│       └── links.ts          # URL aset di-hardcode (CV, LinkedIn) — sumber kebenaran
├── content/
│   └── knowledge/            # knowledge base mentah (bio, cv teks, proyek, hobi)
├── public/
│   ├── cv.pdf                # file CV statis
│   ├── illustrations/        # ilustrasi bespoke statis (SVG/PNG) — disiapkan pemilik
│   └── lottie/               # file animasi adegan — disiapkan pemilik
└── CLAUDE.md
```

### Konvensi kode

- Satu komponen per file, named export, PascalCase.
- Komponen `retro/` harus stateless & presentational — terima warna/isi via props, jangan hardcode.
- Logika RAG murni di `lib/rag/` — komponen chat tidak berisi logika retrieval.
- URL aset hanya dari `lib/config/links.ts`. Model & komponen mengacu ke sana.
- Token warna & radius hanya dari `app/globals.css`. Jangan duplikasi hex di mana pun.

## 9. Gaya kode pemilik (wajib diikuti)

Preferensi personal pemilik yang harus dihormati di semua kode yang dibuat.

- SOLID. Terapkan prinsip SOLID; ini gaya yang disukai pemilik. Satu tanggung jawab per unit, dependency lewat abstraksi, komponen kecil dan fokus.
- Penamaan bahasa Inggris. Semua nama folder, file, variabel, fungsi, dan tipe memakai istilah bahasa Inggris. (Prosa penjelasan/komentar boleh Indonesia, tapi identifier selalu Inggris.)
- Tanpa nested/helper function di dalam file. Kalau ada tugas baru, fungsi untuk tugas itu TIDAK boleh didefinisikan di dalam file yang memanggilnya — termasuk untuk dipanggil oleh fungsi berikutnya di file yang sama. Pisahkan ke file/modul sendiri lalu import. Alasannya: file dengan banyak fungsi bertumpuk sangat sulit dibaca. Satu file idealnya satu unit tugas.
- Komentar & dokumentasi memakai kalimat pasif/deskriptif, bukan imperatif. Jelaskan "ini untuk apa", bukan memerintah. Contoh yang disukai: "fungsi ini digunakan untuk mengambil chunk relevan". Contoh yang dihindari: "ambil chunk relevan".
- Dokumentasi langkah berikutnya (WAJIB). Pemilik sering menunda lalu lanjut lagi. Di akhir setiap unit kerja yang belum selesai, tuliskan catatan langkah berikutnya — di bagian bawah file terkait (blok komentar) atau di file `NEXT_STEPS.md`. Isinya: apa yang sudah selesai, apa yang belum, dan apa langkah konkret berikutnya. Tujuannya agar tidak lupa konteks saat proyek dilanjutkan.

## 10. Catatan belajar

Prioritas belajar pemilik adalah implementasi LLM. Untuk semua pekerjaan di `lib/rag/` dan `app/api/chat/`, sertakan penjelasan yang mendidik: alasan tiap keputusan, trade-off yang ada, dan bagaimana potongan-potongan saling terhubung — bukan sekadar kode jadi tanpa konteks. Bagian visual/frontend boleh lebih ringkas.

## 11. Aturan motion — "Cinematic Startup Motion"

Rujukan rasa: opening K-drama startup (mis. START-UP, Search: WWW). Penuh energi, modern, confident, clean, banyak whitespace, transisi cepat. Hasil akhir harus membuat pengunjung berpikir "engineer ini paham desain", bukan "engineer ini baru menemukan Framer Motion kemarin". Library: Framer Motion.

Prinsip inti

Animasi digunakan untuk memberi fokus, bukan menjadi pusat perhatian. Setiap gerakan harus punya alasan: memperkenalkan elemen, memberi umpan balik saat interaksi, atau mengarahkan mata ke informasi penting. Gerakan terasa cepat, presisi, dan percaya diri, tanpa efek berlebihan. Kalau sebuah animasi tidak melayani salah satu dari tiga alasan itu, animasi tersebut tidak dipakai.

Teknik yang dipakai


Fade + translate sebagai animasi dasar hampir di semua elemen (masuk dari opacity 0 + geser halus ~8-16px).
Stagger untuk daftar card, skill, dan project agar muncul berurutan.
Micro-interaction pada hover: scale ~1.02, lift 2-4px. Untuk penekanan halus gunakan perubahan border/outline warna aset, bukan glow lembut.
Scroll reveal yang konsisten di setiap section (elemen muncul saat masuk viewport).
Parallax ringan hanya pada elemen dekoratif (bentuk retro/blok), tidak pada teks konten.
Gerakan ambient sangat lambat di latar boleh, tetapi diwujudkan lewat pergeseran bentuk/blok warna aset — bukan gradient.


Durasi & easing


Durasi pendek: masuk elemen ~200-400ms, hover ~120-200ms. Terasa cepat dan tajam.
Easing: gunakan kurva ease-out yang tegas dan percaya diri untuk gerakan fungsional (fade/translate/scroll reveal). Token --ease-retro-bounce khusus untuk aksen playful terbatas (mis. huruf KineticHeading), BUKAN untuk seluruh UI — pantulan berlebihan bertentangan dengan rasa "confident/clean".
Stagger antar-item ~40-80ms.


Larangan


Tidak ada bounce berlebihan, flip, spin, atau zoom besar.
Tidak ada gradient (termasuk "gradient ambient bergerak") — bertentangan dengan §3. Untuk kesan ambient, gerakkan blok/bentuk warna aset secara sangat lambat.
Tidak ada glassmorphism (blur/transparansi kaca) dan tidak ada glow/soft shadow — bertentangan dengan estetika flat siku di §3-§4. Kedalaman & penekanan tetap lewat offset blok solid dan perubahan border, bukan blur.
Selalu hormati prefers-reduced-motion: sediakan varian tanpa gerak (langsung tampil) untuk semua animasi.


Katatan konsistensi

Beberapa teknik populer "startup premium" (glassmorphism, gradient ambient, glow) sengaja TIDAK dipakai di proyek ini karena berbenturan dengan identitas flat-retro-siku. Rasa "premium tenang namun energetik" dicapai lewat whitespace, timing yang presisi, stagger yang rapi, dan disiplin warna — bukan lewat efek kaca atau cahaya.

Loading screen (intro loader)

Loader dipakai saat load awal halaman dan, bila perlu, saat transisi berat antar-scene. Tujuannya memberi kesan "opening title sequence" singkat, bukan sekadar spinner. Komponen: LoadingScreen di components/layout/.

Library: bangun dengan Framer Motion (default proyek) untuk loader geometris; gunakan Lottie (via wrapper di components/scenes/) hanya bila loader-nya ilustratif dan file animasinya disiapkan pemilik. Tidak ada library khusus "K-drama" — rasa itu datang dari desain motion, bukan nama package. Jangan pakai spinner bulat generik dari library UI.

Karakter gerakan (selaras §11): singkat dan tegas, total ~1.2-2 detik lalu keluar mulus (fade + translate) menuju konten. Motif visual memakai kosakata aset yang sudah ada — mis. blok warna aset yang tersusun/meluncur berurutan (stagger), garis diagonal yang menyapu, atau KineticHeading inisial/nama yang muncul huruf per huruf. Palet dari token §5; sudut siku; tanpa gradient/blur/glow. Progress ditunjukkan lewat pertumbuhan blok solid (mis. bar terisi), bukan lingkaran berputar.

Aturan: exit loader harus terasa seperti transisi film (cepat, terarah), bukan hilang mendadak. Hormati prefers-reduced-motion — sediakan varian statis singkat atau langsung lewati loader. Jangan menahan pengguna lebih lama dari waktu load sebenarnya; kalau aset sudah siap, loader keluar lebih cepat.

Animasi signature ("wah") untuk komponen

Satu gerakan andalan yang boleh lebih ekspresif dari micro-interaction biasa, dipakai TERBATAS pada elemen berdampak tinggi (kartu proyek unggulan, kartu hasil tool chatbot seperti CvCard, atau saat SplitCard/HexGrid pertama kali masuk viewport). Tujuannya memberi satu momen "wah" yang tetap terasa desainer, bukan pamer.

Konsep: color-block reveal. Elemen tidak sekadar fade — ia tersingkap oleh blok warna aset yang menyapu melintasinya. Urutannya: sebuah blok warna solid (mis. brick/pine/mustard) meluncur cepat menutupi area elemen, lalu meluncur keluar ke arah berlawanan sambil "meninggalkan" konten yang sudah tampil di baliknya. Ini meniru transisi wipe pada title sequence — tegas, sinematik, dan memakai kosakata blok warna yang sudah jadi identitas proyek.

Alternatif yang diizinkan (pilih satu per konteks, jangan ditumpuk): clip-path reveal (konten tersingkap dari satu sisi via animasi clip-path, tanpa blok penutup), atau split-open (kartu SplitCard yang dua segitiganya bergeser sesaat lalu menyatu). Untuk KineticHeading, momen "wah"-nya adalah stagger huruf + coretan underline SVG yang tergambar (pathLength 0→1).

Batasan: durasi tetap pendek (~400-600ms, sedikit lebih panjang dari animasi dasar tapi tidak lambat); satu momen signature per section, jangan setiap kartu memakainya (kehilangan makna kalau di mana-mana); tetap siku, tanpa gradient/blur/glow; easing ease-out tegas (boleh sentuhan --ease-retro-bounce sangat halus, bukan pantulan besar). Wajib punya varian prefers-reduced-motion yang menampilkan konten langsung tanpa wipe.