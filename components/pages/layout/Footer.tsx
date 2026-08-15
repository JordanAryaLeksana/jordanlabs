import Link from "next/link";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import { LocalClock } from "@/components/pages/about/LocalClock";
import { ABOUT_PROFILE } from "@/lib/config/about";
import { PROFILE } from "@/lib/config/profile";

export function Footer() {
  return <footer className="border-t border-current/10 bg-[var(--bg)] text-[var(--fg)]"><div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-10 pb-28 sm:flex-row sm:items-end sm:justify-between"><div className="flex flex-wrap gap-10"><div><Typography as="p" variant="text" size="xs" className="font-mono tracking-[0.2em] opacity-55">BASED IN</Typography><Typography as="p" variant="header" size="xl" className="mt-2">{ABOUT_PROFILE.location}</Typography></div><div><Typography as="p" variant="text" size="xs" className="font-mono tracking-[0.2em] opacity-55">LOCAL TIME</Typography><div className="mt-2"><LocalClock /></div></div></div><div className="flex items-center gap-3 border-t border-current/10 pt-5 sm:border-0 sm:pt-0"><span aria-hidden="true" className="size-2 rounded-full bg-frame-green" /><Typography as="span" variant="text" size="xs" className="font-mono opacity-55">{PROFILE.fullName}</Typography><Link href="/" className="ml-auto font-mono text-xs underline underline-offset-4 hover:text-coral sm:ml-3">Jordan AI</Link></div></div></footer>;
}
