import type { GitHubContributionData } from "@/lib/about/githubContributionTypes";

function readAttribute(attributes: string, name: string) {
  return attributes.match(new RegExp(`${name}="([^"]*)"`))?.[1] ?? "";
}

export async function getGitHubContributions(): Promise<GitHubContributionData | null> {
  try {
    const response = await fetch("https://github.com/users/JordanAryaLeksana/contributions", { next: { revalidate: 3600 } });
    if (!response.ok) return null;
    const html = await response.text();
    const total = Number(html.match(/<h2[^>]*>\s*([\d,]+)/)?.[1]?.replaceAll(",", "")) || 0;
    const days = [...html.matchAll(/<td\s+([^>]*data-date[^>]*)>/g)].map((match) => {
      const attributes = match[1];
      const position = readAttribute(attributes, "id").match(/component-(\d+)-(\d+)/);
      const level = Number(readAttribute(attributes, "data-level")) || 0;
      return { date: readAttribute(attributes, "data-date"), count: level, level, x: Number(position?.[2] ?? 0) * 15, y: Number(position?.[1] ?? 0) * 15 };
    });
    return { total, days };
  } catch {
    return null;
  }
}
