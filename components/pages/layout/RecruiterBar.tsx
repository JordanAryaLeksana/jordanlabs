"use client";

import {
  BriefcaseIcon,
  EnvelopeSimpleIcon,
  FileArrowDownIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react";
import type { ReactNode } from "react";
import { RECRUITER_LINKS } from "@/lib/config/intro";
import { cn } from "@/lib/cn";

const ICONS: Record<(typeof RECRUITER_LINKS)[number]["id"], ReactNode> = {
  cv: <FileArrowDownIcon size={17} weight="bold" aria-hidden="true" />,
  linkedin: <LinkedinLogoIcon size={17} weight="bold" aria-hidden="true" />,
  upwork: <BriefcaseIcon size={17} weight="bold" aria-hidden="true" />,
  github: <GithubLogoIcon size={17} weight="bold" aria-hidden="true" />,
  email: <EnvelopeSimpleIcon size={17} weight="bold" aria-hidden="true" />,
};

interface RecruiterBarProps {
  onNavigate?: () => void;
  className?: string;
}

/**
 * Always-visible recruiter shortcuts during the intro: the CV and every
 * profile are one click away from any chapter.
 */
export function RecruiterBar({ onNavigate, className }: RecruiterBarProps) {
  return (
    <nav aria-label="Recruiter shortcuts" className={cn("flex items-center gap-1 sm:gap-1.5", className)}>
      {RECRUITER_LINKS.map((link) => {
        const primary = link.id === "cv";
        const external = "external" in link && link.external;
        const download = "download" in link && link.download;

        return (
          <a
            key={link.id}
            href={link.href}
            onClick={onNavigate}
            target={external || download ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            download={download ? "" : undefined}
            aria-label={external ? `${link.label} (opens in a new tab)` : link.label}
            className={cn(
              "inline-flex min-h-10 min-w-10 items-center justify-center gap-2 rounded-full border font-mono text-[11px] font-bold tracking-[0.08em] backdrop-blur-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frame-green",
              primary
                ? "border-coral bg-coral px-3 text-text-on-dark hover:bg-brick sm:px-4"
                : "border-text-on-dark/20 bg-ink-base/40 px-2.5 text-text-on-dark hover:border-coral hover:text-coral"
            )}
          >
            {ICONS[link.id]}
            <span className={primary ? "hidden sm:inline" : "hidden xl:inline"}>{link.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
