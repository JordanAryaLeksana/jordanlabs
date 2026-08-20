# AGENTS_INTRO_DESIGN.md — Jordan Portfolio Intro Design Contract

> Scope dokumen ini **hanya presentation/design layer untuk cinematic intro Home**.
> Dokumen ini dimaksudkan sebagai design override/addendum untuk `AGENTS.md` existing.
> Repository aktual tetap implementation source of truth.
> **Jangan rewrite architecture yang sudah bekerja. Jangan sentuh backend/RAG/tool lifecycle.**

---

# 1. Final visual direction

Gunakan arah:

> **Professional Demo Day / Startup Incubator sebagai foundation + playful Sandbox micro-elements sebagai personality.**

Bukan full hacker UI.
Bukan terminal UI.
Bukan dashboard.
Bukan fanpage K-drama.
Bukan slideshow foto dengan text overlay.

Target rasa:

- cinematic;
- young startup energy;
- product-minded;
- technical;
- ambitious;
- warm;
- recruiter-friendly;
- recognizably inspired by *Start-Up*;
- tetap terasa sebagai portfolio Jordan, bukan website drama.

Formula visual:

> **65% clean cinematic portfolio + 25% Sandbox/startup system + 10% playful personal detail.**

Foto/still owner yang saat ini dipakai **tetap digunakan**.
Jangan mengganti asset hanya untuk mengejar mockup.
Jika satu scene belum memiliki owner image final, pertahankan slot/fallback architecture existing.

---

# 2. Masalah current intro yang harus diperbaiki

Current intro secara engineering sudah benar, tetapi secara presentation terasa terlalu flat karena:

- setiap scene memiliki pola layout yang terlalu mirip;
- foto hanya berfungsi sebagai background;
- headline + paragraph + progress belum cukup membangun "startup world";
- tidak ada startup-state / Sandbox language yang menyatukan keenam scene;
- motion belum memiliki signature per scene;
- scene terasa seperti enam slide, bukan satu opening sequence;
- copy terlalu generik dan belum cukup terasa personal;
- header/branding besar di bagian atas mengganggu composition.

Target redesign **bukan membuat lebih ramai**, tetapi memberi tiap scene:
1. narrative role;
2. satu startup-specific visual cue;
3. satu signature motion;
4. satu memorable line;
5. shared cinematic system.

---

# 3. Intro chrome / header rule

## REMOVE persistent intro header

Pada cinematic intro **jangan tampilkan header website penuh**.

Tidak perlu permanent top-left:

- Jordan Arya Leksana;
- Software / AI Engineer;

karena identitas sudah menjadi isi Scene 01 dan elemen tersebut mengganggu framing cinematic.

## Yang boleh tetap berada di atas

Hanya utility yang benar-benar dibutuhkan:

### Desktop
- `SKIP INTRO` di kanan atas;
- optional sangat kecil `01 / 06` atau scene code bila composition membutuhkan;
- tidak ada nav utama;
- tidak ada logo besar;
- tidak ada social links.

### Mobile
- `SKIP` compact;
- tidak menutup wajah/focal subject;
- minimum 44px touch target.

Header normal website baru tampil **setelah intro selesai**.

---

# 4. Global composition

Setiap scene tetap full-viewport / full-bleed.

Gunakan layered composition:

```text
OWNER IMAGE
    ↓
CINEMATIC TONAL OVERLAY
    ↓
SCENE-SPECIFIC STARTUP DETAIL
    ↓
NARRATIVE TYPOGRAPHY
    ↓
MICRO STATUS / TAGS
    ↓
BOTTOM PROGRESS + CONTROLS
```

Foto harus tetap dominan.

Startup UI hanya "pemanis sistem", bukan card soup.

## Shared scene frame

Semua scene memiliki shared primitives:

- scene number;
- chapter label;
- headline;
- optional supporting copy;
- 1–3 compact startup tags/status;
- progress rail;
- previous/next/direct scene control;
- skip intro;
- optional per-scene ambient graphic;
- image focal/crop config.

Jangan membuat card besar di atas foto.

Gunakan border, label, status, line, marker, sticky-note motif secara hemat.

---

# 5. Sandbox visual vocabulary

Gunakan Sandbox sebagai **metaphor perjalanan membangun**, bukan literal clone UI drama.

Elemen yang boleh digunakan:

- `SANDBOX / ENTRY`;
- `APPLICATION / 01`;
- `BUILD STATUS`;
- `PROTOTYPE / 03`;
- `IDEA → BUILD → TEST → SHIP`;
- `DEMO DAY`;
- `OWNERSHIP / IN PROGRESS`;
- `AFTER HOURS`;
- `PRODUCT REVEAL`;
- compact lanyard/badge motif;
- sticky-note annotation;
- thin glass-board line / diagram;
- build timestamp;
- progress state;
- small stage-light marker;
- application/status ticket;
- simple line icons.

Hindari:

- fake command line yang panjang;
- matrix code;
- hacker green everywhere;
- cyberpunk glow;
- giant HUD;
- neon borders di semua elemen;
- banyak random floating particles;
- fake metrics yang terlihat seperti fakta.

Semua metadata dekoratif harus jelas sebagai **visual storytelling**, bukan canonical portfolio fact.

---

# 6. Copy system

Copy harus terdengar seperti Jordan sedang memperkenalkan perjalanan membangunnya, bukan corporate slogan.

Gunakan 3 layer:

1. **Chapter label** — pendek, seperti opening credit.
2. **Headline** — memorable.
3. **Supporting line** — opsional dan editable.

Semua supporting copy harus mudah diganti di scene config.

Gunakan schema conceptually seperti:

```ts
{
  id,
  chapter,
  label,
  headline,
  supportingCopy,
  tags,
  accent,
  motionPreset,
  image,
  crop
}
```

Jangan menaruh copy per scene langsung di JSX.

---

# 7. Scene-by-scene final design

## SCENE 01 — ENTRY / IDENTITY

### Narrative
Jordan memasuki "Sandbox".

### Label
`SANDBOX / ENTRY`

atau:

`THE APPLICANT`

### Headline default

> **Jordan Arya Leksana.**  
> **Software / AI Engineer.**

Alternatif editable:

> **I build where software meets AI.**

### Supporting copy placeholder

> `{{EDITABLE_PERSONAL_INTRO}}`

Default aman:

> Building useful systems through software, AI, curiosity, and constant iteration.

### Startup component

Gunakan satu **Sandbox Entry Ticket** kecil.

Contoh visual:

```text
◇ SANDBOX / ENTRY
  TRACK / SOFTWARE + AI
  STATUS / BUILDING
```

`STATUS / BUILDING` adalah narrative label, bukan employment fact.

### Composition

- text anchor kiri bawah / kiri tengah;
- wajah utama di image tetap visible;
- Sandbox ticket tepat di bawah supporting copy;
- foto tidak ditutup giant gradient hitam lebih dari yang diperlukan.

### Signature motion — `sandbox-entry`

Gunakan Framer Motion:

- background slow push `scale 1.00 → 1.035`;
- scene label slide-up 12–16px;
- headline reveal per line, bukan per-character;
- thin outline Sandbox ticket menggambar dari kiri ke kanan;
- status dot pulse **sekali**, bukan infinite;
- progress rail masuk setelah headline.

Duration feel: ±1.0–1.3 sec.
User dapat next sebelum motion selesai.

---

## SCENE 02 — BUILDER / HACKATHON

### Narrative
Jordan bukan hanya punya ide — ia membangun.

### Label
`BUILD STATUS`

atau:

`THE BUILDER`

### Headline default

> **Build. Ship. Iterate.**

Alternatif lebih personal:

> **Ideas matter when they become real.**

### Supporting copy

> `{{EDITABLE_BUILDER_COPY}}`

Default:

> Short loops. Honest feedback. Better versions.

### Startup component

Gunakan **Prototype Status Strip**, sangat compact.

Contoh:

```text
PROTOTYPE / 03
IDEA ━━━ BUILD ━━━ TEST ━━━ SHIP
```

Boleh ada timestamp kecil visual:

`23:48`

Jangan jadikan fake live clock.

### Optional visual accent
2–3 sticky note fragments di edge/background:

- `BUILD`
- `TEST`
- `ITERATE`

Mereka harus subtle dan tidak menjadi React component terpisah.

### Signature motion — `hackathon-build`

- image pan 1–2% horizontal;
- headline words muncul sequential: Build → Ship → Iterate;
- prototype track fill 0 → target state;
- satu sticky note slide/settle kecil;
- no bounce;
- no continuous blinking.

Duration: ±0.9–1.2 sec.

---

## SCENE 03 — ENGINEER / TECHNICAL

### Narrative
Menunjukkan cara Jordan berpikir.

### Label
`THE TECHNICAL CHAPTER`

atau:

`ENGINEERING MODE`

### Headline default

> **AI. Software. Systems.**

Alternatif:

> **Turn complexity into something useful.**

### Supporting copy

> `{{EDITABLE_TECHNICAL_COPY}}`

Default:

> Research, engineering decisions, experiments, and evidence behind the work.

### Startup component

Gunakan **Glassboard Trace**:
- 2–4 thin connection lines;
- small node labels;
- satu flow kecil.

Contoh:

```text
INPUT → REASON → BUILD → VERIFY
```

Tidak perlu diagram arsitektur nyata kecuali berasal dari canonical data.

### Small tags
- `RESEARCH`
- `EXPERIMENTS`
- `EVIDENCE`

### Signature motion — `technical-trace`

Framer Motion + SVG:

- SVG `pathLength: 0 → 1`;
- 2–3 node labels fade only after line reaches them;
- headline color emphasis datang terakhir;
- background slow focus/push subtle.

No Three.js.
No canvas.
No external animation library.

Duration: ±1.1 sec.

---

## SCENE 04 — GROWTH / DEMO DAY

### Narrative
Ini emotional/startup climax.

### Label
`DEMO DAY`

atau:

`OWNERSHIP / IN PROGRESS`

### Headline default

> **Still learning.**  
> **Still building.**  
> **Still moving forward.**

Alternatif lebih kuat:

> **Build. Present. Learn. Repeat.**

### Supporting copy

> `{{EDITABLE_GROWTH_COPY}}`

Default:

> Every role is another chance to communicate clearly, take responsibility, and improve.

### Startup component

Gunakan **Demo Day Stage Marker**:

```text
● PRESENTING
DEMO DAY / 04
```

Boleh ada thin light sweep / stage line.

Jangan membuat fake investor dashboard atau traction number.

### Signature motion — `demo-day`

- image exposure/brightness subtly naik seolah lampu panggung menyala;
- small horizontal light sweep sekali;
- headline first line enters;
- second/third line move upward in stagger;
- `PRESENTING` dot activates once;
- scene progress accent moves decisively ke 04.

Duration: ±1.0–1.25 sec.

---

## SCENE 05 — PERSONAL / AFTER HOURS

### Narrative
Jordan bukan CV berjalan.

### Label
`AFTER HOURS`

atau:

`BEYOND THE RÉSUMÉ`

### Headline default

> **Technology is part of the story.**  
> **Not all of it.**

Alternatif:

> **I build systems. I also collect stories.**

### Supporting copy

> `{{EDITABLE_PERSONAL_COPY}}`

Default:

> Music, films, K-dramas, reflection, and the human side behind every product.

### Startup component

**Kurangi** startup chrome pada scene ini.

Gunakan hanya quiet tags:

- `MUSIC`
- `FILMS`
- `K-DRAMA`
- optional user-defined personal interest.

Scene ini harus menjadi breathing room.

### Signature motion — `after-hours`

- very slow image drift;
- text reveal lebih lembut;
- tags fade stagger;
- subtle blurred city-light / bokeh accent boleh berasal dari image, jangan generate particles;
- tidak ada progress bar animation yang agresif.

Duration: ±1.2–1.4 sec.

---

## SCENE 06 — PRODUCT REVEAL / JORDAN AI

### Narrative
Seluruh opening ternyata mengarah ke interface utama.

### Label
`PRODUCT REVEAL`

atau:

`THE INTERVIEW STARTS HERE`

### Headline default

> **You've met Jordan.**  
> **Now meet Jordan AI.**

### Supporting copy

> Ask, explore, evaluate, and navigate the portfolio through one intelligent workspace.

### Startup component

Gunakan satu compact **AI Capability Rail**:

```text
ASK  ·  EXPLORE  ·  EVALUATE  ·  ACT
```

Di bawah/sekitar CTA:

`ENTER THE STUDIO →`

Jangan membuat 4 giant cards.

### Signature motion — `product-reveal`

Ini adalah motion paling kuat dari keenam scene, tapi tetap restrained.

Sequence:

1. current background settles;
2. small `PRODUCT REVEAL` label draws in;
3. “You've met Jordan.” masuk lebih tenang;
4. “Jordan AI” reveal memakai mask/wipe dari kiri;
5. capability rail muncul sequential;
6. CTA enters terakhir;
7. optional tiny AI state dot turns active once.

No neon AI orb.
No robot icon besar.
No fake terminal.

Duration ±1.2–1.5 sec.

Setelah klik `ENTER THE STUDIO`, transition ke Jordan AI welcome state harus terasa sebagai **continuation**, bukan pindah halaman.

---

# 8. Shared progress redesign

Current six horizontal lines dapat dipertahankan konsepnya, tetapi upgrade menjadi **chapter rail**.

Desktop:

```text
01 ENTRY ── 02 BUILD ── 03 ENGINEER ── 04 DEMO ── 05 LIFE ── 06 AI
```

Namun default visual cukup menampilkan:
- segment;
- active number;
- active label on hover/focus atau scene active.

Jangan memakan ruang seperti full navigation bar.

### Interaction

- click segment → direct scene;
- arrow left/right;
- keyboard ArrowLeft / ArrowRight bila tidak konflik;
- Escape / Skip behavior existing tetap;
- visible focus;
- user action harus interrupt animation.

### Motion

Active rail menggunakan `layoutId` / width transition.
Tidak boleh ada looping shimmer.

---

# 9. Scene transition language

Jangan gunakan transisi berbeda yang random di setiap scene.

Gunakan satu shared scene transition:

### Image
- crossfade;
- small camera drift;
- optional directional pan sesuai config.

### Typography
- mask reveal / y translate kecil;
- stagger per line/word group.

### Startup element
- per-scene signature motion.

Formula:

> **Shared cinematic transition + one signature startup motion per scene.**

Scene change target feel:
- crossfade 450–650ms;
- content transition 350–650ms;
- signature animation boleh sampai ±1.2s;
- navigation tidak pernah dikunci sampai animation selesai.

---

# 10. Motion technology decision

## REQUIRED
Gunakan **Framer Motion existing** sebagai primary motion library.

Gunakan untuk:
- `AnimatePresence`;
- scene enter/exit;
- variants;
- `layoutId`;
- stagger;
- mask/clip-path where reasonable;
- SVG `pathLength`;
- progress;
- reduced-motion branches.

## CSS
Gunakan CSS untuk:
- overlay;
- simple hover;
- static gradient;
- texture;
- responsive crop;
- tiny non-state decoration.

## DO NOT ADD
Jangan menambah:
- GSAP;
- Three.js;
- Lottie;
- Rive;
- Lenis;
- animation dependency baru;

untuk intro ini.

Framer Motion + CSS sudah cukup.

Dependency baru hanya boleh ditambah jika agent dapat membuktikan behavior memang tidak reasonable dengan stack existing. Untuk target redesign ini, asumsi awal: **tidak diperlukan**.

---

# 11. Motion preset architecture

Jangan membuat conditional animation berdasarkan scene number.

Gunakan data-driven preset:

```ts
type IntroMotionPreset =
  | "sandbox-entry"
  | "hackathon-build"
  | "technical-trace"
  | "demo-day"
  | "after-hours"
  | "product-reveal";
```

Scene config memilih preset.

Concept:

```ts
const introScenes = [
  {
    id: "identity",
    motionPreset: "sandbox-entry",
    ...
  },
  {
    id: "builder",
    motionPreset: "hackathon-build",
    ...
  }
];
```

Lalu central motion registry:

```ts
const introMotionPresets = {
  "sandbox-entry": {...},
  "hackathon-build": {...},
  "technical-trace": {...},
  "demo-day": {...},
  "after-hours": {...},
  "product-reveal": {...}
};
```

Avoid:

```ts
if (currentScene === 2) ...
if (currentScene === 4) ...
```

---

# 12. Component boundaries

Jangan membuat component untuk tiap dekorasi.

Target conceptual structure:

```text
CinematicIntro
├── SceneBackdrop
├── IntroNarrative
├── SceneAccent
├── IntroProgress
└── IntroControls
```

`SceneAccent` boleh memilih visual primitive berdasarkan scene config/preset, tetapi tetap satu responsibility.

Tidak perlu:

- `StickyNote.tsx`;
- `HackathonClock.tsx`;
- `DemoDayLamp.tsx`;
- `SandboxBox.tsx`;
- `RooftopLight.tsx`;

kecuali object tersebut benar-benar reusable / interactive.

Complex visual, simple architecture.

---

# 13. Data vs hardcoded rules

Presentation copy boleh static di scene config.

Contoh aman:

- `BUILD STATUS`;
- `STILL BUILDING`;
- `DEMO DAY`;
- `AFTER HOURS`;
- `PRODUCT REVEAL`.

Canonical fact tidak boleh diduplikasi di intro config.

Jangan hardcode:
- jumlah tahun experience;
- project count;
- production metric;
- company facts;
- CV facts;
- contact URL;
- role claims;

jika data tersebut sebenarnya dimiliki canonical application data.

Jika copy membutuhkan fakta, compose dari canonical source atau gunakan placeholder sampai owner mengisinya.

---

# 14. Owner-editable copy

Semua personal supporting copy harus mudah diedit.

Agent boleh menggunakan defaults dari dokumen ini, tetapi schema harus memungkinkan owner menggantinya tanpa mengedit layout.

Recommended fields:

```ts
headline
supportingCopy
microCopy
tags
```

Bila owner belum mengisi sebuah optional field:
- jangan render empty box;
- jangan render placeholder di production;
- layout harus tetap bagus.

---

# 15. Image rules

Owner images existing tetap menjadi visual source untuk six-scene intro.

Pertahankan:
- desktop crop;
- mobile crop;
- owner image slot;
- fallback behavior;
- optimized WebP;
- one full-bleed image only.

Jangan menumpuk dua scene image.

Jangan mengubah asset source hanya karena desain mockup memakai gambar lain.

Visual mockup adalah **layout/motion reference**, bukan asset replacement instruction.

---

# 16. Responsive composition

## Desktop

Boleh:
- asymmetrical composition;
- text 40–50% viewport;
- startup micro-element di negative space;
- larger contextual graphics;
- chapter rail horizontal.

## Mobile

Rule:

> **one scene → one focus → one action.**

Mobile:
- headline 2–4 lines maksimum;
- supporting copy singkat;
- tags max 2 visible;
- startup graphics dikurangi;
- no glass-board diagram besar;
- bottom rail compact;
- focal image crop khusus;
- text boleh turun ke lower third;
- no desktop-style metadata panel.

Scene 06 mobile:
- `ASK · EXPLORE · EVALUATE · ACT` boleh wrap 2×2 atau horizontal compact;
- CTA tetap jelas;
- safe area respected.

---

# 17. Reduced motion

`prefers-reduced-motion` wajib dipertahankan.

Reduced motion mode:
- no image drift;
- no mask travel panjang;
- no path draw;
- no light sweep;
- no sequential long stagger;
- scene state tetap jelas.

Gunakan:
- immediate/short opacity change;
- static final state;
- current behavior yang menampilkan accessible final chapter jangan dirusak.

Reduced motion tidak boleh kehilangan:
- copy;
- progress;
- controls;
- skip;
- Jordan AI entry.

---

# 18. Accessibility

Preserve existing hardened behavior:

- focus trap intro;
- focus restoration;
- Escape behavior;
- keyboard controls;
- reduced motion;
- semantic button;
- visible focus;
- screen reader labels;
- touch target;
- no animation blocking input.

Decorative startup labels jangan masuk screen reader jika tidak membawa informasi yang berguna.

---

# 19. Performance

Target:
- no video background required;
- no WebGL;
- no heavy particles;
- no extra animation library;
- reuse optimized scene assets;
- animate primarily `transform`, `opacity`, clip/mask where safe;
- avoid expensive blur animation;
- no layout thrashing.

Image is atmosphere.
Motion is storytelling.
Neither may make first interaction slow.

---

# 20. Copy defaults — owner may replace

These are defaults, not immutable product facts.

### 01 ENTRY
**Jordan Arya Leksana.**  
**Software / AI Engineer.**

> Building useful systems where software, AI, and curiosity meet.

### 02 BUILDER
**Build. Ship. Iterate.**

> Short loops. Honest feedback. Better versions.

### 03 ENGINEER
**AI. Software. Systems.**

> Research, engineering decisions, experiments, and evidence behind the work.

### 04 GROWTH
**Still learning.**  
**Still building.**  
**Still moving forward.**

> Every role is another opportunity to take ownership and improve.

### 05 PERSONAL
**Technology is part of the story.**  
**Not all of it.**

> Music, films, K-dramas, reflection, and the human side behind every product.

### 06 AI REVEAL
**You've met Jordan.**  
**Now meet Jordan AI.**

> Ask. Explore. Evaluate. Act.

CTA:

`ENTER THE STUDIO →`

---

# 21. Visual approval checklist

Do not approve intro until:

- [ ] intro no longer feels like six static slides;
- [ ] full website header is absent during intro;
- [ ] each scene has exactly one clear startup/Sandbox cue;
- [ ] each scene has one signature motion;
- [ ] all motion uses Framer Motion/CSS unless strongly justified;
- [ ] owner images remain source of truth;
- [ ] Sandbox styling supports the image instead of covering it;
- [ ] no terminal/hacker/cyberpunk takeover;
- [ ] Scene 04 clearly feels like a Demo Day climax;
- [ ] Scene 05 visibly breathes and becomes more human;
- [ ] Scene 06 feels like a product reveal;
- [ ] Jordan AI is more memorable than any decorative UI;
- [ ] direct scene controls/skip still work;
- [ ] mobile composition is intentional;
- [ ] reduced-motion path remains complete;
- [ ] no canonical facts are invented;
- [ ] no unnecessary dependency was added;
- [ ] `npm run lint` passes;
- [ ] `npm run build` passes.

---

# 22. Agent implementation instruction

Implement this redesign as a **presentation-layer refinement of the existing data-driven six-scene intro**.

Before editing:
1. inspect current intro renderer;
2. inspect scene config;
3. inspect `SceneBackdrop`;
4. inspect current Framer Motion usage;
5. inspect existing reduced-motion/focus behavior;
6. preserve current owner-image + fallback mapping.

Prefer modifying:
- scene config schema;
- reusable intro renderer;
- central motion preset registry;
- existing styles/tokens;

rather than replacing the intro architecture.

Do not touch:
- RAG;
- AI tools;
- Jordan AI backend behavior;
- canonical application data;
- unrelated page redesign.

When done, report:
- files changed;
- new scene config fields;
- motion preset per scene;
- responsive changes;
- accessibility/reduced-motion preservation;
- lint/build results;
- any owner copy/image still requiring manual input.

---

# 23. Final north star

The visitor should feel:

> “I just entered a young startup story.”

Then:

> “Jordan is not only showing projects; he thinks like a builder.”

And finally:

> “Interesting — the portfolio itself becomes interactive through Jordan AI.”

If the result only feels like:
- dark photos;
- big typography;
- colored words;
- progress lines;

then the redesign is **not finished yet**.

The Sandbox/startup feeling must come from the combination of:
**scene meaning + micro UI + motion + copy + pacing**, not from the image alone.
