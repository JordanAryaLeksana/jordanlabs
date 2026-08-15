# Owner scene slots

Replace the WebP files in this directory with the selected licensed/original scene images. Keep the filenames so no component or route code needs to change:

- `home.webp` — startup workspace / idea wall
- `about.webp` — rooftop sunset / reflective mood
- `projects.webp` — team collaboration / build room
- `project-detail.webp` — technical explanation / focused engineering
- `experience.webp` — pitch stage / demo day
- `contact.webp` — night conversation / warm closing

Recommended export: WebP, roughly 1800–2400 px wide, landscape, with enough negative space for UI. Keep faces and focal actions away from the text-heavy left side and make sure the subject survives a narrow portrait crop.

The generated files in the parent `public/scenes/` directory remain the full-bleed atmospheric backdrops. Owner images are mixed in as feathered `object-contain` scene layers, so their original aspect ratios, faces, and focal actions are not cropped.

Before public deployment, confirm that every replacement is original or licensed for portfolio use. If a still cannot be licensed, replace it with an original/licensed recreation while keeping the same narrative scene family.

## Current owner-asset audit

- `home.webp`: 624×416; usable, but a higher-resolution export is recommended for large/retina displays.
- `about.webp`: 768×512; usable, but its pitch-stage meaning fits Experience more closely than the intended reflective About chapter. A rooftop/reflection replacement remains recommended.
- `projects.webp`: 1280×720; collaboration framing is suitable.
- `project-detail.webp`: 1279×720; focused team/engineering framing is suitable.
- `experience.webp`: generated from the supplied 1280×720 JPG for the runtime slot; the source JPG remains preserved.
- `contact.webp`: 1200×675; night/cherry-blossom closing framing is suitable.
