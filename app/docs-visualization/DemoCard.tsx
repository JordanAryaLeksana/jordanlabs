"use client";

import { useState, type ReactNode } from "react";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import { Button } from "@/components/interfaces/ui/Button";

interface DemoCardProps {
  title: string;
  description: string;
  /** Menerima replayKey, dipasang sebagai `key` pada komponen yang diperagakan supaya animasinya bisa diulang lewat remount. */
  children: (replayKey: number) => ReactNode;
}

export function DemoCard({ title, description, children }: DemoCardProps) {
  const [replayKey, setReplayKey] = useState(0);

  return (
    <div className="flex flex-col gap-3 border border-ink-raised p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Typography variant="header" size="xl">
          {title}
        </Typography>
        <Button variant="secondary" onClick={() => setReplayKey((previous) => previous + 1)}>
          Replay
        </Button>
      </div>
      <Typography variant="text" size="sm">
        {description}
      </Typography>
      <div className="pt-2">{children(replayKey)}</div>
    </div>
    
  );
}
