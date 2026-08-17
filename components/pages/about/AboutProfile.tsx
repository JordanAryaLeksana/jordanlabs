import Image from "next/image";
import {
  ArrowDownRightIcon,
  DownloadSimpleIcon,
  EnvelopeSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";
import { FadeIn } from "@/components/interfaces/motion/FadeIn";
import { Badge } from "@/components/interfaces/ui/Badge";
import { Button } from "@/components/interfaces/ui/Button";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import { ABOUT_PROFILE } from "@/lib/config/about";
import { CV_URL, EMAIL_MAILTO_URL } from "@/lib/config/links";
import { PROFILE } from "@/lib/config/profile";
import { SECTION_IDS } from "@/lib/tools/types";

export function AboutProfile() {
  return (
    <section
      id={SECTION_IDS.aboutBackground}
      className="relative min-h-[calc(100svh-4.75rem)] scroll-mt-20 overflow-hidden border-b border-text-on-dark/15"
    >
      <div className="mx-auto grid min-h-[calc(100svh-4.75rem)] w-full max-w-6xl grid-cols-1 gap-8 px-6 pb-12 pt-8 md:grid-cols-12 md:grid-rows-[auto_1fr_auto] md:gap-x-8 md:pb-16 md:pt-12">
        <FadeIn className="md:col-span-8" distancePx={12}>
          <div className="flex items-center gap-3">
            <span className="size-2.5 rounded-full bg-frame-green" aria-hidden="true" />
            <Typography
              as="p"
              variant="text"
              size="xs"
              className="font-mono tracking-[0.22em] text-text-on-dark/65"
            >
              WHO IS JORDAN?
            </Typography>
          </div>

          <Typography
            as="h1"
            variant="header"
            size="5xl"
            className="mt-5 max-w-4xl text-balance leading-[0.9] sm:text-7xl lg:text-8xl"
          >
            <span className="text-text-on-dark">Engineer by practice. </span>
            <span className="text-coral">AI builder</span>
            <span className="text-text-on-dark"> by direction.</span>
          </Typography>
        </FadeIn>

        <FadeIn
          className="relative mx-auto w-full max-w-[18rem] md:col-span-4 md:row-span-3 md:max-w-none md:self-center"
          delaySeconds={0.08}
          distancePx={16}
        >
          <div className="relative pb-5 pl-5">
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-[82%] w-[82%] rounded-3xl border border-mustard/45 bg-mustard/14"
            />
            <div className="relative overflow-hidden rounded-[2rem] border border-text-on-dark/20 bg-ink-panel shadow-2xl md:-rotate-1">
              <Image
                src="/foto_jordan.jpg"
                alt={PROFILE.fullName}
                width={711}
                height={638}
                priority
                className="aspect-[4/5] w-full object-cover object-[50%_30%] transition-transform duration-700 motion-safe:hover:scale-[1.015]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-ink-base/78 px-4 py-3 backdrop-blur-md">
                <Typography as="p" variant="header" size="lg">
                  {PROFILE.fullName}
                </Typography>
                <Typography
                  as="p"
                  variant="text"
                  size="xs"
                  className="mt-1 font-mono tracking-[0.12em] text-sage"
                >
                  SOFTWARE → AI ENGINEERING
                </Typography>
              </div>
            </div>
            <Badge color="mustard" className="absolute -bottom-1 right-3">
              SURABAYA · ID
            </Badge>
          </div>
        </FadeIn>

        <FadeIn
          className="self-end md:col-span-7 md:row-start-3"
          delaySeconds={0.14}
          distancePx={12}
        >
          <div className="grid gap-6 border-l-2 border-pine pl-5 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-8">
            <div className="max-w-2xl space-y-3">
              {ABOUT_PROFILE.description.map((paragraph) => (
                <Typography
                  key={paragraph}
                  variant="text"
                  size="sm"
                  className="leading-7 text-text-on-dark/76"
                >
                  {paragraph}
                </Typography>
              ))}
            </div>
            <ArrowDownRightIcon
              size={34}
              aria-hidden="true"
              className="hidden text-mustard sm:block"
            />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button href={CV_URL} target="_blank">
              <DownloadSimpleIcon size={17} className="mr-2" aria-hidden="true" />
              View CV
            </Button>
            <Button href={EMAIL_MAILTO_URL} variant="ghost">
              <EnvelopeSimpleIcon size={17} className="mr-2" aria-hidden="true" />
              Start a conversation
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
