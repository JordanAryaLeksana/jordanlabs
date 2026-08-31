# Project illustration assets

Store project-specific images under a folder matching the project slug:

```text
public/projects/
  ecs-website/
  teta/
  jordan-labs/
  sea-catering/
  chatty/
```

The overview and each technical chapter support up to two optional images through the
`illustrations` field in `lib/config/projects.ts`. Use paths such as
`/projects/teta/telemetry-dashboard.webp` and provide a useful `alt` plus an
optional short `caption`. Empty illustration arrays render no placeholder.

Prefer optimized WebP or AVIF exports, descriptive filenames, and screenshots
without secrets or personal user data.
