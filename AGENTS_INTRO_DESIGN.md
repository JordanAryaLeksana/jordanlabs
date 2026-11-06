# Home Intro — Design & Engineering Spec (3D)

This document is the binding spec for the Home intro. It **replaces** the
previous photo-based "Start-Up / Sandbox" six-scene intro, which was removed
because its stills were K-drama promotional images (not Jordan, not
licensable) and because it never said who Jordan is, what he does now, or
what he is looking for.

The earlier rule "no Three.js / WebGL / canvas" is **lifted** for this
intro only. Content pages keep their lightweight Framer Motion treatment.

## 1. Goal

A recruiter should understand, in about 45 seconds and without reading the
CV, the following:

1. Who Jordan is: name, headline, education, location.
2. What he builds: full-stack products, shipped to production.
3. What he is doing now: IntentCut (Station Parfume is noted as in development).
4. Real-world impact: Pertamina industrial AI and TETA smart farming.
5. Research rigour: EMQNET thesis and DermSight.
6. What he is looking for, in priority order: Software/Backend Engineer first, then AI Engineer, freelance through Upwork, and remote or international work.

Every chapter keeps the CV, LinkedIn, Upwork, GitHub and email one click away (recruiter bar).

## 2. Source of truth

- All copy comes from `lib/config/intro.ts`. That file derives everything from canonical config: `profile.ts`, `projects.ts`, `experience.ts`, `skills.ts` and `links.ts`.
- Canonical config mirrors `public/Jordan Arya Leksana - Software Engineer Resume.pdf`.
- **Never hardcode a metric or claim in a component.** Add it to canonical config first. For example, the IntentCut highlight reel numbers come from `projects.ts` → `highlights`.
- Station Parfume must always be described as *in development / not in production*.

## 3. Architecture

| Concern | File |
| --- | --- |
| Lifecycle (intro → exiting → done), once-per-session, replay | `lib/intro/useIntroSequence.ts`, `lib/intro/introSession.ts` |
| Timeline state shared by DOM + 3D (chapter, autoplay, hovered layer, story progress, …) | `lib/intro/introStore.ts` |
| Reduced motion / WebGL / device tier (hydration-safe) | `lib/intro/useIntroEnvironment.ts` |
| Controller: modal dialog, focus trap/restore, Esc, dynamic 3D import, role-card actions | `components/interfaces/ui/IntroSequence.tsx` |
| DOM overlay: chapter copy, rail, autoplay, wheel/swipe/keys, recruiter bar | `components/pages/layout/OpeningSequence.tsx`, `RecruiterBar.tsx` |
| Static poster (reduced motion, no WebGL, while the 3D chunk loads) | `components/pages/layout/IntroStaticStage.tsx` |
| 3D world | `components/interfaces/intro3d/*` |

The rules:

- **One `<Canvas>`, one world.** Six stations are laid out along an S-curve (`intro3d/world.ts`). `CameraRig` flies a Catmull-Rom path through them, so a chapter change is one continuous camera move.
- **The DOM owns the text.** Facts are HTML, so they are selectable, translatable and read by screen readers. The canvas is `aria-hidden` and decorative. Every 3D interaction has a DOM equivalent: layer buttons, deployment tabs and role buttons.
- **`introStore` is the single owner of timeline state.** React reads it via `useIntroState(selector)`. The 3D scene reads `introStore.getState()` inside `useFrame`, so the canvas never re-renders.
- **three.js loads with `next/dynamic({ ssr: false })`.** The chapter copy and static poster are server-rendered, so LCP is text.
- **Quality tiers.** `PerformanceMonitor` drops to the low tier: fewer particles, no Bloom/Vignette. `AdaptiveDpr` is enabled. Stations far from the camera are hidden.
- **Mutate per-frame values through refs.** Use `materialRef.current.uniforms…` or `useRef` objects, never memoised objects. This is required by the React compiler lint rules.
- Fonts for 3D text are local OFL files in `public/fonts/`. There are no CDN fetches.

## 4. Chapters

| # | Chapter | 3D scene | Interaction |
| --- | --- | --- | --- |
| 1 | Hello: name, headline, ITS '26, Surabaya | GPU particle galaxy that spells "JORDAN", then disperses around a glowing portrait card (`public/foto_jordan.jpg`) | Cursor repels particles; tap re-forms the name; the card tilts toward the pointer |
| 2 | Full-stack | Exploded 5-layer architecture stack (Frontend → APIs → Data → DevOps → AI) with a data packet travelling through it | Hover or tap a layer; the DOM lists where each layer shipped (LIVE badges) |
| 3 | Now: IntentCut | Curved film strip; 7 real frames from IntentCut's rendered First Cut fly from "raw footage" into story order | Drag to scrub raw ↔ story; the readout counts 04:09:00 → 00:00:56 |
| 4 | Impact | Pertamina solvent pump with a live LSTM reconstruction-error trace (the anomaly spike crosses the threshold and the seal flashes); TETA rice field with 5 pulsing LoRa/MQTT nodes, a gateway and a YOLOv5 scan cone | Tabs or click to switch deployments |
| 5 | Research | Stylised dot map of Indonesia with 24 pulsing station beacons (illustrative positions) and H/D/Z geomagnetic traces | Drag to rotate; hover a station |
| 6 | Looking for | Glowing core with 4 orbiting role cards; Software Engineer is the largest, marked PRIORITY | Click a card: ask Jordan AI for a role evaluation, or open Upwork |

## 5. Motion

- Camera: damped progress (λ≈2.3) along the path, a small pull-back mid-flight, pointer parallax and hand-held breathing.
- Copy: per-word mask reveal plus staggered fade/blur-in using `FUNCTIONAL_EASE`.
- Autoplay: per-chapter `holdMs` (about 7–8 s). It stops on the first deliberate interaction, has a pause button, pauses while the tab is hidden, and is off under reduced motion. Chapter 6 never auto-exits.
- Exit: the camera pushes into the scene while the overlay fades out (0.7 s).

## 6. Recruiter experience

- The recruiter bar (Download CV, LinkedIn, Upwork, GitHub, Email) and Skip are in the header of every chapter.
- Navigation: wheel or trackpad, vertical swipe, ← → ↑ ↓, Home/End, the chapter rail, and the next/previous buttons. Esc skips.
- The intro plays **once per session**. Returning to `/` skips it before first paint (inline bootstrap script plus `html[data-intro-seen]`). "Replay intro" sits on the Jordan AI home screen.
- `?skipIntro=1` skips the intro, and `?freezeIntro=intro` keeps it open for development.

## 7. Accessibility

- The overlay is a modal `role="dialog"`, receives focus on open, traps Tab, closes with Esc, and restores focus on close.
- Each chapter is a `<section>` labelled by its `<h2>`. A polite live region announces "Chapter n of 6".
- Under reduced motion or without WebGL, the static poster and all six chapters stay reachable, with no autoplay.
- Targets are at least 40–44 px, with visible `frame-green` focus rings.
