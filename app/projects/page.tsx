import type { Metadata } from "next";
import { FeaturedProjects } from "@/components/pages/projects/FeaturedProjects";
import { Footer } from "@/components/pages/layout/Footer";
import { getProjects } from "@/lib/projects/getProjects";

export const metadata: Metadata = { title: "Projects — Jordan Arya Leksana", description: "Selected applied AI, deep learning, computer vision, and software engineering projects by Jordan Arya Leksana.", alternates: { canonical: "/projects" } };

export default function ProjectsPage() {
  const projects = getProjects();
  return <main className="min-h-screen overflow-x-clip bg-[var(--bg)] text-[var(--fg)]"><FeaturedProjects projects={projects} /><Footer /></main>;
}
