# UI Redesign — Next Steps

## Completed in the current unit

- Replaced the old loading/brand intro with a data-driven six-scene opening sequence that appears on each Home load, supports direct chapter controls and skip, and presents a static final chapter for reduced-motion users.
- Added a reusable scene backdrop and centralized page-to-scene mapping.
- Added optimized original WebP scenes for Home, About, Projects/Detail, Experience, and Contact.
- Added stable owner-image slots under `public/scenes/owner/`; generated scenes remain preserved as automatic fallbacks.
- Added independently configurable mobile and desktop crop positions for every owner scene, plus placement and licensing guidance.
- Restyled the Jordan AI welcome state, prompt suggestions, composer, and persistent dock while preserving the existing provider/tool lifecycle.
- Added the active-conversation presentation state: the scene settles into the background, welcome prompts transition out, message history gains priority, and the composer respects mobile safe areas and keyboard zoom behavior.
- Made the active-conversation transition resolve instantly when the visitor requests reduced motion.
- Audited the supplied owner scenes, connected the supplied Experience image through an optimized WebP runtime asset, and verified the remaining scene slots and focal crops.
- Split the scene sources by context: owner WebPs are used only by the six-scene intro, while Home after entry and all content pages use the generated parent scene assets. Both contexts render one full-bleed image without stacking.
- Applied the cinematic scene layer to every primary route and project detail.
- Preserved existing route and stable section identifiers.
- Restyled below-the-fold GitHub, project-detail, experience, and contact surfaces into restrained editorial/product UI.
- Removed unconfigured social channels from the visitor-facing Contact page while preserving canonical contact configuration.
- Removed orphaned legacy presentation roots and their exclusive retro dependencies after auditing the import graph; docs-only primitives remain intact.
- Completed responsive regression across mobile, tablet, and desktop renders; fixed first-screen reveal, mobile composition, full-screen chat dock, safe-area behavior, overflow locking, and keyboard focus restoration.
- Completed keyboard focus containment for the cinematic intro and expanded Jordan AI companion, including reduced-motion-safe intro exit behavior.
- Restricted `/docs-visualization` to development mode with `noindex`; its retained retro primitives are no longer part of the public portfolio surface.
- Redesigned Jordan AI conversation and generative UI: editorial assistant prose, compact user messages, shared evidence/resource surfaces, structured evaluation, and lightweight navigation status.
- Added compact ASK / EXPLORE / EVALUATE / ACT onboarding to the Jordan AI welcome state with capability-specific explanations and working prompt starters.
- Added a collapsible “How Jordan AI works” tutorial with four concise, user-facing steps and reduced-motion-aware transitions.
- Added an explicit-consent 30-second recruiter tour action that starts inside the existing conversation and requests project, experience, skill-evidence, and contact/CV highlights without automatic navigation.
- Migrated the persistent desktop assistant into a left-side companion rail with route-aware quick actions, while retaining the accessible full-screen mobile sheet and shared conversation state.
- Redesigned About as an asymmetrical character chapter and merged the former journey/tech-stack sections into one compact, data-driven editorial stage while preserving every stable navigation target.
- Rebuilt Projects as a focused Demo Day stage with a compact project index, refined project detail into a connected explanation flow, converted Experience into a data-driven animated journey path, and simplified Contact into a warm closing chapter with direct channel rows.
- Removed the remaining public retro treatments from About, project-detail headings, and Footer; experimental typography/reveals now remain development-only.
- Verified deterministic chat flows for CV, contact, navigation, and skills. Project filtering returned its controlled error contract because the configured local Ollama service was unavailable.

## Next concrete concerns

1. With Ollama running, repeat live project-filter and grounded evaluation regression; then verify client scroll/highlight execution in a browser conversation. The service was rechecked at `127.0.0.1:11434` and was still unavailable.
2. Complete visual responsive regression for the new editorial pages in a real browser, including narrow mobile, tablet, desktop, and reduced-motion modes.
3. Confirm licensing for every owner intro scene before public production use and replace the low-resolution Home/About exports when better sources are available.

## Validation status

- `npm run lint`: passed.
- `npm run build`: passed outside the restricted sandbox; the initial sandbox attempt failed only because Turbopack was not permitted to bind a local port.
