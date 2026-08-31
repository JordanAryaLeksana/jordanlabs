import Image from "next/image";
import { Badge } from "@/components/interfaces/ui/Badge";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import type { Project, ProjectIllustration } from "@/lib/config/projects";
import { PROJECT_SECTION_IDS } from "@/lib/tools/types";

function IllustrationGrid({ illustrations }: { illustrations?: readonly ProjectIllustration[] }) {
  if (!illustrations?.length) return null;

  return (
    <div className="mt-9 grid gap-4 sm:grid-cols-2">
      {illustrations.slice(0, 2).map((illustration) => (
        <figure key={illustration.src} className="overflow-hidden rounded-2xl border border-current/12 bg-ink-panel">
          <div className="relative aspect-[16/10]">
            <Image src={illustration.src} alt={illustration.alt} fill sizes="(max-width: 640px) 100vw, 40vw" className="object-cover" />
          </div>
          {illustration.caption ? <figcaption className="px-4 py-3 font-mono text-[11px] leading-5 opacity-60">{illustration.caption}</figcaption> : null}
        </figure>
      ))}
    </div>
  );
}

export function ProjectDetailContent({ project }: { project: Project }) {
  const overview = [
    { label: "PROBLEM", color: "coral", content: project.overview.problem },
    { label: "APPROACH", color: "pine", content: project.overview.approach },
    { label: "CONTRIBUTION", color: "slate", content: project.overview.contribution },
  ] as const;
  const chapters = [
    { id: PROJECT_SECTION_IDS.architecture, label: project.chapterLabels?.architecture ?? "Architecture", content: project.architecture, accent: "border-coral" },
    { id: PROJECT_SECTION_IDS.dataset, label: project.chapterLabels?.dataset ?? "Dataset", content: project.dataset, accent: "border-pine" },
    { id: PROJECT_SECTION_IDS.training, label: project.chapterLabels?.training ?? "Training", content: project.training, accent: "border-slate" },
    { id: PROJECT_SECTION_IDS.evaluation, label: project.chapterLabels?.evaluation ?? "Evaluation", content: project.evaluation, accent: "border-mustard" },
  ] as const;

  return (
    <div className="bg-[var(--bg)]">
      <section id={PROJECT_SECTION_IDS.overview} className="scroll-mt-20 border-b border-current/10">
        <div className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-24">
          <Typography as="p" variant="text" size="xs" className="font-mono tracking-[0.2em] opacity-55">
            01 / EXPLANATION FLOW
          </Typography>
          <Typography as="h2" variant="header" size="3xl" className="mt-2 max-w-2xl">
            From the problem to Jordan&apos;s contribution.
          </Typography>
          <ol className="mt-10 grid gap-0 md:grid-cols-3">
            {overview.map((item, index) => (
              <li key={item.label} className="relative border-l border-current/16 pb-9 pl-6 last:pb-0 md:border-l-0 md:border-t md:pb-0 md:pl-0 md:pt-7 md:not-last:pr-8">
                <span className="absolute -left-1.5 top-0 size-3 rounded-full bg-frame-green md:-top-1.5 md:left-0" aria-hidden="true" />
                <Badge color={item.color}>{`0${index + 1} / ${item.label}`}</Badge>
                <Typography variant="text" size="sm" className="mt-5 leading-7 opacity-76">
                  {item.content}
                </Typography>
              </li>
            ))}
          </ol>
          <IllustrationGrid illustrations={project.illustrations?.overview} />
        </div>
      </section>

      {chapters.map((chapter, index) => (
        <section key={chapter.id} id={chapter.id} className="scroll-mt-20 border-b border-current/10">
          <div className="mx-auto grid w-full max-w-5xl gap-8 px-6 py-16 sm:grid-cols-[0.38fr_1fr] sm:gap-14 sm:py-24">
            <div className={`border-l-2 pl-5 ${chapter.accent}`}>
              <Typography as="p" variant="text" size="xs" className="font-mono tracking-[0.18em] opacity-48">
                0{index + 2} / TECHNICAL NOTE
              </Typography>
              <Typography as="h2" variant="header" size="3xl" className="mt-2">
                {chapter.label}
              </Typography>
            </div>
            <div>
              <Typography variant="text" className="max-w-3xl text-base leading-8 opacity-78 sm:text-lg sm:leading-9">
                {chapter.content}
              </Typography>
              <IllustrationGrid illustrations={project.illustrations?.[chapter.id]} />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
