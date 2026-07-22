import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { StaticHeader } from "@/components/layout/StaticHeader";
import { ProjectChapterNavigation } from "@/components/projects/ProjectChapterNavigation";
import { ProjectDetailContent } from "@/components/projects/ProjectDetailContent";
import { Typography } from "@/components/ui/Typography/Typography";
import { getProject } from "@/lib/projects/getProject";
import { getProjects } from "@/lib/projects/getProjects";

export function generateStaticParams() { return getProjects().map((project) => ({ slug: project.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const project = getProject((await params).slug); return project ? { title: `${project.title} — Projects`, description: project.shortDescription, alternates: { canonical: `/projects/${project.slug}` } } : {}; }

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return (
    <main className="min-h-screen overflow-x-clip bg-[var(--bg)] text-[var(--fg)]">
      <StaticHeader />
      <section className="mx-auto grid w-full max-w-5xl gap-7 px-6 py-16 md:grid-cols-[1fr_0.5fr] md:items-end">
        <div><Link href="/projects" className="font-mono text-xs opacity-60 hover:text-frame-green">← ALL PROJECTS</Link><Typography as="h1" variant="big-header" size="7xl" className="mt-6 leading-none">{project.title}</Typography><Typography variant="text" size="lg" className="mt-4 max-w-2xl leading-7 opacity-80">{project.shortDescription}</Typography></div>
        <div className="border-l-4 border-l-pine pl-4"><Typography as="p" variant="text" size="xs" className="tracking-[0.2em] opacity-55">PROJECT STATUS</Typography><Typography as="p" variant="header" size="xl" className="mt-2">{project.status}</Typography><div className="mt-4 flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="border border-current/25 px-2 py-1 font-mono text-xs">{tag}</span>)}</div></div>
      </section>
      <ProjectChapterNavigation />
      <ProjectDetailContent project={project} />
      <div className="mx-auto flex w-full max-w-5xl gap-3 px-6 py-12"><Link href="/projects" className="border border-current px-4 py-2 font-mono text-sm hover:border-frame-green">Explore other projects</Link>{project.repositoryUrl ? <a href={project.repositoryUrl} target="_blank" rel="noreferrer" className="bg-pine px-4 py-2 font-mono text-sm text-text-on-dark">Open repository ↗</a> : null}</div>
      <Footer />
    </main>
  );
}
