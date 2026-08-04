import type { ReactNode } from "react";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { HoverLift } from "@/components/interfaces/motion/HoverLift";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";

interface SocialCardProps { label: string; handle: string; description: string; url: string; icon: ReactNode; className?: string }

export function SocialCard({ label, handle, description, url, icon, className }: SocialCardProps) {
  const content = <><div className="flex items-start justify-between gap-3"><span className="text-coral">{icon}</span>{url ? <ArrowUpRightIcon size={19} /> : <span className="font-mono text-[10px] opacity-45">LINK REQUIRED</span>}</div><div className="mt-auto"><Typography as="h3" variant="header" size="2xl">{label}</Typography><Typography as="p" variant="text" size="xs" className="mt-1 opacity-55">{handle}</Typography><Typography variant="text" size="sm" className="mt-4 leading-6 opacity-70">{description}</Typography></div></>;
  return <HoverLift className={className}>{url ? <a href={url} target="_blank" rel="noreferrer noopener" className="flex h-full min-h-52 flex-col border border-current/25 bg-[var(--bg-raised)] p-5 outline-none focus-visible:border-frame-green focus-visible:ring-2 focus-visible:ring-frame-green">{content}</a> : <div className="flex h-full min-h-52 flex-col border border-dashed border-current/25 bg-[var(--bg-raised)] p-5 opacity-65">{content}</div>}</HoverLift>;
}
