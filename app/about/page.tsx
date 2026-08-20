import type { Metadata } from "next";
import { AboutProfile } from "@/components/pages/about/AboutProfile";
import { AboutChapterStage } from "@/components/pages/about/AboutChapterStage";
import { GitHubActivity } from "@/components/pages/about/GitHubActivity";
import { CinematicPageChapter } from "@/components/pages/layout/CinematicPageChapter";
import { PortfolioHeader } from "@/components/pages/layout/PortfolioHeader";
import { Footer } from "@/components/pages/layout/Footer";
import { getGitHubRepositories } from "@/lib/about/getGitHubRepositories";
import { getGitHubContributions } from "@/lib/about/getGitHubContributions";
import { PROFILE } from "@/lib/config/profile";

export const metadata: Metadata = {
  title: `About ${PROFILE.fullName} — AI Engineering Focus`,
  description: "Meet Jordan Arya Leksana, a software engineer focused on deep learning and applied AI systems.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const repositories = await getGitHubRepositories();
  const contributions = await getGitHubContributions();
  return (
    <main className="min-h-screen overflow-x-clip bg-[var(--bg)] text-[var(--fg)]">
      <CinematicPageChapter scene="about" priority className="min-h-[76svh]"><PortfolioHeader /><AboutProfile /></CinematicPageChapter>
      <div className="relative bg-[var(--bg)]"><AboutChapterStage /><GitHubActivity repositories={repositories} contributions={contributions} /><Footer /></div>
    </main>
  );
}
