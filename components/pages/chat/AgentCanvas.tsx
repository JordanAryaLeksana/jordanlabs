"use client";

import { findLatestCvDownloadOutput } from "@/components/pages/chat/findLatestCvDownloadOutput";
import { CvDownloadCard } from "./tool-cards/CVDownloadCard";
import { usePortfolioChat } from "@/components/pages/chat/usePortfolioChat";
import { Card } from "@/components/interfaces/ui/Card";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";

export function AgentCanvas() {
  const { messages } = usePortfolioChat();
  const cvDownloadData =
    findLatestCvDownloadOutput(messages);

  return (
    <section
      aria-label="Agent result canvas"
      className="relative flex min-h-[20rem] min-w-0 flex-1 flex-col bg-[var(--bg-raised)] lg:min-h-0"
    >
      <header className="shrink-0 border-b border-ink-raised px-6 py-4">
        <Typography
          as="p"
          variant="text"
          size="xs"
          weight="bold"
          className="uppercase tracking-[0.2em] opacity-60"
        >
          Agent Canvas
        </Typography>
      </header>

      <div className="flex min-h-0 flex-1 overflow-y-auto px-6 py-6 xl:px-10 xl:py-8">
        {cvDownloadData ? (
          <CvDownloadCard data={cvDownloadData} />
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <Card
              accentBorderClassName="border-l-slate"
              className="max-w-md text-text-on-dark"
            >
              <Typography
                as="h2"
                variant="header"
                size="xl"
                className="mb-3"
              >
                Results appear here
              </Typography>

              <Typography
                variant="text"
                size="sm"
                className="leading-7 opacity-70"
              >
                Project evidence, skill summaries, CV previews, and contact
                actions will be rendered in this workspace.
              </Typography>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}