import { SandboxSwingBadge } from "@/components/scenes/SandboxSwingBadge";
import { Typography } from "@/components/ui/Typography/Typography";
import { ABOUT_PROFILE } from "@/lib/config/about";
import { LocalClock } from "@/components/about/LocalClock";

export function AboutFooter() {
  return (
    <footer className="pb-32 pt-8 md:pb-28">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-end justify-between gap-8 px-6">
        <div className="flex gap-10">
          <div><Typography as="p" variant="text" size="xs" className="tracking-[0.2em] opacity-55">BASED IN</Typography><Typography as="p" variant="header" size="2xl" className="mt-2">{ABOUT_PROFILE.location}</Typography></div>
          <div><Typography as="p" variant="text" size="xs" className="tracking-[0.2em] opacity-55">LOCAL TIME</Typography><div className="mt-2"><LocalClock /></div></div>
        </div>
        <div aria-hidden="true" className="w-14 opacity-60"><SandboxSwingBadge /></div>
      </div>
    </footer>
  );
}
