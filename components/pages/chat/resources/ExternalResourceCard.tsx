import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";

import { Badge } from "@/components/interfaces/ui/Badge";
import { Button } from "@/components/interfaces/ui/Button";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import type { ExternalResourceOutput } from "@/lib/tools/resources/resource-tool-outputs";

interface ExternalResourceCardProps {
  data: ExternalResourceOutput;
}

const PLATFORM_LABEL: Record<
  ExternalResourceOutput["platform"],
  string
> = {
  github: "GitHub",
  linkedin: "LinkedIn",
};

export function ExternalResourceCard({
  data,
}: ExternalResourceCardProps) {
  const platformLabel =
    PLATFORM_LABEL[data.platform];

  return (
    <section
      aria-label={`${platformLabel} resource`}
      className="w-full max-w-2xl border border-current/25 bg-[var(--bg-raised)]"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-current/15 px-5 py-4">
        <Badge color="slate">
          EXTERNAL RESOURCE
        </Badge>

        <Typography
          as="p"
          variant="text"
          size="xs"
          weight="bold"
          className="uppercase tracking-[0.12em] opacity-60"
        >
          {platformLabel}
        </Typography>
      </div>

      <div className="p-5">
        <Typography
          as="h3"
          variant="header"
          size="2xl"
        >
          {data.label}
        </Typography>

        <Typography
          as="p"
          variant="text"
          size="sm"
          className="mt-3 opacity-75"
          aria-live="polite"
        >
          {data.message}
        </Typography>

        <div className="mt-5">
          <Button
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open Jordan's ${platformLabel} profile in a new tab`}
          >
            <ArrowUpRightIcon
              size={17}
              className="mr-2"
              aria-hidden="true"
            />

            Open {platformLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
