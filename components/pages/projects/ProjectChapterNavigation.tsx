import { PROJECT_SECTION_IDS } from "@/lib/tools/types";

const CHAPTERS = ["overview", "architecture", "dataset", "training", "evaluation"] as const;

export function ProjectChapterNavigation() {
  return <nav aria-label="Project chapters" className="sticky top-0 z-30 overflow-x-auto border-y border-current/15 bg-[var(--bg)]/95 py-3"><div className="mx-auto flex w-full max-w-5xl min-w-max gap-2 px-6">{CHAPTERS.map((chapter) => <a key={chapter} href={`#${PROJECT_SECTION_IDS[chapter]}`} className="border border-current/25 px-3 py-1 font-mono text-xs uppercase tracking-wider opacity-70 hover:border-frame-green hover:text-frame-green">{chapter}</a>)}</div></nav>;
}
