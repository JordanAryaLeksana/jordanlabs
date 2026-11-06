# IntentCut

## Project overview

IntentCut ("Your AI Storytelling Director") is an AI video editor that Jordan Arya Leksana built solo in 10 days, from 26 October to 4 November 2026, for the Meta Global AI Developer Hackathon 2026 (Indie Developer track, theme "Build for Your World"). It turns raw footage into a source-grounded first cut, or long footage into a short highlight reel, with creator-controlled revisions and real MP4 export. Its motto: "AI proposes the story. The creator directs it. FFmpeg makes it real."

It is Jordan's most recent project. Demo film: https://youtu.be/sISMP5Q1CoE. Repository: https://github.com/JordanAryaLeksana/intentcut. It is local-first by design and is not publicly deployed, because it has no user authentication.

## Problem and users

For travel creators, solo filmmakers and educators, the hardest part of editing often comes before fine-grained cutting: deciding which moments matter and what order they belong in. IntentCut gives them an inspectable starting edit, not a replacement for a professional editor.

## Architecture and tech stack

- Frontend: Next.js and React (TypeScript, Tailwind CSS, TanStack Query, Zustand), with a 3D landing page built in Three.js / React Three Fiber.
- Backend: Python 3.12, FastAPI, Pydantic v2, SQLAlchemy 2.1, PostgreSQL 17 with versioned SQL migrations.
- AI: Meta Muse models through an OpenAI-compatible API. Muse Spark for video understanding and the Story Director, Muse Image for cover images, Muse voice transcription for captions.
- Media: FFmpeg and FFprobe render and verify H.264/AAC MP4 files.
- Background worker: AI calls never run inside HTTP requests. A separate worker claims jobs with database leases and heartbeats and recovers from crashes.
- Trust boundary: the backend, not the model, owns file identities, original timestamps, budgets and edit-plan validation. Invalid or invented references from the model are rejected before rendering.

## How it works

1. The creator creates a project, uploads footage (uploads are idempotent) and describes the story.
2. AI First Cut (several clips) or AI Highlights (one long video): the backend cuts short time windows. For long videos it samples up to 48 small frames across the timeline and up to 24 more around promising matches.
3. Muse Spark describes each window. The Story Director picks windows and their order.
4. The backend validates the edit plan against the real source files, then FFmpeg renders and checks the MP4.
5. The creator watches, revises the story by prompt, edits captions (subtitled export) and generates a cover image, then re-renders.

Cost guards cap media files, windows and inference calls per job, and paid processing stays off unless explicitly enabled.

## Results and engineering highlights

- A developer-run audit on 3 November 2026 recorded 479 passing unit tests and 264 passing backend integration tests, a production Next.js build and real MP4 generation.
- In testing, a 4-hour, 6.4 GB walking video went through AI Highlights and produced a playable ~56-second highlight reel (8 candidate moments, 7 selected).
- Fixed a disk-space bug where preview requests copied the whole source file each time (about 75 GB of temporary files) by staging previews with same-filesystem hard links.
- 41 commits in 10 days with a pull-request workflow, all by Jordan.
- It grew out of Jordan's earlier agentic-video-editor prototype (clean architecture, atomic job claiming).
