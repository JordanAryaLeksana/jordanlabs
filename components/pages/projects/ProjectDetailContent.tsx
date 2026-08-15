import { Section } from "@/components/interfaces/ui/Section";
import { Badge } from "@/components/interfaces/ui/Badge";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import type { Project } from "@/lib/config/projects";
import { PROJECT_SECTION_IDS } from "@/lib/tools/types";

export function ProjectDetailContent({ project }: { project: Project }) {
  const chapters = [
    { id: PROJECT_SECTION_IDS.architecture, label: "Architecture", content: project.architecture },
    { id: PROJECT_SECTION_IDS.dataset, label: "Dataset", content: project.dataset },
    { id: PROJECT_SECTION_IDS.training, label: "Training", content: project.training },
    { id: PROJECT_SECTION_IDS.evaluation, label: "Evaluation", content: project.evaluation },
  ];
  return <div className="bg-[var(--bg)]">
    <Section id={PROJECT_SECTION_IDS.overview} className="scroll-mt-20 py-16 sm:py-24">
      <div className="max-w-2xl"><Typography as="p" variant="text" size="xs" className="tracking-[0.2em] opacity-55">01 / OVERVIEW</Typography><Typography as="h2" variant="header" size="3xl" className="mt-2">From problem to shipped approach</Typography></div>
      <div className="grid gap-4 md:grid-cols-3">{[["THE PROBLEM", "coral", project.overview.problem], ["THE APPROACH", "pine", project.overview.approach], ["MY CONTRIBUTION", "slate", project.overview.contribution]].map(([label, color, copy]) => <article key={label} className="rounded-2xl border border-current/10 bg-[var(--bg-raised)] p-6 shadow-sm"><Badge color={color as "coral" | "pine" | "slate"}>{label}</Badge><Typography variant="text" size="sm" className="mt-5 leading-7 opacity-80">{copy}</Typography></article>)}</div>
    </Section>
    {chapters.map((chapter, index) => <Section key={chapter.id} id={chapter.id} className="scroll-mt-20 border-t border-current/10 py-16 sm:grid sm:grid-cols-[0.45fr_1fr] sm:gap-12 sm:py-24"><div><Typography as="p" variant="text" size="xs" className="tracking-[0.2em] opacity-50">0{index + 2} / TECHNICAL NOTE</Typography><Typography as="h2" variant="header" size="3xl" className="mt-2">{chapter.label}</Typography></div><Typography variant="text" className="max-w-3xl text-base leading-8 opacity-80">{chapter.content}</Typography></Section>)}
  </div>;
}
