import Image from "next/image";
import { Badge } from "@/components/interfaces/ui/Badge";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import type { Project, ProjectIllustration, ProjectResource } from "@/lib/config/projects";
import { PROJECT_SECTION_IDS } from "@/lib/tools/types";

function IllustrationGrid({ illustrations }: { illustrations?: readonly ProjectIllustration[] }) {
  if (!illustrations?.length) return null;

  return (
    <div className="mt-9 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,18rem),1fr))]">
      {illustrations.map((illustration, index) => (
        <figure key={`${illustration.src}-${index}`} className="overflow-hidden rounded-2xl border border-current/12 bg-ink-panel">
          <div className="relative aspect-[16/10]">
            <Image src={illustration.src} alt={illustration.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
          </div>
          {illustration.caption ? <figcaption className="px-4 py-3 font-mono text-[11px] leading-5 opacity-60">{illustration.caption}</figcaption> : null}
        </figure>
      ))}
    </div>
  );
}

function ResourceList({ resources }: { resources?: readonly ProjectResource[] }) {
  if (!resources?.length) return null;

  return (
    <div className="mt-9 border-t border-current/12 pt-5">
      <Typography as="h3" variant="text" size="xs" className="font-mono tracking-[0.18em] opacity-50">
        SUPPORTING EVIDENCE
      </Typography>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
        {resources.map((resource) => (
          <li key={`${resource.type}-${resource.href}`}>
            <a
              href={resource.href}
              target="_blank"
              rel="noreferrer"
              className="group flex min-h-24 h-full flex-col rounded-2xl border border-current/14 p-4 transition-colors hover:border-frame-green focus-visible:outline-2 focus-visible:outline-frame-green"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-pine">
                {resource.type}
              </span>
              <span className="mt-2 font-display text-base font-bold leading-5">
                {resource.title} <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none">↗</span>
              </span>
              {resource.description ? (
                <span className="mt-2 text-sm leading-5 opacity-62">{resource.description}</span>
              ) : null}
            </a>
          </li>
        ))}
      </ul>
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
          <ResourceList resources={project.resources?.overview} />
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
              <ResourceList resources={project.resources?.[chapter.id]} />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
