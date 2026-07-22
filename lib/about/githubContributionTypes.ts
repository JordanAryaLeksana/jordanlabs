export interface GitHubContributionDay {
  date: string;
  count: number;
  level: number;
  x: number;
  y: number;
}

export interface GitHubContributionData {
  total: number;
  days: GitHubContributionDay[];
}
