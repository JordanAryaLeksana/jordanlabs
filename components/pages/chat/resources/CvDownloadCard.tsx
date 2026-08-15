import { ArrowUpRightIcon, DownloadSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/interfaces/ui/Button";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import { ToolResultSurface } from "@/components/pages/chat/ToolResultSurface";
import type { ShowDownloadCardOutput } from "@/lib/tools/resources/resource-tool-outputs";

export function CvDownloadCard({ data }: { data: ShowDownloadCardOutput }) {
  return <ToolResultSurface ariaLabel={`${data.ownerName} CV`} label="CV / DOCUMENT" color="mustard" meta="OFFICIAL RESOURCE"><div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end"><div><Typography as="h3" variant="header" size="2xl">{data.ownerName}</Typography><Typography as="p" variant="text" size="sm" className="mt-1 opacity-65">{data.role}</Typography><div className="mt-5 rounded-xl border border-current/10 bg-[var(--bg)]/60 px-4 py-3"><Typography as="p" variant="text" size="xs" weight="bold" className="break-all">{data.fileName}</Typography></div><Typography as="p" variant="text" size="sm" className="mt-4 leading-6 opacity-75" aria-live="polite">{data.message}</Typography></div><div className="flex flex-wrap gap-3 sm:flex-col"><Button href={data.url} target="_blank" rel="noreferrer" aria-label={`Open ${data.ownerName}'s CV in a new tab`}><ArrowUpRightIcon size={17} className="mr-2" aria-hidden="true" />Open CV</Button><Button href={data.url} download={data.fileName} variant="secondary" aria-label={`Download ${data.ownerName}'s CV`}><DownloadSimpleIcon size={17} className="mr-2" aria-hidden="true" />Download</Button></div></div></ToolResultSurface>;
}
