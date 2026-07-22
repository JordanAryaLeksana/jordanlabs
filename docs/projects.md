# Implementasi Projects — `/projects` dan `/projects/[slug]`

Implementasikan halaman daftar proyek dan detail proyek secara langsung di repository.

Route yang harus dibuat:

```txt
app/projects/page.tsx
app/projects/[slug]/page.tsx
```

Jangan hanya menulis contoh kode atau rencana. Buat dan ubah file yang diperlukan, lalu jalankan validasi resmi repository.

Halaman Projects harus memiliki tema visual yang sama dengan halaman About:

```txt
cinematic Korean startup
warm flat-retro
editorial
confident
compact
interactive
```

Halaman tidak boleh terasa seperti katalog SaaS generik atau kumpulan kartu GitHub biasa.

---

## 1. Pemeriksaan awal

Sebelum mengubah kode:

1. Baca `AGENTS.md`.
2. Baca `README.md`.
3. Baca `NEXT_STEPS.md` apabila tersedia.
4. Periksa `git status`.
5. Baca `package.json` untuk command validasi resmi.
6. Periksa implementasi terbaru halaman `/about`.
7. Periksa struktur berikut:

```txt
app/
components/sections/
components/retro/
components/scenes/
components/motion/
components/chat/
components/layout/
lib/config/
lib/tools/
public/illustrations/
public/lottie/
```

Gunakan kembali:

* layout;
* typography;
* token;
* motion primitive;
* highlight system;
* chat provider;
* navigation tool;
* project card primitive;

yang sudah tersedia.

Jangan membuat sistem desain, motion system, atau state chatbot baru.

---

# BAGIAN A — HALAMAN DAFTAR PROJECTS

## 2. Tujuan `/projects`

Halaman `/projects` digunakan untuk memberi gambaran cepat tentang karya terbaik Jordan dan membantu pengunjung memilih proyek yang ingin dibaca lebih dalam.

Halaman harus menjawab:

* Proyek utama Jordan apa?
* Masalah apa yang diselesaikan?
* Di mana software engineering dan AI digunakan?
* Proyek mana yang paling relevan untuk recruiter?
* Bagaimana membuka penjelasan teknis proyek?

Halaman harus ringkas.

Target panjang:

```txt
sekitar 2–3 viewport desktop
sekitar 3–4 viewport mobile
```

Jangan membuat halaman katalog yang sangat panjang.

---

## 3. Struktur `/projects`

Gunakan dua section utama:

```txt
projects-featured
projects-all
```

Struktur visual:

```txt
ProjectsHero
FeaturedProjects
ProjectExplorer
PersistentChatDock
```

DOM ID harus persis:

```txt
projects-featured
projects-all
```

Pastikan keduanya terdaftar di:

```txt
lib/tools/types.ts
```

Jangan membuat variasi ID lain.

---

## 4. Projects hero

Hero harus singkat dan langsung menjelaskan isi halaman.

Contoh arah copy:

```txt
SELECTED WORK

Projects where software engineering
meets applied AI.
```

Deskripsi maksimal dua kalimat:

```txt
A compact collection of systems, experiments, and products built around
deep learning, computer vision, and practical software engineering.
```

Sesuaikan copy berdasarkan data proyek yang benar-benar tersedia.

Tambahkan metadata pendek, misalnya:

```txt
AI SYSTEMS
COMPUTER VISION
PRODUCT ENGINEERING
```

Jangan menampilkan paragraf biography pada halaman ini.

Gunakan satu visual retro besar atau satu ilustrasi dari `components/scenes/`.

Hero boleh memakai:

* `KineticHeading`;
* `ColorBlockBar`;
* `DiagonalStripes`;
* Sandbox logo sebagai watermark;
* satu project preview abstrak.

Jangan memakai semua motif sekaligus.

---

## 5. Featured projects

Section:

```txt
id="projects-featured"
```

Tampilkan maksimal dua proyek unggulan:

```txt
EMQNET
DermSight
```

Hanya tampilkan sebagai featured apabila data kedua proyek tersedia di sumber proyek.

Gunakan layout editorial, bukan grid kartu kecil biasa.

Rekomendasi desktop:

```txt
project pertama → kartu besar horizontal
project kedua   → kartu besar horizontal dengan susunan terbalik
```

Pada mobile, keduanya menjadi satu kolom.

Setiap featured project menampilkan:

* nama proyek;
* kategori;
* satu kalimat masalah;
* satu kalimat solusi;
* maksimal tiga teknologi utama;
* status proyek apabila tersedia;
* thumbnail atau ilustrasi;
* tombol melihat detail;
* tombol demo hanya jika demo publik tersedia;
* tombol repository hanya jika URL tersedia.

Jangan menampilkan seluruh deskripsi teknis di halaman daftar.

### Project card featured

Gunakan:

* sudut siku;
* border satu sisi dengan warna aset;
* `NestedFrame` untuk framing;
* `PreviewCard` atau aset gambar proyek;
* blok offset solid sebagai depth;
* `SplitCard` sebagai kategori atau tanda visual.

Signature animation pada section ini hanya digunakan satu kali, misalnya:

* color-block wipe saat featured project pertama masuk;
* reveal thumbnail;
* frame yang mengunci posisi.

Jangan memberikan signature animation berbeda pada setiap kartu.

---

## 6. Project explorer

Section:

```txt
id="projects-all"
```

Bagian ini menampilkan seluruh proyek secara compact.

Struktur:

```txt
judul section
filter controls
jumlah hasil
project grid
```

Contoh heading:

```txt
PROJECT EXPLORER

Filter by the kind of problem,
technology, or system you want to inspect.
```

### Filter

Filter harus berasal dari data proyek, bukan hardcoded terpisah.

Contoh kategori hanya jika didukung data:

```txt
All
AI
Deep Learning
Computer Vision
Web
Research
```

Gunakan nilai identifier yang stabil dan type-safe.

Filter harus:

* dapat digunakan dengan mouse;
* dapat digunakan dengan keyboard;
* memiliki state aktif yang jelas;
* menggunakan `aria-pressed` atau pola tab yang benar;
* tidak hanya dibedakan melalui warna;
* mendukung tombol reset atau `All`;
* memperbarui hasil tanpa reload halaman;
* menggunakan source data yang sama dengan tool `filterProjects`.

Gunakan komponen kecil seperti `Badge`, `Pill`, atau button siku.

Jangan membuat dropdown apabila pilihan filter hanya sedikit.

---

## 7. Project card untuk daftar penuh

Setiap kartu menampilkan hanya:

* judul;
* ringkasan pendek;
* kategori;
* maksimal tiga tags;
* thumbnail;
* primary stack;
* link detail;
* status demo apabila relevan.

Jangan menampilkan:

* paragraf panjang;
* seluruh arsitektur;
* seluruh dataset;
* seluruh evaluation;
* semua teknologi;
* seluruh README.

Interaksi kartu:

* lift sekitar 2–4px;
* perubahan border;
* blok offset bergerak;
* thumbnail dapat bergeser ringan;
* tanpa glow;
* tanpa blur;
* tanpa zoom besar;
* tanpa rounded corner.

Seluruh card harus dapat dinavigasi melalui keyboard.

Gunakan link semantik menuju:

```txt
/projects/emqnet
/projects/dermsight
```

Jangan memakai `onClick` pada `div` sebagai pengganti link.

---

## 8. Empty state filter

Apabila filter tidak memiliki hasil, tampilkan empty state singkat:

```txt
No projects match this filter yet.
Try another category or view all work.
```

Tambahkan tombol:

```txt
View all projects
```

Jangan menyembunyikan section atau meninggalkan area kosong.

---

# BAGIAN B — PROJECT DETAIL

## 9. Route dinamis

Buat:

```txt
app/projects/[slug]/page.tsx
```

Slug awal:

```txt
emqnet
dermsight
```

Nilai slug harus mengikuti:

```txt
PROJECT_IDS
```

di `lib/tools/types.ts`.

Gunakan `generateStaticParams` apabila sesuai dengan arsitektur dan versi Next.js repository.

Untuk slug yang tidak dikenali:

```ts
notFound();
```

Jangan membuat fallback detail fiktif.

---

## 10. Tujuan halaman detail

Halaman detail ditujukan bagi:

* technical recruiter;
* engineering manager;
* AI engineer;
* machine-learning engineer;
* technical interviewer.

Namun halaman tetap harus mudah dipindai.

Jangan membuat dokumentasi akademik yang sangat panjang.

Gunakan progressive disclosure:

1. ringkasan cepat;
2. keputusan teknis;
3. data;
4. training;
5. evaluation.

Target panjang:

```txt
sekitar 4–6 viewport desktop
lebih panjang secara wajar pada mobile
```

Gunakan layout yang rapat dan terstruktur agar scroll tidak terasa melelahkan.

---

## 11. Section detail dan DOM ID

Setiap detail proyek memiliki ID yang sama:

```txt
overview
architecture
dataset
training
evaluation
```

Pastikan ID tersebut terdaftar di:

```txt
SECTION_IDS
```

Gunakan ID secara persis.

Setiap section dibungkus dengan `Section` atau wrapper section resmi proyek.

---

## 12. Project detail hero

Bagian atas halaman detail harus menampilkan:

* tombol kembali ke `/projects`;
* nama proyek;
* kategori;
* summary singkat;
* role Jordan dalam proyek;
* status;
* periode, hanya jika tersedia;
* teknologi inti;
* repository link, jika tersedia;
* demo link, jika tersedia;
* thumbnail atau ilustrasi besar.

Tambahkan quick facts maksimal empat item:

```txt
ROLE
FOCUS
PRIMARY STACK
STATUS
```

Jangan membuat quick facts berdasarkan asumsi.

Gunakan komposisi yang sama dengan About:

* typography besar;
* whitespace lega;
* foto atau visual di satu sisi;
* metadata monospaced;
* blok warna retro;
* framing siku;
* watermark halus apabila sesuai.

---

## 13. Sticky chapter navigation

Pada desktop, tambahkan navigasi ringkas menuju:

```txt
Overview
Architecture
Dataset
Training
Evaluation
```

Navigasi dapat berupa:

* rail tipis di sisi kiri;
* bar compact di bawah hero;
* sticky index.

Pada mobile gunakan horizontal scroll atau compact chapter selector.

Navigasi harus:

* menggunakan anchor semantik;
* mendukung keyboard;
* menunjukkan section aktif apabila sistem existing mendukung;
* tidak menutupi konten;
* tidak membuat client component besar hanya untuk efek kecil.

Apabila active-section tracking menambah kompleksitas yang tidak perlu, gunakan anchor statis yang tetap dapat digunakan.

---

## 14. Overview

Section:

```txt
id="overview"
```

Isi:

* masalah yang ingin diselesaikan;
* konteks proyek;
* pengguna atau domain yang dituju;
* alasan proyek dibuat;
* kontribusi Jordan;
* hasil utama yang dapat diverifikasi.

Gunakan maksimal:

* dua atau tiga paragraf pendek;
* satu problem statement;
* satu solution statement;
* maksimal tiga highlight.

Format yang disarankan:

```txt
THE PROBLEM
THE APPROACH
MY CONTRIBUTION
```

Jangan mengulang hero.

---

## 15. Architecture

Section:

```txt
id="architecture"
```

Jelaskan:

* komponen utama sistem;
* aliran data;
* model atau layanan yang digunakan;
* integrasi frontend/backend bila ada;
* alasan pemilihan arsitektur;
* trade-off yang benar-benar diketahui.

Tampilkan diagram apabila aset tersedia.

Diagram berat harus berasal dari:

```txt
public/illustrations/
public/lottie/
```

dan dibungkus komponen di:

```txt
components/scenes/
```

Jangan membangun diagram kompleks dari puluhan `div`.

Apabila aset belum tersedia:

* render diagram sederhana yang masih semantik;
* gunakan node dan connector SVG sederhana;
* tambahkan caption;
* tandai kebutuhan aset lanjutan dalam laporan akhir.

Diagram harus memiliki:

* caption;
* text alternative;
* urutan informasi yang tetap dapat dipahami tanpa animasi.

---

## 16. Dataset

Section:

```txt
id="dataset"
```

Tampilkan hanya data yang benar-benar tersedia:

* sumber dataset;
* ukuran dataset;
* kelas;
* pembagian train/validation/test;
* preprocessing;
* augmentation;
* tantangan data;
* batasan dataset.

Gunakan angka hanya jika tercantum dalam:

* config proyek;
* README proyek;
* CV;
* dokumentasi yang tersedia di repository.

Apabila informasi tidak tersedia, jangan mengarang.

Gunakan card statistik hanya untuk angka yang dapat diverifikasi.

Jika belum ada data detail, tampilkan penjelasan kualitatif yang jujur.

---

## 17. Training

Section:

```txt
id="training"
```

Tampilkan:

* objective;
* model atau baseline;
* training workflow;
* loss function, jika tersedia;
* optimizer, jika tersedia;
* hyperparameter penting, jika tersedia;
* experiment tracking, jika tersedia;
* keputusan yang berubah selama eksperimen.

Jangan mengarang:

* jumlah epoch;
* learning rate;
* batch size;
* GPU;
* waktu training;
* tuning result.

Buat section ini visual dan mudah dipindai dengan:

* numbered steps;
* compact process strip;
* training stages;
* selected experiment card.

Jangan membuat paragraf teknis panjang tanpa hierarchy.

---

## 18. Evaluation

Section:

```txt
id="evaluation"
```

Tampilkan metrik yang relevan berdasarkan proyek.

Contoh hanya jika tersedia:

```txt
accuracy
precision
recall
F1-score
IoU
AUC
inference time
```

Jangan menampilkan semua metrik hanya karena umum digunakan.

Evaluation harus menjelaskan:

* metrik yang digunakan;
* mengapa metrik tersebut penting;
* hasil yang dapat diverifikasi;
* keterbatasan;
* langkah pengembangan berikutnya.

Gunakan chart atau score cards hanya jika data tersedia.

Jangan membuat chart dengan data dummy yang terlihat nyata.

Apabila angka hasil belum tersedia, gunakan:

```txt
Evaluation details are not publicly documented yet.
```

atau copy serupa yang jujur.

---

## 19. Project conclusion

Setelah `evaluation`, tambahkan penutup compact tanpa DOM ID tambahan.

Isi:

* satu kalimat learning;
* satu kalimat next direction;
* CTA kembali ke semua proyek;
* repository;
* demo, apabila tersedia;
* tombol bertanya kepada chatbot.

Contoh CTA:

```txt
Explore other projects
Ask the assistant about this project
Open repository
```

---

# BAGIAN C — DATA DAN ARSITEKTUR

## 20. Sumber data tunggal

Gunakan:

```txt
lib/config/projects.ts
```

sebagai source of truth proyek.

Jangan membuat:

```txt
emqnet.ts
dermsight.ts
featured-projects.ts
project-card-data.ts
```

yang menduplikasi data sama.

Data proyek minimal memiliki tipe seperti:

```ts
type Project = {
  id: ProjectId;
  slug: ProjectId;
  title: string;
  shortDescription: string;
  category: string;
  tags: readonly string[];
  featured: boolean;
  thumbnail?: string;
  repositoryUrl?: string;
  demoUrl?: string;
  status?: string;
  role?: string;
  period?: string;
  overview: ProjectOverview;
  architecture: ProjectArchitecture;
  dataset: ProjectDataset;
  training: ProjectTraining;
  evaluation: ProjectEvaluation;
};
```

Sesuaikan tipe dengan kebutuhan nyata repository.

Gunakan readonly data dan `as const` apabila sesuai.

---

## 21. Sumber fakta proyek

Konten hanya boleh berasal dari:

1. CV Jordan yang tersedia di repository;
2. README repository proyek;
3. dokumentasi proyek di repository;
4. config yang sudah ada;
5. informasi GitHub publik;
6. aset proyek yang tersedia.

Jangan mengarang:

* metrik;
* arsitektur;
* dataset;
* teknologi;
* role;
* periode;
* hasil eksperimen;
* demo;
* pengguna;
* deployment;
* impact bisnis.

Jika data belum tersedia:

* gunakan placeholder yang jelas;
* atau sembunyikan field tersebut;
* laporkan pada hasil akhir.

Jangan menyajikan placeholder sebagai fakta final.

---

## 22. Filter dan chatbot memakai data sama

Tool:

```txt
filterProjects
```

harus menggunakan source data yang sama dengan `/projects`.

Tool:

```txt
openProjectDetail
```

harus menggunakan `PROJECT_IDS` yang sama dengan dynamic route.

Tool:

```txt
openProjectDemo
```

harus membaca `demoUrl` dari data server, bukan menerima URL buatan model.

Jangan memelihara daftar project terpisah di:

```txt
portfolio-data.ts
projects.ts
ProjectCard.tsx
tool-card data
```

Buat accessor server yang membaca source tunggal.

---

## 23. Integrasi navigation tools

Alur berikut harus bekerja:

```ts
navigateToPage("/projects");
scrollToSection("projects-featured");
highlightSection("projects-featured");
```

Alur filter:

```ts
navigateToPage("/projects");
filterProjects({ tag: "ai" });
scrollToSection("projects-all");
```

Alur detail:

```ts
openProjectDetail("emqnet");
scrollToSection("architecture");
highlightSection("architecture");
```

Navigasi lintas route harus menunggu route dan target DOM siap.

Gunakan mekanisme pending navigation action yang sudah tersedia.

Jangan menggunakan beberapa `setTimeout` arbitrer untuk menyinkronkan route dan scroll.

---

## 24. Highlight section

`highlightSection` harus bekerja pada:

```txt
projects-featured
projects-all
overview
architecture
dataset
training
evaluation
```

Gunakan `NestedFrame` dengan:

```txt
frame-green
```

Highlight:

* tidak boleh mengubah layout;
* tidak boleh menyebabkan content shift;
* tidak boleh berkedip berlebihan;
* tetap terlihat pada reduced motion;
* kembali ke state biasa secara halus.

---

## 25. Chat dock

Chatbot harus tetap tersedia pada:

```txt
/projects
/projects/emqnet
/projects/dermsight
```

Gunakan chat state yang sama dengan landing dan halaman About.

Desktop:

* compact dock di kanan bawah;
* dapat dibuka;
* dapat diminimalkan;
* menampilkan sedikit history;
* tidak menutupi CTA atau diagram.

Mobile:

* compact bottom dock;
* menghormati safe-area;
* halaman memiliki padding bawah yang cukup;
* tidak menutupi chapter navigation atau tombol.

Chatbot harus dapat menjawab follow-up seperti:

```txt
Explain the architecture.
What dataset was used?
Show the evaluation.
Open the demo.
Take me back to all projects.
```

---

# BAGIAN D — DESAIN VISUAL

## 26. Konsistensi dengan About

Halaman Projects harus terasa berasal dari website yang sama dengan `/about`.

Pertahankan:

* jenis typography;
* ritme spacing;
* penggunaan label monospaced;
* komposisi asimetris;
* sistem border;
* offset block;
* chat dock;
* warna utama;
* signature motion;
* watermark Sandbox.

Jangan menyalin layout About secara persis.

About adalah profile editorial.

Projects harus terasa seperti:

```txt
startup product lab
technical project archive
AI experiment showcase
```

---

## 27. Motif retro

Gunakan motif secara terbatas.

Rekomendasi untuk `/projects`:

```txt
KineticHeading
SplitCard
NestedFrame
PreviewCard
ColorBlockBar
```

Rekomendasi untuk detail:

```txt
NestedFrame
PreviewCard
PerspectiveScene atau diagram scene
ColorBlockBar
```

Pilih maksimal tiga motif dominan per halaman.

Jangan menempatkan:

* hex grid;
* seat grid;
* diagonal stripes;
* split card;
* perspective scene;

semuanya dalam satu viewport.

---

## 28. Sistem warna

Gunakan hanya token dari `app/globals.css`.

Background:

```txt
ink-base
ink-panel
ink-raised
cream-base
cream-raised
```

Aksen utama Projects:

```txt
pine
coral
slate
mustard
brick
plum
teal-dark
frame-green
```

Contoh pasangan featured:

```txt
EMQNET    → pine + coral
DermSight → plum + teal-dark
```

Pasangan tersebut boleh digunakan hanya jika cocok dengan aset dan theme proyek.

Jangan hardcode hex.

---

## 29. Larangan visual

Jangan gunakan:

* gradient;
* glow;
* backdrop blur;
* glassmorphism;
* soft shadow;
* rounded card;
* neon;
* animasi 3D berat;
* floating particles;
* efek parallax pada teks;
* card masonry acak;
* terlalu banyak icon;
* background penuh dari warna aset.

Seluruh sudut harus siku kecuali elemen yang memang berbentuk lingkaran.

Depth menggunakan blok solid offset.

---

# BAGIAN E — MOTION

## 30. Motion `/projects`

Gunakan motion primitive dari:

```txt
components/motion/
```

Motion yang dibutuhkan:

* hero fade dan translate pendek;
* satu signature reveal untuk featured projects;
* stagger project cards 40–80 ms;
* filter state transition cepat;
* hover lift 2–4px;
* border atau offset block transition;
* chat dock transition.

Jangan menganimasikan setiap tag secara terpisah.

---

## 31. Motion project detail

Gunakan:

* hero reveal;
* section reveal konsisten;
* architecture diagram reveal;
* highlight section;
* subtle chapter navigation state;
* satu signature color-block reveal.

Jangan membuat signature reveal pada kelima section.

---

## 32. Reduced motion

Pada `prefers-reduced-motion`:

* seluruh content langsung terlihat;
* tidak ada translate;
* tidak ada stagger;
* tidak ada animated diagram;
* diagram statis tetap tampil;
* filter tetap bekerja;
* highlight memakai frame statis;
* chat dock tetap berfungsi;
* tidak ada scroll behavior yang memaksa animasi.

---

# BAGIAN F — RESPONSIVE DAN ACCESSIBILITY

## 33. Responsive `/projects`

Desktop:

* featured layout editorial;
* grid maksimal dua atau tiga kolom;
* filter tetap terlihat;
* chat dock tidak menutupi kartu.

Tablet:

* featured menjadi satu kolom apabila ruang sempit;
* filter dapat membungkus;
* project card tetap seimbang.

Mobile:

* satu kolom;
* CTA mudah disentuh;
* filter dapat horizontal scroll atau wrap;
* text tidak terlalu besar;
* tidak ada horizontal overflow;
* bottom padding cukup untuk chat dock.

---

## 34. Responsive detail

Desktop:

* hero dua kolom;
* chapter navigation sticky;
* content memiliki reading width nyaman;
* diagram cukup besar.

Mobile:

* hero satu kolom;
* visual tidak melampaui viewport;
* chapter navigation tetap dapat digunakan;
* tabel diubah menjadi card atau horizontal scroll;
* diagram memiliki fallback;
* chat dock tidak menutupi konten.

---

## 35. Accessibility

Pastikan:

* satu `<h1>` per halaman;
* urutan heading benar;
* project card menggunakan link semantik;
* filter dapat digunakan dengan keyboard;
* focus ring terlihat;
* state aktif tidak hanya menggunakan warna;
* diagram memiliki caption dan text alternative;
* semua gambar mempunyai `alt`;
* external link mempunyai nama yang jelas;
* icon-only button mempunyai accessible name;
* timeline atau process tetap terbaca tanpa motion;
* section highlight tidak memindahkan keyboard focus;
* warna memiliki kontras yang memadai.

---

# BAGIAN G — SEO DAN PERFORMANCE

## 36. Metadata `/projects`

Tambahkan metadata:

```txt
title
description
canonical
Open Graph
```

Gunakan pola metadata yang sudah ada di repository.

Jangan mengarang klaim seperti:

```txt
award-winning
industry-leading
used by thousands
state-of-the-art
```

---

## 37. Metadata project detail

Setiap proyek memiliki metadata berdasarkan data proyek:

```txt
title
description
canonical
Open Graph image apabila tersedia
```

Gunakan `generateMetadata` apabila sesuai dengan versi Next.js.

Pastikan slug tidak valid menghasilkan `notFound`.

---

## 38. Performance

* Gunakan `next/image` untuk thumbnail lokal.
* Isi width dan height atau gunakan layout yang mencegah shift.
* Jangan mengirim seluruh data detail ke client hanya untuk filter.
* Jangan membuat seluruh `/projects` menjadi client component.
* Filter client hanya menerima data summary yang diperlukan.
* Detail proyek tetap server-rendered sebanyak mungkin.
* Dynamic import hanya jika benar-benar diperlukan.
* Jangan menambah animation library baru.
* Jangan menambah GitHub SDK baru.
* Jangan menambah state management library baru.

---

# BAGIAN H — STRUKTUR FILE

## 39. Struktur yang disarankan

```txt
app/
  projects/
    page.tsx
    [slug]/
      page.tsx

components/
  projects/
    ProjectsHero.tsx
    FeaturedProjects.tsx
    ProjectExplorer.tsx
    ProjectFilter.tsx
    ProjectCard.tsx
    ProjectDetailHero.tsx
    ProjectChapterNavigation.tsx
    ProjectOverview.tsx
    ProjectArchitecture.tsx
    ProjectDataset.tsx
    ProjectTraining.tsx
    ProjectEvaluation.tsx

lib/
  config/
    projects.ts
  projects/
    getProject.ts
    getProjects.ts
    filterProjects.ts
    projectTypes.ts
```

Sesuaikan dengan konvensi repository.

Ikuti aturan proyek:

* satu komponen per file;
* named export;
* identifier bahasa Inggris;
* jangan membuat banyak helper function dalam satu file;
* pindahkan unit pekerjaan berbeda ke file berbeda;
* hindari dependency baru;
* jangan mengubah lockfile tanpa alasan.

---

# BAGIAN I — KRITERIA SELESAI

## 40. Kriteria `/projects`

Implementasi dianggap selesai apabila:

1. `/projects` dapat dibuka.
2. `projects-featured` tersedia.
3. `projects-all` tersedia.
4. EMQNET dan DermSight tampil sebagai featured apabila datanya tersedia.
5. Featured section ringkas dan visual.
6. Filter menggunakan data proyek yang sama dengan chatbot.
7. Filter dapat digunakan melalui keyboard.
8. Project cards menuju route detail.
9. Tidak ada data proyek yang dikarang.
10. Halaman memiliki sedikit scroll dan tidak terasa seperti katalog panjang.
11. Theme konsisten dengan About.
12. Chat dock tetap tersedia.

---

## 41. Kriteria detail

Implementasi dianggap selesai apabila:

1. `/projects/emqnet` dapat dibuka.
2. `/projects/dermsight` dapat dibuka.
3. Slug tidak valid menghasilkan halaman 404.
4. `overview` tersedia.
5. `architecture` tersedia.
6. `dataset` tersedia.
7. `training` tersedia.
8. `evaluation` tersedia.
9. Chapter navigation bekerja.
10. Highlight section bekerja.
11. Diagram memiliki fallback atau text alternative.
12. Demo hanya tampil apabila URL tersedia.
13. Repository hanya tampil apabila URL tersedia.
14. Tidak ada angka atau hasil yang dikarang.
15. Chat dock tetap tersedia.
16. Reduced motion bekerja.

---

## 42. Kriteria integrasi chatbot

Alur berikut harus berhasil:

```txt
landing
→ navigateToPage('/projects')
→ scrollToSection('projects-featured')
```

```txt
landing
→ navigateToPage('/projects')
→ filterProjects('ai')
→ scrollToSection('projects-all')
```

```txt
/projects
→ openProjectDetail('emqnet')
→ scrollToSection('architecture')
→ highlightSection('architecture')
```

```txt
/projects/emqnet
→ openProjectDemo('emqnet')
```

History chat tidak boleh hilang saat berpindah route.

---

## 43. Verifikasi akhir

Setelah implementasi:

1. Jalankan lint resmi repository.
2. Jalankan type-check apabila terpisah.
3. Jalankan production build.
4. Uji `/projects`.
5. Uji `/projects/emqnet`.
6. Uji `/projects/dermsight`.
7. Uji slug tidak valid.
8. Uji filter dengan mouse.
9. Uji filter dengan keyboard.
10. Uji seluruh CTA.
11. Uji navigation tools.
12. Uji highlight seluruh section.
13. Uji chat history lintas route.
14. Uji reduced motion.
15. Uji desktop.
16. Uji tablet.
17. Uji mobile.
18. Pastikan tidak ada horizontal overflow.
19. Pastikan tidak ada broken image.
20. Pastikan tidak ada hydration warning.

Pada jawaban akhir, laporkan:

* file yang dibuat;
* file yang diubah;
* struktur data proyek;
* sumber fakta EMQNET;
* sumber fakta DermSight;
* field yang masih kosong;
* aset diagram yang digunakan;
* mekanisme filter;
* integrasi chatbot;
* hasil lint;
* hasil type-check;
* hasil build;
* pekerjaan yang masih tersisa.
