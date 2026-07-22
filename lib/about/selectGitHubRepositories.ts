import type { GitHubRepository } from "@/lib/about/githubTypes";
import { ABOUT_PROFILE } from "@/lib/config/about";

export function selectGitHubRepositories(repositories: GitHubRepository[]) {
  const priorityNames = ABOUT_PROFILE.githubPriority.map((name) => name.toLowerCase());
  return repositories
    .filter((repository) => !repository.fork)
    .sort((first, second) => {
      const firstPriority = priorityNames.indexOf(first.name.toLowerCase());
      const secondPriority = priorityNames.indexOf(second.name.toLowerCase());
      if (firstPriority !== -1 || secondPriority !== -1) {
        if (firstPriority === -1) return 1;
        if (secondPriority === -1) return -1;
        return firstPriority - secondPriority;
      }
      return Date.parse(second.updated_at) - Date.parse(first.updated_at);
    })
    .slice(0, 4);
}
