import { EnvelopeSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/interfaces/ui/Button";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import { ToolResultSurface } from "@/components/pages/chat/ToolResultSurface";
import type { ContactCardOutput } from "@/lib/tools/resources/resource-tool-outputs";

export function ContactCard({ data }: { data: ContactCardOutput }) {
  return <ToolResultSurface ariaLabel={`Contact ${data.ownerName}`} label="CONTACT" color="pine" meta="VERIFIED RESOURCE"><div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end"><div><Typography as="h3" variant="header" size="2xl">{data.ownerName}</Typography><Typography as="p" variant="text" size="sm" className="mt-1 opacity-65">{data.role}</Typography><a href={data.mailtoUrl} className="mt-5 block break-all font-mono text-sm underline decoration-coral underline-offset-4">{data.emailAddress}</a><Typography as="p" variant="text" size="sm" className="mt-4 max-w-xl leading-6 opacity-75" aria-live="polite">{data.message}</Typography></div><Button href={data.mailtoUrl} aria-label={`Send email to ${data.ownerName}`}><EnvelopeSimpleIcon size={17} className="mr-2" aria-hidden="true" />Send Email</Button></div></ToolResultSurface>;
}
