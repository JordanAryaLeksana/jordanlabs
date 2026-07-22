# Redesign `/about` — Compact AI Engineer Profile

Implementasikan ulang halaman `/about` secara langsung di repository.

Hasil sebelumnya terlalu panjang dan terasa seperti halaman CV tradisional. Versi baru harus **singkat, visual, interaktif, dan fokus hanya pada perjalanan Jordan dari Software Engineer menuju AI Engineer**.

Jangan membuat banyak section, timeline panjang, atau skill grid besar.

---

## 1. Sebelum mengubah kode

Baca terlebih dahulu:

```txt
AGENTS.md
README.md
NEXT_STEPS.md
package.json
```

Kemudian periksa:

```txt
app/about/
components/retro/
components/scenes/
components/motion/
components/chat/
lib/config/
lib/tools/types.ts
public/
```

Periksa `git status` dan jangan menimpa perubahan pengguna yang tidak berkaitan.

Cari CV berikut di repository:

```txt
public/Jordan Arya Leksana_CV2026.pdf
```

Konten tentang pengalaman Jordan hanya boleh diambil dari:

1. CV tersebut;
2. config proyek yang sudah berasal dari CV;
3. repository GitHub publik Jordan.

Jangan mengarang perusahaan, role, periode kerja, kontribusi, metrik, atau teknologi.

---

## 2. Tujuan desain

Gunakan struktur konten yang ringkas dan personal seperti inspirasi:

```txt
https://dafkur.com/about
```

Gunakan hanya sebagai referensi pola:

* profile-first;
* foto sebagai elemen utama;
* intro sangat singkat;
* social links mudah ditemukan;
* informasi tidak tersebar ke banyak section;
* halaman terasa personal dan mudah dipindai.

Jangan menyalin desainnya secara langsung.

Gabungkan pola tersebut dengan identitas visual proyek:

```txt
cinematic Korean startup
warm flat-retro
confident
clean
interactive
```

Halaman harus terasa seperti profil seorang engineer di startup teknologi, bukan template CV dan bukan halaman SaaS generik.

---

## 3. Panjang halaman

Batasi halaman menjadi sekitar:

```txt
1.5–2.2 viewport pada desktop
maksimal sekitar 3 viewport pada mobile
```

Pengunjung hanya perlu melakukan sedikit scroll.

Jangan gunakan:

* timeline pekerjaan panjang;
* biography berparagraf-paragraf;
* daftar semua teknologi;
* skill cards dalam jumlah besar;
* section kosong hanya untuk dekorasi;
* heading berulang yang menjelaskan hal sama.

Gunakan satu hero besar, satu GitHub section ringkas, lalu footer status.

---

## 4. Struktur halaman

Gunakan struktur berikut:

```txt
AboutProfile
ExperiencedAs
GitHubActivity
AboutFooter
PersistentChatDock
```

Untuk menjaga kompatibilitas chatbot, pasang DOM ID berikut pada blok yang paling relevan:

```txt
about-background  → profile hero dan cerita singkat
about-experience  → blok “Experienced as”
about-skills      → GitHub/AI work section
```

Jangan membuat tiga section panjang hanya demi memenuhi ID.

Pastikan ketiga ID tetap cocok dengan `SECTION_IDS` di:

```txt
lib/tools/types.ts
```

---

## 5. Profile hero

Hero menjadi fokus utama dan hampir memenuhi viewport pertama.

Layout desktop:

```txt
kiri  → nama, role, deskripsi, links
kanan → foto Jordan
```

Layout mobile:

```txt
foto
nama dan deskripsi
links
```

Isi hero:

```txt
Jordan Arya Leksana

AI Engineer
with a Software Engineering background
```

Gunakan label kecil:

```txt
CURRENTLY FOCUSED ON
AI ENGINEERING
```

atau komposisi lain yang memiliki arti sama.

Deskripsi maksimal dua paragraf pendek. Gunakan copy berikut sebagai dasar, lalu sesuaikan hanya apabila CV mendukung detail tambahan:

```txt
I’m Jordan Arya Leksana, a software engineer currently focused on AI
engineering.

My software engineering experience shapes how I approach deep learning:
not only as a model or experiment, but as a system that needs to be useful,
maintainable, and ready to integrate into real applications.
```

Jangan memperpanjang copy menjadi biography.

Tambahkan CTA ringkas:

```txt
View CV
GitHub
LinkedIn
Email
```

Semua URL harus berasal dari `lib/config/links.ts`.

---

## 6. Foto Jordan

Cari foto Jordan yang sudah tersedia di:

```txt
public/
public/images/
public/illustrations/
components/scenes/
```

Jangan menggunakan avatar GitHub sebagai pengganti foto utama apabila foto lokal tersedia.

Apabila belum ada foto lokal:

* siapkan prop/path yang jelas;
* gunakan placeholder netral sementara;
* jangan mengambil foto orang lain;
* jangan menggambar wajah buatan;
* laporkan path foto yang perlu ditambahkan pengguna.

Foto harus:

* berukuran besar tetapi tidak memenuhi seluruh halaman;
* memakai crop yang konsisten;
* memiliki `alt` yang tepat;
* tetap tajam pada desktop dan mobile;
* tidak dibungkus glassmorphism;
* tidak memakai rounded card biasa.

Gunakan frame siku, crop editorial, atau komposisi geometris retro.

---

## 7. Blok “Experienced as”

Di bawah atau menyatu dengan hero, tampilkan blok pendek:

```txt
EXPERIENCED AS
SOFTWARE ENGINEER
```

Lalu tampilkan satu penjelasan pendek:

```txt
My background is in building software systems and digital products.
Today, I apply that engineering foundation to deep learning and applied AI.
```

Detail kedua dapat disesuaikan berdasarkan CV, tetapi fokusnya harus tetap:

```txt
software engineering experience
→ deep learning
→ AI engineering
```

Boleh tambahkan maksimal tiga focus labels, hanya jika didukung CV:

```txt
Applied AI
Deep Learning
Computer Vision
```

Jangan menampilkan puluhan badge framework.

---

## 8. GitHub section

Buat satu section GitHub yang interaktif dan compact.

Judul:

```txt
Selected GitHub Work
```

Subjudul maksimal satu kalimat:

```txt
Experiments and projects where software engineering meets applied AI.
```

### Sumber data

Ambil data publik dari GitHub:

```txt
https://github.com/JordanAryaLeksana
```

Gunakan GitHub REST API dari server component atau server utility.

Jangan mengambil data GitHub langsung dari browser apabila dapat dilakukan di server.

Gunakan:

```ts
fetch(url, {
  next: {
    revalidate: 3600,
  },
});
```

Jangan menambah dependency GitHub baru.

Jangan memerlukan token untuk data publik. Apabila repository sudah memiliki konfigurasi token GitHub, gunakan hanya melalui server dan jangan mengeksposnya ke client.

### Repository yang ditampilkan

Tampilkan maksimal 3 atau 4 repository.

Prioritaskan repository AI atau deep-learning seperti:

```txt
EMQNET
DermSight
```

Hanya tampilkan repository tersebut apabila masih tersedia dari respons GitHub.

Repository lain dapat dipilih berdasarkan:

1. relevansi terhadap AI;
2. repository terbaru;
3. bukan fork;
4. memiliki deskripsi atau README yang cukup jelas.

Jangan mengarang deskripsi repository. Gunakan:

* `description` dari GitHub;
* topics;
* language;
* updated date;
* stars;
* repository URL.

Apabila deskripsi kosong, tampilkan teks netral:

```txt
Public repository — open on GitHub for implementation details.
```

### Interaksi

Setiap repository card memiliki:

* nama;
* deskripsi singkat;
* primary language;
* last updated;
* stars apabila tersedia;
* tombol atau clickable area menuju GitHub.

Interaksi yang diharapkan:

* border atau blok offset bergerak 2–4px saat hover;
* informasi tambahan muncul secara ringan;
* keyboard focus terlihat;
* klik membuka repository pada tab baru;
* tanpa modal besar;
* tanpa carousel berat;
* tanpa animasi berlebihan.

Tambahkan link:

```txt
View all repositories →
```

### Loading dan error

Data GitHub tidak boleh membuat build gagal.

Apabila GitHub API gagal:

* render heading section;
* tampilkan pesan singkat;
* tetap tampilkan tombol menuju profil GitHub;
* jangan menampilkan skeleton permanen;
* jangan memalsukan data fallback.

---

## 9. Footer lokasi dan live clock

Buat footer tipis di bawah GitHub section.

Tampilkan:

```txt
BASED IN
Surabaya, Indonesia

LOCAL TIME
14:32:08 WIB
```

Simpan lokasi dan timezone sebagai config:

```ts
export const ABOUT_LOCATION = "Surabaya, Indonesia";

export const ABOUT_TIMEZONE = "Asia/Jakarta";
```

Pastikan lokasi dikonfirmasi dari CV atau data profil sebelum difinalkan.

Live clock harus:

* menggunakan `Intl.DateTimeFormat`;
* menggunakan timezone `Asia/Jakarta`;
* diperbarui setiap detik;
* tidak memakai waktu timezone browser pengunjung;
* tidak menyebabkan hydration mismatch;
* dibersihkan dengan `clearInterval`;
* memiliki fallback server yang aman;
* tidak membuat seluruh halaman menjadi client component.

Pisahkan menjadi client component kecil seperti:

```txt
components/about/LocalClock.tsx
```

Jangan melakukan geolocation terhadap pengunjung.

---

## 10. Chat dock

Chatbot harus tetap tersedia pada `/about`, tetapi tampil sebagai kotak assistant kecil di bawah.

Karakteristik:

* kanan bawah pada desktop;
* compact bottom dock pada mobile;
* mempertahankan history percakapan dari landing page;
* dapat dibuka dan diminimalkan;
* tidak menutupi footer atau repository card;
* tampil seperti assistant yang mengikuti pengunjung;
* gunakan state/provider chat yang sama;
* jangan membuat instance chat baru.

Tambahkan padding bawah halaman agar dock tidak menutupi konten terakhir.

---

## 11. Arah visual startup

Nuansa startup sebelumnya belum cukup kuat. Perkuat melalui komposisi, bukan dengan menambah banyak elemen.

Gunakan:

* hero seperti personal founder/engineer profile;
* typography besar dan percaya diri;
* whitespace lega;
* dark `ink-base` atau light `cream-base`;
* blok warna solid;
* label monospaced kecil;
* status indicator;
* editorial photo crop;
* offset block sebagai kedalaman;
* satu watermark Sandbox dari `components/scenes/`;
* satu elemen retro besar sebagai identitas visual.

Komponen yang dapat digunakan:

```txt
KineticHeading
ColorBlockBar
NestedFrame
DiagonalStripes
SplitCard
Sandbox logo scene
```

Pilih maksimal dua atau tiga motif utama. Jangan memakai semuanya.

Palet utama:

```txt
ink-base
ink-panel
cream-base
cream-raised
pine
slate
brick
mustard
frame-green
```

Aturan wajib:

* sudut siku;
* tanpa gradient;
* tanpa glow;
* tanpa glassmorphism;
* tanpa soft shadow;
* tanpa hardcoded hex;
* depth menggunakan blok solid offset;
* aksen warna harus terkontrol.

Gunakan nuansa K-drama startup melalui:

* framing sinematik;
* komposisi asimetris;
* transisi blok warna;
* ritme cepat;
* profil yang terasa optimistis dan personal.

Jangan meniru title sequence tertentu secara langsung.

---

## 12. Motion

Gunakan primitive dari `components/motion/`.

Motion cukup:

1. hero masuk dengan fade dan translate pendek;
2. foto direveal menggunakan satu color-block wipe;
3. label “AI Engineer” memiliki motion ringan;
4. repository cards menggunakan stagger 40–60 ms;
5. footer dan clock muncul tanpa animasi mencolok;
6. chat dock memakai transisi compact.

Gunakan satu signature animation utama pada foto atau heading.

Jangan menggunakan:

* spin;
* flip;
* zoom besar;
* bounce berlebihan;
* parallax teks;
* animasi pada setiap kata;
* scroll section yang lambat.

`prefers-reduced-motion` harus membuat seluruh konten langsung terlihat.

---

## 13. Sumber konten

Jangan membuat `about.md` yang panjang.

Buat config sederhana dan typed, misalnya:

```txt
lib/config/about.ts
```

Isinya hanya:

* hero copy;
* experienced-as copy;
* AI focus labels;
* lokasi;
* timezone;
* konfigurasi repository priority.

Contoh bentuk:

```ts
export const ABOUT_PROFILE = {
  eyebrow: "Currently focused on",
  title: "AI Engineer",
  previousExperience: "Software Engineer",
  description: [
    "...",
    "...",
  ],
  focusAreas: ["Applied AI", "Deep Learning"],
  location: "Surabaya, Indonesia",
  timezone: "Asia/Jakarta",
  githubPriority: ["EMQNET", "DermSight"],
} as const;
```

Semua isi harus diverifikasi dari CV dan GitHub sebelum digunakan.

`profile.ts` tetap:

```ts
export const PROFILE = {
  fullName: "Jordan Arya Leksana",
  role: "Software Engineer",
} as const;
```

Tidak perlu mengubah role global menjadi AI Engineer apabila belum sesuai dengan sumber data. Halaman About dapat menjelaskan bahwa AI Engineering adalah fokus Jordan saat ini.

---

## 14. Struktur file yang disarankan

```txt
app/
  about/
    page.tsx

components/
  about/
    AboutProfile.tsx
    ExperiencedAs.tsx
    GitHubActivity.tsx
    GitHubRepositoryCard.tsx
    LocalClock.tsx
    AboutFooter.tsx

lib/
  about/
    getGitHubProfile.ts
    getGitHubRepositories.ts
    githubTypes.ts
  config/
    about.ts
```

Sesuaikan dengan pola repository yang sudah ada.

`page.tsx` tetap server component.

Hanya bagian berikut yang perlu menjadi client component:

* live clock;
* interaksi yang memang membutuhkan browser;
* chat dock yang sudah ada.

---

## 15. Kriteria selesai

Implementasi selesai apabila:

1. `/about` dapat dibuka.
2. Halaman tidak terasa panjang.
3. Fokus utama langsung terbaca sebagai AI Engineer dengan background Software Engineer.
4. Foto Jordan menjadi elemen utama.
5. Copy maksimal beberapa paragraf pendek.
6. Tidak ada timeline panjang.
7. Tidak ada skill grid besar.
8. GitHub section mengambil data publik yang nyata.
9. Repository AI diprioritaskan tanpa mengarang deskripsi.
10. GitHub API failure tidak merusak halaman.
11. Lokasi dan live clock tampil di footer.
12. Jam selalu menggunakan `Asia/Jakarta`.
13. Chat dock tetap kecil dan mempertahankan history.
14. `about-*` DOM ID tetap berfungsi.
15. Nuansa cinematic startup lebih terasa.
16. Semua sudut tetap siku.
17. Tidak ada gradient, glow, atau glassmorphism.
18. Reduced motion didukung.
19. Mobile hanya membutuhkan sedikit scroll.
20. Lint, type-check, dan build berhasil.

Setelah selesai, laporkan:

* file yang dibuat;
* file yang diubah;
* sumber konten dari CV;
* data GitHub yang ditampilkan;
* lokasi foto atau placeholder;
* cara GitHub error ditangani;
* hasil lint;
* hasil type-check;
* hasil build.
