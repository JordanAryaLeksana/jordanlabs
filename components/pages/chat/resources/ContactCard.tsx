import { EnvelopeSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { Badge } from "@/components/interfaces/ui/Badge";
import { Button } from "@/components/interfaces/ui/Button";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import type { ContactCardOutput } from "@/lib/tools/resources/resource-tool-outputs";

export function ContactCard({ data }: { data: ContactCardOutput }) {
  return (
    <section aria-label={`Contact ${data.ownerName}`} className="w-full max-w-2xl border border-current/25 bg-[var(--bg-raised)] p-5">
      <Badge color="pine">CONTACT / VERIFIED</Badge>
      <Typography as="h3" variant="header" size="2xl" className="mt-4">{data.ownerName}</Typography>
      <Typography as="p" variant="text" size="sm" className="mt-1 opacity-70">{data.role}</Typography>
      <Typography as="p" variant="text" size="sm" className="mt-4 break-all">{data.emailAddress}</Typography>
      <Typography as="p" variant="text" size="sm" className="mt-3 opacity-75" aria-live="polite">{data.message}</Typography>
      <Button href={data.mailtoUrl} className="mt-5" aria-label={`Send email to ${data.ownerName}`}>
        <EnvelopeSimpleIcon size={17} className="mr-2" aria-hidden="true" />Send Email
      </Button>
    </section>
  );
}
