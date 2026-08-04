import { Section } from "@/components/interfaces/ui/Section";
import { StaggerContainer } from "@/components/interfaces/motion/StaggerContainer";
import { StaggerItem } from "@/components/interfaces/motion/StaggerItem";
import { ProjectCard } from "@/components/pages/projects/ProjectCard";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import type { Project } from "@/lib/config/projects";
import { PROJECT_SECTION_IDS } from "@/lib/tools/types";

interface FeaturedProjectsProps { projects: readonly Project[] }

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <Section id={PROJECT_SECTION_IDS.featured} className="min-h-[calc(100svh-8rem)] py-12 md:py-16">
      <div className="border-t-4 border-t-coral pt-5">
        <Typography as="p" variant="text" size="xs" className="tracking-[0.2em] opacity-55">01 / SELECTED WORK</Typography>
        <Typography as="h1" variant="header" size="5xl" className="mt-3 leading-[0.95] sm:text-6xl">Featured Projects</Typography>
      </div>
      <StaggerContainer trigger="viewport" className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {projects.filter((project) => project.featured).map((project) => <StaggerItem key={project.id}><ProjectCard project={project} /></StaggerItem>)}
      </StaggerContainer>
    </Section>
  );
}
