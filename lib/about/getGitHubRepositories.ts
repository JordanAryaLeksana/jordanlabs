import type { GitHubRepository } from "@/lib/about/githubTypes";
import { selectGitHubRepositories } from "@/lib/about/selectGitHubRepositories";

export async function getGitHubRepositories(): Promise<GitHubRepository[] | null> {
  try {
    const response = await fetch("https://api.github.com/users/JordanAryaLeksana/repos?per_page=100&sort=updated", {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    if (!response.ok) return null;
    return selectGitHubRepositories((await response.json()) as GitHubRepository[]);
  } catch {
    return null;
  }
}
