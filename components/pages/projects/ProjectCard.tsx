import Image from "next/image";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { HoverLift } from "@/components/interfaces/motion/HoverLift";
import { Badge } from "@/components/interfaces/ui/Badge";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import type { Project } from "@/lib/config/projects";

interface ProjectCardProps { project: Project; featured?: boolean }

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return <HoverLift className="h-full">
    <a href={`/projects/${project.slug}`} className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-text-on-dark/15 bg-ink-panel/85 text-text-on-dark shadow-xl backdrop-blur-md outline-none focus-visible:border-frame-green focus-visible:ring-2 focus-visible:ring-frame-green ${featured ? "md:grid md:grid-cols-[0.9fr_1.1fr]" : ""}`}>
      <div className={`relative overflow-hidden bg-slate ${featured ? "min-h-48" : "aspect-[16/9]"}`}>
        <Image src={project.thumbnail} alt={`${project.title} project visual`} fill className="object-cover opacity-90 transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100" sizes={featured ? "(max-width: 768px) 100vw, 45vw" : "(max-width: 768px) 100vw, 25vw"} />
        <span className="absolute left-4 top-4">
          <Badge color="mustard">{project.category}
          </Badge>
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <Typography as="h3" variant="header" size={featured ? "3xl" : "xl"}>{project.title}</Typography>
          <ArrowUpRightIcon size={20} className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" />
        </div>
        <Typography variant="text" size="sm" className="mt-3 flex-1 leading-6 opacity-75">{project.shortDescription}</Typography>
        <div className="mt-5 flex flex-wrap gap-2">{project.tags.slice(0, 3).map((tag) => <Badge key={tag} color="pine">{tag}</Badge>)}</div>
      </div>
    </a>
  </HoverLift>;
}
