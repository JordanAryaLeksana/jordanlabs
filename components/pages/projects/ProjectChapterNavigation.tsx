import { PROJECT_SECTION_IDS } from "@/lib/tools/types";

const CHAPTERS = ["overview", "architecture", "dataset", "training", "evaluation"] as const;

export function ProjectChapterNavigation({ labels }: { labels?: Partial<Record<(typeof CHAPTERS)[number], string>> }) {
  return <nav aria-label="Project chapters" className="sticky top-0 z-30 overflow-x-auto border-b border-current/10 bg-[var(--bg)]/90 py-3 backdrop-blur-xl">
    <div className="mx-auto flex w-full max-w-5xl min-w-max gap-2 px-6">
      {CHAPTERS.map((chapter) =>
        <a key={chapter} href={`#${PROJECT_SECTION_IDS[chapter]}`}
          className="rounded-full border border-current/15 px-4 py-2 font-mono text-[11px] uppercase tracking-wider opacity-70 transition-colors hover:border-frame-green hover:text-frame-green focus-visible:outline-2 focus-visible:outline-frame-green">
          {labels?.[chapter] ?? chapter}
        </a>
      )}
    </div>
  </nav>;
}
