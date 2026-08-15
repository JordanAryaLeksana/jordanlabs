import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/interfaces/ui/Button";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import { ToolResultSurface } from "@/components/pages/chat/ToolResultSurface";
import type { ExternalResourceOutput } from "@/lib/tools/resources/resource-tool-outputs";

const PLATFORM_LABEL: Record<ExternalResourceOutput["platform"], string> = { github: "GitHub", linkedin: "LinkedIn" };

export function ExternalResourceCard({ data }: { data: ExternalResourceOutput }) {
  const platform = PLATFORM_LABEL[data.platform];
  return <ToolResultSurface ariaLabel={`${platform} resource`} label="EXTERNAL RESOURCE" color="slate" meta={platform.toUpperCase()}><div className="flex flex-col items-start sm:flex-row sm:items-end sm:justify-between sm:gap-8"><div><Typography as="h3" variant="header" size="2xl">{data.label}</Typography><Typography as="p" variant="text" size="sm" className="mt-3 max-w-xl leading-6 opacity-75" aria-live="polite">{data.message}</Typography></div><Button href={data.url} target="_blank" rel="noopener noreferrer" className="mt-5 shrink-0 sm:mt-0" aria-label={`Open Jordan's ${platform} profile in a new tab`}><ArrowUpRightIcon size={17} className="mr-2" aria-hidden="true" />Open {platform}</Button></div></ToolResultSurface>;
}
