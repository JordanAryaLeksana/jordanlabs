import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { Typography } from "@/components/ui/Typography/Typography";
import type { Project } from "@/lib/config/projects";
import { PROJECT_SECTION_IDS } from "@/lib/tools/types";

interface ProjectDetailContentProps { project: Project }

export function ProjectDetailContent({ project }: ProjectDetailContentProps) {
  const sections = [{ id: PROJECT_SECTION_IDS.overview, label: "Overview", content: <div className="grid gap-4 md:grid-cols-3"><div><Badge color="coral">THE PROBLEM</Badge><Typography variant="text" size="sm" className="mt-3 leading-6 opacity-80">{project.overview.problem}</Typography></div><div><Badge color="pine">THE APPROACH</Badge><Typography variant="text" size="sm" className="mt-3 leading-6 opacity-80">{project.overview.approach}</Typography></div><div><Badge color="slate">MY CONTRIBUTION</Badge><Typography variant="text" size="sm" className="mt-3 leading-6 opacity-80">{project.overview.contribution}</Typography></div></div> }, { id: PROJECT_SECTION_IDS.architecture, label: "Architecture", content: <Typography variant="text" className="max-w-3xl leading-7 opacity-80">{project.architecture}</Typography> }, { id: PROJECT_SECTION_IDS.dataset, label: "Dataset", content: <Typography variant="text" className="max-w-3xl leading-7 opacity-80">{project.dataset}</Typography> }, { id: PROJECT_SECTION_IDS.training, label: "Training", content: <Typography variant="text" className="max-w-3xl leading-7 opacity-80">{project.training}</Typography> }, { id: PROJECT_SECTION_IDS.evaluation, label: "Evaluation", content: <Typography variant="text" className="max-w-3xl leading-7 opacity-80">{project.evaluation}</Typography> }];
  return <>{sections.map((section) => <Section key={section.id} id={section.id} className="border-b border-current/10 py-12"><Typography as="p" variant="text" size="xs" className="tracking-[0.2em] opacity-55">{section.label.toUpperCase()}</Typography><Typography as="h2" variant="header" size="3xl" className="mt-2">{section.label}</Typography><div className="mt-6">{section.content}</div></Section>)}</>;
}
