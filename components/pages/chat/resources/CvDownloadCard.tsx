import {
  ArrowUpRightIcon,
  DownloadSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";

import { Badge } from "@/components/interfaces/ui/Badge";
import { Button } from "@/components/interfaces/ui/Button";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import type { ShowDownloadCardOutput } from "@/lib/tools/resources/resource-tool-outputs";

interface CvDownloadCardProps {
  data: ShowDownloadCardOutput;
}

export function CvDownloadCard({
  data,
}: CvDownloadCardProps) {
  return (
    <section
      aria-label={`${data.ownerName} CV`}
      className="w-full max-w-2xl border border-current/25 bg-[var(--bg-raised)]"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-current/15 px-5 py-4">
        <Badge color="mustard">
          CV / DOCUMENT
        </Badge>

        <Typography
          as="p"
          variant="text"
          size="xs"
          className="opacity-60"
        >
          Official portfolio resource
        </Typography>
      </div>

      <div className="p-5">
        <Typography
          as="h3"
          variant="header"
          size="2xl"
        >
          {data.ownerName}
        </Typography>

        <Typography
          as="p"
          variant="text"
          size="sm"
          className="mt-1 opacity-70"
        >
          {data.role}
        </Typography>

        <div className="mt-5 border-l-4 border-l-pine bg-[var(--bg)] px-4 py-3">
          <Typography
            as="p"
            variant="text"
            size="xs"
            weight="bold"
            className="break-all"
          >
            {data.fileName}
          </Typography>
        </div>

        <Typography
          as="p"
          variant="text"
          size="sm"
          className="mt-4 opacity-75"
          aria-live="polite"
        >
          {data.message}
        </Typography>

        <div className="mt-5 flex flex-wrap gap-3">
          <Button
            href={data.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${data.ownerName}'s CV in a new tab`}
          >
            <ArrowUpRightIcon
              size={17}
              className="mr-2"
              aria-hidden="true"
            />
            Open CV
          </Button>

          <Button
            href={data.url}
            download={data.fileName}
            variant="secondary"
            aria-label={`Download ${data.ownerName}'s CV`}
          >
            <DownloadSimpleIcon
              size={17}
              className="mr-2"
              aria-hidden="true"
            />
            Download CV
          </Button>
        </div>
      </div>
    </section>
  );
}
