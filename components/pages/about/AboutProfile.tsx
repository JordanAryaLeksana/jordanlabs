import Image from "next/image";
import { DownloadSimpleIcon, EnvelopeSimpleIcon, GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { ColorBlockReveal } from "@/components/interfaces/motion/ColorBlockReveal";
import { FadeIn } from "@/components/interfaces/motion/FadeIn";
import { DiagonalStripes } from "@/components/interfaces/retro/DiagonalStripes";
import { SandboxSwingBadge } from "@/components/interfaces/scenes/SandboxSwingBadge";
import { Badge } from "@/components/interfaces/ui/Badge";
import { Button } from "@/components/interfaces/ui/Button";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import { ABOUT_PROFILE } from "@/lib/config/about";
import { CV_URL, EMAIL_MAILTO_URL, GITHUB_URL, LINKEDIN_URL } from "@/lib/config/links";
import { PROFILE } from "@/lib/config/profile";
import { SECTION_IDS } from "@/lib/tools/types";

export function AboutProfile() {
  return (
    <section id={SECTION_IDS.aboutBackground} className="relative overflow-hidden border-b border-current/15">
      <div aria-hidden="true" className="pointer-events-none absolute -right-8 top-12 w-40 opacity-[0.07] sm:w-56"><SandboxSwingBadge /></div>
      <div className="mx-auto grid min-h-[calc(100svh-9rem)] w-full max-w-6xl items-center gap-10 px-6 py-12 md:grid-cols-[1.05fr_0.95fr] md:py-16">
        <FadeIn className="order-2 flex flex-col items-start gap-5 md:order-1" distancePx={14}>
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-frame-green" />
            <Typography as="span" variant="text" size="xs" className="tracking-[0.22em] opacity-70">{ABOUT_PROFILE.eyebrow.toUpperCase()}</Typography>
          </div>
          <div>
            <Typography as="h1" variant="big-header" size="7xl" className="leading-[0.88] sm:text-8xl">{PROFILE.fullName}</Typography>
            <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <Typography as="p" variant="header" size="4xl" className="text-coral">{ABOUT_PROFILE.title}</Typography>
              <Typography as="p" variant="text" size="sm" className="opacity-60">with a {ABOUT_PROFILE.previousExperience} background</Typography>
            </div>
          </div>
          <div className="max-w-xl space-y-3">
            {ABOUT_PROFILE.description.map((paragraph) => <Typography key={paragraph} variant="text" size="sm" className="leading-6 opacity-80">{paragraph}</Typography>)}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button href={CV_URL} target="_blank"><DownloadSimpleIcon size={17} className="mr-2" />View CV</Button>
            <Button href={GITHUB_URL} target="_blank" rel="noreferrer" variant="ghost"><GithubLogoIcon size={17} className="mr-2" />GitHub</Button>
            <Button href={LINKEDIN_URL} target="_blank" rel="noreferrer" variant="ghost"><LinkedinLogoIcon size={17} className="mr-2" />LinkedIn</Button>
            <Button href={EMAIL_MAILTO_URL} variant="ghost"><EnvelopeSimpleIcon size={17} className="mr-2" />Email</Button>
          </div>
        </FadeIn>
        <div className="order-1 mx-auto w-full max-w-md md:order-2">
          <div className="relative pb-4 pr-4">
            <div aria-hidden="true" className="absolute bottom-0 right-0 h-[88%] w-[88%] bg-slate" />
            <ColorBlockReveal blockColorClassName="bg-brick">
              <Image src="/foto_jordan.jpg" alt="Jordan Arya Leksana" width={711} height={638} priority className="relative aspect-[4/4.5] w-full border-2 border-current object-cover object-[50%_30%]" />
            </ColorBlockReveal>
            <Badge color="mustard" className="absolute -bottom-1 left-4">AI ENGINEERING</Badge>
            <DiagonalStripes className="absolute -right-2 -top-5 h-20 w-8" stripeCount={5} />
          </div>
        </div>
      </div>
    </section>
  );
}
