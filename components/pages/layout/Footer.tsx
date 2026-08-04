import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import { SandboxSwingBadge } from "@/components/interfaces/scenes/SandboxSwingBadge";
import { LocalClock } from "@/components/pages/about/LocalClock";
import { ABOUT_PROFILE } from "@/lib/config/about";
import { PROFILE } from "@/lib/config/profile";

/** Footer minimal bersama: lokasi, waktu lokal, dan signature Sandbox. */
export function Footer() {
  return (
    <footer className="border-t border-current/15 bg-[var(--bg)] text-[var(--fg)]">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-end justify-between gap-8 px-6 py-8 pb-28">
        <div className="flex flex-wrap gap-10">
          <div><Typography as="p" variant="text" size="xs" className="font-mono tracking-[0.2em] opacity-55">BASED IN</Typography><Typography as="p" variant="header" size="xl" className="mt-2">{ABOUT_PROFILE.location}</Typography></div>
          <div><Typography as="p" variant="text" size="xs" className="font-mono tracking-[0.2em] opacity-55">LOCAL TIME</Typography><div className="mt-2"><LocalClock /></div></div>
        </div>
        <div className="flex items-center gap-3"><Typography as="span" variant="text" size="xs" className="hidden font-mono opacity-45 sm:inline">{PROFILE.fullName}</Typography><div aria-hidden="true" className="w-12 opacity-70"><SandboxSwingBadge /></div></div>
      </div>
    </footer>
  );
}
