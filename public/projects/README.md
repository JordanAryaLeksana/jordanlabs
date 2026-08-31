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

Every section can also expose optional supporting resources through `resources`.
Resources may point to a local file under `public/` or to a trusted public URL.

```ts
illustrations: {
  overview: [
    {
      src: "/projects/emqnet/pipeline.webp",
      alt: "EMQNET multi-task pipeline diagram",
      caption: "Shared representation with three prediction heads.",
    },
  ],
},
resources: {
  overview: [
    {
      type: "paper",
      title: "EMQNET research paper",
      href: "/projects/emqnet/emqnet-paper.pdf",
      description: "Public manuscript describing the research method.",
    },
  ],
  evaluation: [
    {
      type: "dataset",
      title: "Evaluation dataset documentation",
      href: "https://example.com/dataset",
    },
  ],
},
```

Supported resource types are `paper`, `publication`, `report`, `poster`,
`dataset`, `documentation`, and `other`. Empty resource arrays render nothing.

Prefer optimized WebP or AVIF exports, descriptive filenames, and screenshots
without secrets or personal user data. Only link documents that are safe and
licensed for public distribution.
