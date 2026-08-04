import { DownloadSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/interfaces/ui/Button";
import { Card } from "@/components/interfaces/ui/Card";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import type { CvDownloadCardData } from "@/lib/tools/tool-output-types";

interface CvDownloadCardProps {
    data: CvDownloadCardData;
}

export function CvDownloadCard({
    data,
}: CvDownloadCardProps) {
    return (
        <Card
            accentBorderClassName="border-l-coral"
            className="w-full text-text-on-dark"
        >
            <Typography
                as="p"
                variant="text"
                size="xs"
                weight="bold"
                className="mb-3 uppercase tracking-[0.18em] opacity-60"
            >
                Curriculum Vitae
            </Typography>

            <Typography
                as="h2"
                variant="header"
                size="2xl"
                className="mb-1"
            >
                {data.ownerName}
            </Typography>

            <Typography
                variant="text"
                size="sm"
                className="mb-6 opacity-70"
            >
                {data.role}
            </Typography>

            <div className="mb-6 border-y border-ink-raised py-4">
                <Typography
                    as="p"
                    variant="text"
                    size="xs"
                    className="mb-1 uppercase tracking-wider opacity-50"
                >
                    File
                </Typography>

                <Typography
                    as="p"
                    variant="text"
                    size="sm"
                    className="break-all"
                >
                    {data.fileName}
                </Typography>
            </div>

            <Button
                href={data.url}
                download
                variant="primary"
                className="w-full sm:w-auto"
            >
                <DownloadSimpleIcon
                    size={18}
                    className="mr-2"
                />
                Download CV
            </Button>
        </Card>
    );
}