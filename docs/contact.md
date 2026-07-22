# Implementasi Contact Page — `/contact`

Implementasikan halaman `/contact` secara langsung di repository.

Halaman Contact harus menggunakan nuansa visual yang sama dengan `/about` dan `/projects`:

```txt
cinematic Korean startup
warm flat-retro
editorial
personal
interactive
```

Fokus utama halaman bukan hanya formulir. Jadikan halaman sebagai **social contact wall** dengan layout masonry berisi seluruh kanal untuk terhubung dengan Jordan.

Platform yang perlu ditampilkan:

```txt
TikTok
Discord
Instagram
GitHub
LinkedIn
Email / Contact Card
```

Form kontak tetap tersedia sebagai jalur komunikasi formal.

---

## 1. Pemeriksaan awal

Sebelum mengubah kode:

1. Baca `AGENTS.md`.
2. Baca `README.md`.
3. Baca `NEXT_STEPS.md` apabila tersedia.
4. Periksa `git status`.
5. Baca `package.json` untuk command validasi resmi.
6. Periksa implementasi halaman:

   * `/about`;
   * `/projects`;
   * chat dock;
   * `ContactCard` chatbot.
7. Periksa folder:

```txt
app/
components/layout/
components/chat/
components/chat/tool-cards/
components/retro/
components/scenes/
components/motion/
components/ui/
lib/config/
lib/tools/
public/
```

Gunakan komponen, token, provider, dan motion primitive yang sudah tersedia.

Jangan membuat:

* design system kedua;
* chat state baru;
* motion configuration baru;
* dependency form baru tanpa kebutuhan nyata;
* data kontak yang diduplikasi di banyak file.

---

## 2. Route

Buat:

```txt
app/contact/page.tsx
```

Route harus dapat dibuka:

```txt
/contact
```

Halaman harus tetap menjadi server component sebanyak mungkin.

Pisahkan hanya komponen yang benar-benar interaktif menjadi client component, seperti:

* form state;
* status submit;
* interactive social cards apabila diperlukan.

---

## 3. Tujuan halaman

Halaman harus menjawab dengan cepat:

* Bagaimana menghubungi Jordan?
* Di platform mana Jordan aktif?
* Bagaimana melihat pekerjaan atau aktivitas teknisnya?
* Bagaimana mengirim pesan profesional?
* Bagaimana membuka percakapan melalui chatbot?

Halaman tidak boleh terasa seperti halaman form perusahaan generik.

Pengunjung harus langsung melihat beberapa jalur komunikasi tanpa perlu banyak scroll.

Target panjang halaman:

```txt
sekitar 2 viewport desktop
maksimal sekitar 3 viewport mobile
```

---

## 4. Struktur halaman

Gunakan struktur:

```txt
ContactHero
SocialMasonry
ContactForm
PersistentChatDock
```

DOM ID wajib:

```txt
contact-form
```

Pasang `id="contact-form"` pada wrapper form utama.

Pastikan ID tersebut sama persis dengan:

```txt
SECTION_IDS
```

di:

```txt
lib/tools/types.ts
```

Untuk social masonry, boleh gunakan ID tambahan lokal seperti:

```txt
contact-socials
```

Namun ID tambahan tersebut tidak perlu dimasukkan ke `SECTION_IDS` kecuali memang digunakan oleh tool chatbot.

---

## 5. Contact hero

Hero harus singkat.

Contoh arah copy:

```txt
LET'S CONNECT

Have a project, AI idea,
or engineering opportunity?
```

Deskripsi maksimal dua kalimat:

```txt
Choose the channel that works best for you, or send a direct message
through the contact form below.
```

Tambahkan status kecil apabila sesuai:

```txt
OPEN TO AI ENGINEERING CONVERSATIONS
```

Jangan menulis biography panjang.

Hero dapat menggunakan:

* `KineticHeading`;
* `ColorBlockBar`;
* Sandbox logo sebagai watermark;
* satu pola `DiagonalStripes`;
* satu blok dekoratif `SplitCard`.

Gunakan maksimal dua motif dominan.

---

# SOCIAL MASONRY

## 6. Layout masonry

Buat social wall menggunakan layout masonry responsif.

Desktop:

```txt
3 kolom
tinggi kartu bervariasi
susunan asimetris tetapi terkontrol
```

Tablet:

```txt
2 kolom
```

Mobile:

```txt
1 kolom
```

Gunakan CSS Grid sebagai pilihan utama agar:

* urutan DOM tetap logis;
* aksesibilitas terjaga;
* tidak membutuhkan library masonry;
* layout tetap stabil;
* tidak menambah dependency.

Boleh gunakan kombinasi:

```css
grid-column
grid-row
```

untuk membuat beberapa kartu lebih besar.

Jangan menggunakan masonry JavaScript library.

Urutan DOM harus tetap masuk akal ketika dibaca tanpa CSS:

1. contact card;
2. GitHub;
3. LinkedIn;
4. Instagram;
5. TikTok;
6. Discord.

---

## 7. Social card

Setiap platform memiliki kartu tersendiri.

Kartu harus menampilkan:

* nama platform;
* username atau label akun;
* gambar atau visual platform;
* deskripsi singkat;
* CTA;
* external-link indicator.

Setiap kartu harus dapat diklik dan juga dapat digunakan dengan keyboard.

Gunakan elemen:

```html
<a>
```

untuk kartu yang membuka link.

Jangan menggunakan `div` dengan `onClick` sebagai pengganti link.

External link harus menggunakan atribut keamanan yang tepat:

```txt
target="_blank"
rel="noreferrer noopener"
```

---

## 8. Gambar setiap platform

Setiap kartu perlu memiliki visual yang berbeda.

Contoh:

```txt
TikTok    → visual vertikal seperti video frame
Instagram → visual photo grid atau editorial image frame
GitHub    → code/repository preview
LinkedIn  → professional profile/editorial card
Discord   → conversation/community visual
Contact   → message/envelope preview
```

Gunakan salah satu dari:

1. aset lokal yang sudah tersedia;
2. visual sederhana yang dibuat dengan komponen retro;
3. SVG/CSS geometris sederhana;
4. icon dari icon library yang sudah digunakan repository.

Jangan:

* hotlink gambar dari website sosial;
* menggunakan screenshot akun tanpa aset lokal;
* menambah remote image domain hanya untuk dekorasi;
* membuat ilustrasi karakter kompleks dari banyak `div`;
* mengambil foto atau avatar pihak lain.

Apabila pengguna sudah menyediakan aset gambar sosial di `public/`, gunakan aset tersebut.

Apabila belum tersedia, buat visual abstrak yang sesuai platform menggunakan:

* `PreviewCard`;
* `ColorBlockBar`;
* `NestedFrame`;
* icon platform;
* blok warna solid;
* label monospaced.

Gambar harus memiliki `alt` yang sesuai. Visual dekoratif menggunakan `aria-hidden="true"`.

---

## 9. Bentuk dan ukuran kartu

Gunakan variasi ukuran agar masonry terasa hidup.

Rekomendasi:

### Contact Card

```txt
ukuran besar
span 2 kolom pada desktop
```

### GitHub

```txt
ukuran tinggi
menampilkan repository/code preview
```

### LinkedIn

```txt
ukuran medium horizontal
```

### Instagram

```txt
ukuran square besar
```

### TikTok

```txt
ukuran vertikal
```

### Discord

```txt
ukuran medium
```

Variasi ukuran tidak boleh membuat halaman sulit dipindai.

Jangan membuat tinggi kartu berdasarkan isi yang tidak terkendali. Gunakan aspect ratio atau min-height yang stabil.

---

## 10. Contact card utama

Contact card merupakan kartu paling menonjol.

Isi:

```txt
Jordan Arya Leksana
AI Engineering Focus
email
lokasi apabila sudah terverifikasi
availability atau response note
```

CTA:

```txt
Send an email
Open contact form
Ask the assistant
```

Gunakan email dari:

```txt
lib/config/links.ts
```

Jangan menulis email secara langsung di komponen.

Tombol `Open contact form` harus menuju:

```txt
#contact-form
```

Gunakan smooth scroll hanya apabila reduced motion tidak aktif.

Contact card di halaman dan `ContactCard` di chatbot harus memakai bentuk data yang sama.

Jangan memelihara dua versi data kontak.

---

## 11. GitHub card

GitHub card menampilkan:

* GitHub username;
* label software/AI work;
* maksimal dua repository preview;
* CTA menuju profil GitHub.

Gunakan URL dari:

```txt
GITHUB_URL
```

di `lib/config/links.ts`.

Apabila proyek sudah memiliki server utility GitHub dari halaman About atau Projects, gunakan kembali.

Jangan membuat fetch utility GitHub kedua.

Data GitHub bersifat enhancement. Apabila API gagal:

* kartu tetap tampil;
* username dan link GitHub tetap tersedia;
* repository preview dapat dihilangkan;
* jangan membuat data fallback palsu.

---

## 12. LinkedIn card

LinkedIn card menampilkan:

* label professional profile;
* role/focus singkat;
* CTA menuju LinkedIn.

Gunakan URL dari:

```txt
LINKEDIN_URL
```

Jangan mengambil atau melakukan scraping isi halaman LinkedIn.

Deskripsi harus berasal dari profile config atau copy Contact yang terverifikasi.

---

## 13. Instagram card

Buat konstanta di `lib/config/links.ts`, misalnya:

```ts
export const INSTAGRAM_URL = "...";
```

Gunakan URL Instagram nyata milik Jordan.

Jangan mengarang username atau URL.

Kartu dapat menampilkan:

* username;
* label seperti `visual notes` atau `personal updates`, hanya jika memang sesuai;
* CTA `Follow on Instagram`.

Apabila belum ada URL yang tersedia, gunakan placeholder config yang jelas dan jangan merender kartu sebagai link aktif sampai URL diisi.

Jangan menampilkan link `#` sebagai link final.

---

## 14. TikTok card

Tambahkan:

```ts
export const TIKTOK_URL = "...";
```

Gunakan akun TikTok nyata.

Kartu dapat menggunakan bentuk vertikal yang mengingatkan pada video frame, tetapi tetap mengikuti tema retro website.

Tampilkan:

* username;
* deskripsi singkat;
* CTA `View TikTok`.

Jangan mengambil video TikTok secara otomatis.

Jangan memasang embed TikTok apabila tidak diminta secara eksplisit.

Embed dapat menambah:

* script pihak ketiga;
* tracking;
* layout shift;
* masalah performa.

Gunakan link card saja.

---

## 15. Discord card

Discord bisa menggunakan salah satu bentuk data:

```ts
export const DISCORD_URL = "...";
```

atau:

```ts
export const DISCORD_USERNAME = "...";
```

Jika tersedia link profil atau invite yang valid, gunakan sebagai CTA.

Jika hanya username yang tersedia:

* tampilkan username;
* sediakan tombol copy username;
* jangan membuat URL Discord palsu.

Tombol copy harus:

* dapat digunakan dengan keyboard;
* memberikan feedback yang jelas;
* tidak bergantung hanya pada warna;
* menangani kegagalan Clipboard API.

Jangan menampilkan server invite apabila pengguna tidak secara eksplisit ingin membagikannya.

---

## 16. Social links config

Perluas:

```txt
lib/config/links.ts
```

Source of truth harus mencakup:

```ts
export const CV_URL = encodeURI("/Jordan Arya Leksana_CV2026.pdf");

export const LINKEDIN_URL =
  "https://www.linkedin.com/in/jordanaryaleksana";

export const GITHUB_URL =
  "https://github.com/JordanAryaLeksana";

export const EMAIL_ADDRESS =
  "jordanaryaleksana41@gmail.com";

export const EMAIL_MAILTO_URL =
  `mailto:${EMAIL_ADDRESS}`;

export const INSTAGRAM_URL = "...";

export const TIKTOK_URL = "...";

export const DISCORD_URL = "...";

export const DISCORD_USERNAME = "...";
```

Hanya tambahkan data Discord yang benar-benar digunakan.

Semua komponen halaman dan chatbot harus mengambil URL dari file ini.

Jangan hardcode URL sosial di:

* komponen;
* tool definition;
* project data;
* prompt chatbot.

Apabila URL TikTok, Instagram, atau Discord belum diketahui, tinggalkan placeholder yang jelas dan laporkan dalam hasil akhir. Jangan menebak username.

---

# CONTACT FORM

## 17. Layout form

Form berada setelah masonry atau menyatu sebagai salah satu kartu besar pada bagian bawah masonry.

Tetap pasang:

```html
id="contact-form"
```

Field minimal:

```txt
Name
Email
Subject
Message
```

Boleh tambahkan field:

```txt
Topic
```

dengan pilihan terbatas seperti:

```txt
AI Engineering
Software Project
Collaboration
Recruitment
Other
```

Jangan menambah terlalu banyak field.

Form harus terasa ringan dan cepat diisi.

---

## 18. Form controls

Gunakan primitive yang sudah tersedia:

* `Input`;
* `TextField`;
* `Button`;
* `Card`;
* `NestedFrame`.

Semua input:

* bersudut siku;
* memiliki label terlihat;
* border tegas;
* focus state `frame-green` atau `blue`;
* memiliki error message yang terhubung melalui `aria-describedby`;
* dapat digunakan melalui keyboard;
* mendukung browser autocomplete yang sesuai.

Jangan menggunakan placeholder sebagai pengganti label.

---

## 19. Validasi

Lakukan validasi di client untuk feedback cepat dan validasi ulang di server.

Validasi minimal:

```txt
name    → wajib, panjang masuk akal
email   → wajib, format valid
subject → wajib
message → wajib, memiliki batas panjang
```

Gunakan library validasi yang sudah tersedia di repository.

Apabila repository sudah menggunakan Zod, gunakan Zod.

Jangan menambah dependency baru hanya untuk empat field sederhana apabila validasi dapat dilakukan dengan pola proyek yang sudah tersedia.

Jangan hanya mengandalkan client validation.

---

## 20. Penanganan submit

Gunakan server action atau endpoint server sesuai pola repository.

Periksa apakah repository sudah memiliki:

* email provider;
* Resend;
* Nodemailer;
* contact service;
* database;
* Upstash rate limiter.

Gunakan solusi yang sudah tersedia.

Jangan:

* menaruh API key di client;
* membuat secret baru di source code;
* mengubah `.env`;
* mengarang environment variable yang seolah-olah tersedia;
* membuat request langsung dari client ke provider email;
* menyimpan pesan kontak sensitif di browser.

Apabila belum tersedia provider email:

1. implementasikan validasi server dan struktur action;
2. jangan berpura-pura pesan berhasil dikirim;
3. gunakan status yang jujur;
4. sediakan fallback email melalui `EMAIL_MAILTO_URL`;
5. dokumentasikan konfigurasi provider yang masih diperlukan di `NEXT_STEPS.md`.

Jangan membuat fake success state.

---

## 21. Proteksi spam

Implementasikan proteksi sesuai infrastruktur yang tersedia.

Minimal:

* honeypot field;
* batas panjang input;
* server-side validation;
* rate limiting apabila Upstash sudah tersedia;
* generic error response;
* jangan membocorkan detail internal.

Honeypot harus:

* tidak terlihat secara visual;
* tetap dapat diabaikan screen reader dengan benar;
* tidak menggunakan teknik yang mengganggu password manager.

Jika rate limiter belum tersedia, jangan menambah layanan eksternal tanpa permintaan. Dokumentasikan kebutuhan tersebut.

---

## 22. Form feedback

State yang dibutuhkan:

```txt
idle
submitting
success
error
```

Feedback harus jelas.

Success:

```txt
Message sent. Jordan will get back to you soon.
```

Gunakan pesan tersebut hanya apabila pengiriman benar-benar berhasil.

Error:

```txt
The message could not be sent. You can contact Jordan directly by email.
```

Tambahkan link email fallback.

Jangan menghapus seluruh isi form ketika submit gagal.

---

# CHATBOT INTEGRATION

## 23. Navigation tools

Alur berikut harus bekerja:

```ts
navigateToPage("/contact");
scrollToSection("contact-form");
highlightSection("contact-form");
```

Navigasi lintas route harus menunggu route dan DOM siap.

Gunakan mekanisme navigation state atau pending action yang sudah ada.

Jangan menambahkan beberapa `setTimeout` arbitrer.

---

## 24. Contact tool card

Tool:

```txt
showContactCard
```

harus menghasilkan data yang sama dengan kartu utama di halaman Contact.

Data dapat mencakup:

```txt
email
GitHub
LinkedIn
Instagram
TikTok
Discord
```

Namun tool card chatbot harus tetap compact.

Jangan membuat enam kartu besar di dalam chat.

Gunakan:

* satu contact card;
* daftar link ringkas;
* tombol membuka halaman Contact;
* tombol email utama.

Social links tambahan dapat dirender sebagai icon links kecil.

---

## 25. Social tools

Tool yang sudah ada:

```txt
openGithub
openLinkedin
```

tetap menggunakan URL dari server-side portfolio data.

Apabila ingin menambahkan tool baru seperti:

```txt
openInstagram
openTikTok
openDiscord
```

tambahkan hanya jika benar-benar berguna bagi percakapan.

Ikuti arsitektur Kelompok B:

* tool dieksekusi server;
* URL dibaca dari config;
* model tidak membuat URL;
* client membuka hasil URL.

Jangan menambah tool hanya untuk setiap link apabila `showContactCard` sudah cukup.

---

## 26. Chat dock

Chat dock tetap tersedia pada `/contact`.

Desktop:

* kanan bawah;
* compact;
* dapat dibuka;
* tidak menutupi tombol submit;
* tidak menutupi social card.

Mobile:

* bottom dock;
* memiliki safe-area;
* halaman memiliki padding bawah;
* tidak menghalangi field form yang sedang difokuskan.

Saat keyboard mobile terbuka, dock tidak boleh memaksa layout menjadi rusak.

Gunakan chat provider yang sama dengan halaman lain.

History chat tidak boleh hilang saat berpindah route.

---

# VISUAL DIRECTION

## 27. Nuansa startup

Halaman Contact harus terasa seperti:

```txt
personal communication dashboard
startup founder contact wall
creative engineering network
```

Bukan seperti:

```txt
corporate support center
generic contact form
link-in-bio clone
social media icon grid biasa
```

Gunakan:

* typography besar;
* whitespace;
* masonry asimetris;
* label monospaced;
* visual preview;
* blok warna solid;
* frame siku;
* status marker;
* satu watermark Sandbox.

---

## 28. Komponen retro

Komponen yang direkomendasikan:

```txt
NestedFrame
PreviewCard
ColorBlockBar
SplitCard
DiagonalStripes
```

Gunakan maksimal tiga motif dominan.

Contoh penggunaan:

```txt
Contact Card → NestedFrame
GitHub       → PreviewCard
Instagram    → photo-grid style PreviewCard
TikTok       → ColorBlockBar + vertical frame
Discord      → SplitCard
```

Jangan memaksa semua komponen retro ke semua kartu.

---

## 29. Warna

Gunakan token:

```txt
ink-base
ink-panel
ink-raised
cream-base
cream-raised
pine
slate
brick
coral
mustard
plum
teal-dark
frame-green
```

Setiap platform boleh memiliki aksen berbeda, tetapi tetap berasal dari token proyek.

Jangan mencoba meniru warna brand sosial secara persis dengan hardcoded hex.

Identitas website harus lebih dominan daripada warna brand platform.

---

## 30. visual

pilih dan gunakan:

* gradient;
* glow;
* backdrop blur;
* glassmorphism;
* soft shadow;
* rounded card;
* neon;
* floating particles;
* embed berat;
* autoplay video;
* animasi logo berlebihan;
* remote social media widget;
* layout acak yang merusak urutan baca.

Semua sudut siku kecuali elemen yang secara alami berbentuk lingkaran.

Depth menggunakan offset block solid.

---

# MOTION

## 31. Motion social masonry

Gunakan motion primitive dari:

```txt
components/motion/
```

Motion yang dibutuhkan:

* hero fade dan translate pendek;
* masonry cards muncul dengan stagger 40–70 ms;
* satu signature color-block reveal pada contact card;
* hover card lift 2–4px;
* perubahan border;
* offset block bergerak;
* icon atau CTA bergerak sangat ringan;
* form feedback cepat dan fungsional.

Jangan:

* membuat setiap social icon berputar;
* menggunakan bounce besar;
* menggunakan scale besar;
* menggunakan parallax pada teks;
* menganimasikan seluruh masonry saat setiap filter atau resize.

---

## 32. Reduced motion

Untuk `prefers-reduced-motion`:

* seluruh kartu langsung terlihat;
* tidak ada stagger;
* tidak ada translate;
* tidak ada wipe;
* hover tetap memiliki border atau perubahan warna;
* status submit tetap jelas;
* highlight section menggunakan frame statis;
* chat dock tetap berfungsi.

---

# RESPONSIVE

## 33. Desktop

* masonry tiga kolom;
* contact card dapat span dua kolom;
* form dapat span dua kolom;
* visual platform cukup besar;
* chat dock tidak menutupi masonry;
* halaman tetap compact.

---

## 34. Tablet

* masonry dua kolom;
* kartu besar dapat span dua kolom;
* form tidak terlalu sempit;
* CTA membungkus dengan rapi.

---

## 35. Mobile

* masonry satu kolom;
* urutan sosial tetap logis;
* semua kartu memiliki touch target cukup;
* gambar tidak overflow;
* form satu kolom;
* tombol submit full-width apabila diperlukan;
* padding bawah cukup untuk chat dock;
* safe-area dihormati;
* tidak ada horizontal scroll.

---

# ACCESSIBILITY

## 36. Persyaratan aksesibilitas

Pastikan:

* hanya satu `<h1>`;
* heading berurutan;
* social card berupa link semantik;
* focus ring terlihat;
* external link memiliki label yang jelas;
* icon-only action memiliki accessible name;
* gambar memiliki `alt`;
* visual dekoratif menggunakan `aria-hidden`;
* form memiliki label terlihat;
* error terhubung ke field;
* state submit diumumkan melalui `aria-live`;
* tombol copy Discord memberikan feedback;
* masonry tetap memiliki urutan DOM yang logis;
* highlight tidak memindahkan keyboard focus;
* informasi tidak hanya disampaikan melalui warna.

---

# SEO DAN PERFORMANCE

## 37. Metadata

Tambahkan metadata untuk `/contact`:

```txt
title
description
canonical
Open Graph
```

Gunakan metadata API sesuai versi Next.js.

Deskripsi harus ringkas dan jujur.

Jangan membuat klaim seperti:

```txt
available 24/7
instant response
always online
```

---

## 38. Performance

* Gunakan aset lokal.
* Gunakan `next/image` untuk gambar raster.
* Isi dimensi gambar untuk mencegah layout shift.
* Jangan menambah script TikTok, Instagram, Discord, atau LinkedIn.
* Jangan melakukan scraping sosial.
* Jangan membuat seluruh halaman client component.
* Jangan menambah masonry library.
* Jangan menambah form library jika tidak diperlukan.
* Jangan menambah animation library baru.
* Jangan mengirim secret ke client.

---

# STRUKTUR FILE

## 39. Struktur yang disarankan

```txt
app/
  contact/
    page.tsx
    actions.ts

components/
  contact/
    ContactHero.tsx
    SocialMasonry.tsx
    SocialCard.tsx
    ContactProfileCard.tsx
    GitHubSocialCard.tsx
    InstagramSocialCard.tsx
    TikTokSocialCard.tsx
    DiscordSocialCard.tsx
    LinkedInSocialCard.tsx
    ContactForm.tsx
    ContactFormStatus.tsx

lib/
  config/
    links.ts
    contact.ts
  contact/
    contactSchema.ts
    contactTypes.ts
    getContactData.ts
```

Sesuaikan dengan pola repository.

Ikuti aturan:

* satu komponen per file;
* named export;
* identifier berbahasa Inggris;
* satu tanggung jawab per file;
* jangan membuat banyak helper di dalam file komponen;
* jangan menduplikasi data kontak;
* jangan menambah dependency tanpa alasan.

---

# KRITERIA SELESAI

## 40. Halaman

Implementasi selesai apabila:

1. `/contact` dapat dibuka.
2. Hero singkat dan jelas.
3. Social masonry tampil.
4. TikTok memiliki kartu visual.
5. Discord memiliki kartu visual.
6. Instagram memiliki kartu visual.
7. GitHub memiliki kartu visual.
8. LinkedIn memiliki kartu visual.
9. Contact card menjadi kartu utama.
10. Setiap kartu menggunakan source link dari config.
11. Tidak ada URL sosial yang dikarang.
12. Layout masonry responsif.
13. Urutan DOM tetap logis.
14. Halaman tidak terlalu panjang.
15. Tema konsisten dengan About dan Projects.
16. Chat dock tetap tersedia.

---

## 41. Form

Form dianggap selesai apabila:

1. `contact-form` tersedia.
2. Label terlihat.
3. Keyboard submit bekerja.
4. Client validation tersedia.
5. Server validation tersedia.
6. Honeypot tersedia.
7. Rate limit digunakan apabila infrastrukturnya tersedia.
8. Secret tidak masuk client.
9. Success hanya tampil saat pesan benar-benar terkirim.
10. Email fallback tersedia saat terjadi error.
11. Reduced motion didukung.
12. Highlight section bekerja.

---

## 42. Chatbot

Alur berikut harus berhasil:

```txt
landing
→ navigateToPage('/contact')
```

```txt
landing
→ navigateToPage('/contact')
→ scrollToSection('contact-form')
→ highlightSection('contact-form')
```

```txt
halaman mana pun
→ showContactCard
```

History chat tetap tersedia setelah navigasi.

---

# VERIFIKASI AKHIR

Setelah implementasi:

1. Jalankan lint resmi repository.
2. Jalankan type-check apabila terpisah.
3. Jalankan production build.
4. Uji `/contact` pada desktop.
5. Uji `/contact` pada tablet.
6. Uji `/contact` pada mobile.
7. Uji seluruh social link.
8. Uji kartu dengan keyboard.
9. Uji tombol copy Discord apabila digunakan.
10. Uji validasi form.
11. Uji submit berhasil.
12. Uji submit gagal.
13. Uji email fallback.
14. Uji honeypot.
15. Uji rate limiting apabila tersedia.
16. Uji navigation tool.
17. Uji highlight section.
18. Uji chat history.
19. Uji reduced motion.
20. Pastikan tidak ada horizontal overflow.
21. Pastikan tidak ada hydration warning.
22. Pastikan tidak ada broken image.

Pada jawaban akhir, laporkan:

* file yang dibuat;
* file yang diubah;
* URL sosial yang sudah tersedia;
* URL sosial yang masih placeholder;
* aset visual yang digunakan;
* struktur masonry;
* mekanisme submit;
* proteksi spam;
* sinkronisasi dengan `ContactCard` chatbot;
* hasil lint;
* hasil type-check;
* hasil build;
* pekerjaan yang masih tersisa.
