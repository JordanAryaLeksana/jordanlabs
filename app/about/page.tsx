import type { Metadata } from "next";
import { AboutProfile } from "@/components/about/AboutProfile";
import { ExperiencedAs } from "@/components/about/ExperiencedAs";
import { GitHubActivity } from "@/components/about/GitHubActivity";
import { TechStack } from "@/components/about/TechStack";
import { StaticHeader } from "@/components/layout/StaticHeader";
import { Footer } from "@/components/layout/Footer";
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
      <StaticHeader />
      <AboutProfile />
      <ExperiencedAs />
      <TechStack />
      <GitHubActivity repositories={repositories} contributions={contributions} />
      <Footer />
    </main>
  );
}
