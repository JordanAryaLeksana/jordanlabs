import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";

interface ProjectDemoLinkProps {
  demoUrl?: string;
  /** Overrides "VIEW LIVE DEMO" when the demo is not a live app (e.g. a demo video). */
  label?: string;
  compact?: boolean;
}

export function ProjectDemoLink({ demoUrl, label, compact = false }: ProjectDemoLinkProps) {
  const classes = compact
    ? "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2 font-mono text-xs font-bold"
    : "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 font-mono text-xs font-bold";

  if (!demoUrl) {
    return (
      <span
        aria-disabled="true"
        title="A public live demo is not available yet"
        className={`${classes} cursor-not-allowed border border-current/15 opacity-45`}
      >
        LIVE DEMO UNAVAILABLE
      </span>
    );
  }

  return (
    <a
      href={demoUrl}
      target="_blank"
      rel="noreferrer"
      className={`${classes} bg-coral text-text-on-dark transition-colors hover:bg-brick focus-visible:outline-2 focus-visible:outline-frame-green`}
    >
      {label ?? "VIEW LIVE DEMO"} <ArrowUpRightIcon aria-hidden="true" size={17} />
    </a>
  );
}
