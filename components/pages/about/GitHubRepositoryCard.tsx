import { ArrowUpRightIcon, StarIcon } from "@phosphor-icons/react/dist/ssr";
import { HoverLift } from "@/components/interfaces/motion/HoverLift";
import { Badge } from "@/components/interfaces/ui/Badge";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import type { GitHubRepository } from "@/lib/about/githubTypes";
import { formatRepositoryDate } from "@/lib/about/formatRepositoryDate";

interface GitHubRepositoryCardProps { repository: GitHubRepository }

export function GitHubRepositoryCard({ repository }: GitHubRepositoryCardProps) {
  return (
    <HoverLift className="h-full">
      <a href={repository.html_url} target="_blank" rel="noreferrer" className="group flex h-full flex-col border border-current/25 bg-[var(--bg-raised)] p-5 outline-none transition-[border-color,transform] duration-150 focus-visible:border-frame-green focus-visible:ring-2 focus-visible:ring-frame-green motion-reduce:transition-none">
        <div className="flex items-start justify-between gap-4">
          <Typography as="h3" variant="header" size="xl">{repository.name}</Typography>
          <ArrowUpRightIcon size={20} className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
        </div>
        <Typography variant="text" size="xs" className="mt-3 line-clamp-3 flex-1 leading-5 opacity-70">{repository.description ?? "Public repository — open on GitHub for implementation details."}</Typography>
        <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
          {repository.language ? <Badge color="pine">{repository.language}</Badge> : null}
          <span className="font-mono opacity-55">Updated {formatRepositoryDate(repository.updated_at)}</span>
          {repository.stargazers_count > 0 ? <span className="ml-auto inline-flex items-center gap-1 font-mono"><StarIcon size={13} />{repository.stargazers_count}</span> : null}
        </div>
      </a>
    </HoverLift>
  );
}
