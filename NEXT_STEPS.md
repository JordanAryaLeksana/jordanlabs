# UI Redesign — Next Steps

## Completed in the current unit

- Refactored the home intro into a short, skippable cinematic sequence that appears once per session and respects reduced motion.
- Added a reusable scene backdrop and centralized page-to-scene mapping.
- Added optimized original WebP scenes for Home, About, Projects/Detail, Experience, and Contact.
- Added stable owner-image slots under `public/scenes/owner/`; generated scenes remain preserved as automatic fallbacks.
- Added independently configurable mobile and desktop crop positions for every owner scene, plus placement and licensing guidance.
- Restyled the Jordan AI welcome state, prompt suggestions, composer, and persistent dock while preserving the existing provider/tool lifecycle.
- Added the active-conversation presentation state: the scene settles into the background, welcome prompts transition out, message history gains priority, and the composer respects mobile safe areas and keyboard zoom behavior.
- Made the active-conversation transition resolve instantly when the visitor requests reduced motion.
- Audited the supplied owner scenes, connected the supplied Experience image through an optimized WebP runtime asset, and verified the remaining scene slots and focal crops.
- Restored the original generated WebPs as full-bleed backdrops and mixed every owner scene into a contained, uncropped cinematic frame.
- Applied the cinematic scene layer to every primary route and project detail.
- Preserved existing route and stable section identifiers.
- Restyled below-the-fold GitHub, project-detail, experience, and contact surfaces into restrained editorial/product UI.
- Removed unconfigured social channels from the visitor-facing Contact page while preserving canonical contact configuration.
- Removed orphaned legacy presentation roots and their exclusive retro dependencies after auditing the import graph; docs-only primitives remain intact.
- Completed responsive regression across mobile, tablet, and desktop renders; fixed first-screen reveal, mobile composition, full-screen chat dock, safe-area behavior, overflow locking, and keyboard focus restoration.
- Restricted `/docs-visualization` to development mode with `noindex`; its retained retro primitives are no longer part of the public portfolio surface.
- Redesigned Jordan AI conversation and generative UI: editorial assistant prose, compact user messages, shared evidence/resource surfaces, structured evaluation, and lightweight navigation status.
- Removed the remaining public retro treatments from About, project-detail headings, and Footer; experimental typography/reveals now remain development-only.
- Verified deterministic chat flows for CV, contact, navigation, and skills. Project filtering returned its controlled error contract because the configured local Ollama service was unavailable.

## Next concrete concerns

1. With Ollama running, repeat live project-filter and grounded evaluation regression; then verify client scroll/highlight execution in a browser conversation. The service was rechecked at `127.0.0.1:11434` and was still unavailable.
2. Confirm licensing for every owner scene. If available, replace the low-resolution Home/About exports and consider a rooftop/reflection image for About; the current About pitch scene is usable but narratively overlaps Experience.

## Validation status

- `npm run lint`: passed.
- `npm run build`: passed outside the restricted sandbox; the initial sandbox attempt failed only because Turbopack was not permitted to bind a local port.
