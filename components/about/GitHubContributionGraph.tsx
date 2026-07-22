import type { GitHubContributionData } from "@/lib/about/githubContributionTypes";
import { Typography } from "@/components/ui/Typography/Typography";

interface GitHubContributionGraphProps { contributions: GitHubContributionData | null }
const LEVEL_COLORS = ["fill-ink-raised", "fill-sage", "fill-pine", "fill-mustard", "fill-coral"];

export function GitHubContributionGraph({ contributions }: GitHubContributionGraphProps) {
  if (!contributions || contributions.days.length === 0) return null;
  return (
    <div className="mt-10 border-t border-current/15 pt-7">
      <div className="flex flex-wrap items-end justify-between gap-3"><div><Typography as="p" variant="text" size="xs" className="tracking-[0.2em] opacity-55">ACTIVITY / LAST YEAR</Typography><Typography as="h3" variant="header" size="xl" className="mt-1">{contributions.total} contributions in the last year</Typography></div><Typography as="span" variant="text" size="xs" className="font-mono opacity-50">LIVE / 1 HOUR CACHE</Typography></div>
      <div className="mt-5 overflow-x-auto border border-current/20 bg-[var(--bg-raised)] p-4"><svg viewBox="0 0 721 115" role="img" aria-label={`GitHub contribution activity: ${contributions.total} contributions`} className="min-w-[640px]">{contributions.days.map((day) => <rect key={day.date} x={day.x} y={day.y} width="11" height="11" className={`${LEVEL_COLORS[Math.min(day.level, 4)]} stroke-[var(--bg-raised)]`}><title>{`${day.level} activity level on ${day.date}`}</title></rect>)}</svg><div className="mt-3 flex items-center justify-end gap-2 font-mono text-[10px] opacity-60"><span>Less</span>{LEVEL_COLORS.map((color) => <span key={color} className={`h-3 w-3 ${color}`} aria-hidden="true" />)}<span>More</span></div></div>
    </div>
  );
}
