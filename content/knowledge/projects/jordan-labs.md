# Jordan Labs

## Project overview

Jordan Labs is this portfolio website (https://jordanlabs.my.id), a self-initiated AI-native portfolio built by Jordan Arya Leksana in 2026. Visitors can talk to Jordan AI instead of searching every page: it answers questions about Jordan's background, projects and experience from curated portfolio knowledge, and it can act: navigate pages, filter projects and skills, open the CV, GitHub, LinkedIn or Upwork, and generate recruiter-focused role evaluations. A 3D interactive intro introduces Jordan, what he is doing now and what he is looking for.

## Architecture and tech stack

- Next.js 16, React 19, TypeScript, Tailwind CSS, Framer Motion, Three.js / React Three Fiber for the 3D intro.
- Vercel AI SDK with an OpenAI-compatible model provider, streaming responses and schema-validated tool calling.
- Hybrid RAG: lexical scoring plus embedding similarity over Markdown knowledge, so answers come from curated evidence.
- Deterministic routing and entity guards run before any free-form model call, so links, the CV, navigation and known projects never depend on model guesses. External links are allowlisted.
- Redis for per-minute and per-day rate limits and a daily token budget that controls LLM cost.
- Deployment: a Docker image built by GitHub Actions, pushed to GitHub Container Registry (GHCR) and deployed to a Linux VPS behind Nginx and HTTPS, with a health check.

## What Jordan learned

Building practical tool-calling workflows where an assistant chooses between answering from retrieved context and executing a specific action, and keeping an LLM product affordable and safe in production.
