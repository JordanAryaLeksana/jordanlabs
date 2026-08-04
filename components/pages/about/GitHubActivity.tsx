import { GithubLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { Section } from "@/components/interfaces/ui/Section";
import { StaggerContainer } from "@/components/interfaces/motion/StaggerContainer";
import { StaggerItem } from "@/components/interfaces/motion/StaggerItem";
import { Button } from "@/components/interfaces/ui/Button";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import type { GitHubRepository } from "@/lib/about/githubTypes";
import { GITHUB_URL } from "@/lib/config/links";
import { SECTION_IDS } from "@/lib/tools/types";
import { GitHubRepositoryCard } from "@/components/pages/about/GitHubRepositoryCard";
import { GitHubContributionGraph } from "@/components/pages/about/GitHubContributionGraph";
import type { GitHubContributionData } from "@/lib/about/githubContributionTypes";

interface GitHubActivityProps { repositories: GitHubRepository[] | null; contributions: GitHubContributionData | null }

export function GitHubActivity({ repositories, contributions }: GitHubActivityProps) {
  return (
    <Section id={SECTION_IDS.aboutSkills} className="border-y border-current/15 py-12">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <Typography as="p" variant="text" size="xs" className="tracking-[0.22em] opacity-60">PUBLIC WORK / GITHUB</Typography>
          <Typography as="h2" variant="header" size="3xl" className="mt-2">Selected GitHub Work</Typography>
          <Typography variant="text" size="sm" className="mt-2 opacity-70">Experiments and projects where software engineering meets applied AI.</Typography>
        </div>
        <Button href={GITHUB_URL} target="_blank" rel="noreferrer" variant="ghost"><GithubLogoIcon size={17} className="mr-2" />View all repositories →</Button>
      </div>
      {repositories && repositories.length > 0 ? (
        <StaggerContainer trigger="viewport" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {repositories.map((repository) => <StaggerItem key={repository.id}><GitHubRepositoryCard repository={repository} /></StaggerItem>)}
        </StaggerContainer>
      ) : <Typography variant="text" size="sm" className="border-l-4 border-l-mustard bg-[var(--bg-raised)] p-5 opacity-75">GitHub activity is temporarily unavailable. The public profile remains available through the link above.</Typography>}
      <GitHubContributionGraph contributions={contributions} />
    </Section>
  );
}
