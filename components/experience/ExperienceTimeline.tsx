import { BuildingsIcon, CheckCircleIcon } from "@phosphor-icons/react/dist/ssr";
import { StaggerContainer } from "@/components/motion/StaggerContainer";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { Badge } from "@/components/ui/Badge";
import { Typography } from "@/components/ui/Typography/Typography";
import { EXPERIENCE } from "@/lib/config/experience";
import { SECTION_IDS } from "@/lib/tools/types";

export function ExperienceTimeline() {
  return (
    <section id={SECTION_IDS.experienceList} className="mx-auto min-h-screen w-full max-w-4xl px-6 py-12 md:py-16">
      <Typography as="h1" variant="header" size="3xl">Experience</Typography>
      <StaggerContainer trigger="mount" className="relative ml-3 mt-10 border-l-2 border-current/15 pl-9">
        {EXPERIENCE.map((experience) => <StaggerItem key={experience.organization} className="relative pb-12 last:pb-0"><span aria-hidden="true" className="absolute -left-[53px] top-0 flex h-8 w-8 items-center justify-center rounded-full bg-pine text-text-on-dark"><BuildingsIcon size={17} /></span><article><div className="flex flex-wrap items-baseline justify-between gap-2"><Typography as="h2" variant="header" size="xl">{experience.organization}</Typography><Typography as="span" variant="text" size="xs" className="font-mono opacity-50">{experience.location}</Typography></div><div className="mt-6 space-y-9 border-l-2 border-coral/70 pl-6">{experience.roles.map((role) => <section key={role.title} className="relative"><span aria-hidden="true" className="absolute -left-[29px] top-1 h-2.5 w-2.5 bg-coral" /><div className="flex flex-wrap items-center justify-between gap-2"><div className="flex items-center gap-2"><Typography as="h3" variant="header" size="lg">{role.title}</Typography><CheckCircleIcon size={16} className="text-frame-green" aria-label="Verified from CV" /></div><Typography as="span" variant="text" size="xs" className="font-mono opacity-50">{role.period}</Typography></div><ul className="mt-4 space-y-2">{role.contributions.map((contribution) => <li key={contribution} className="flex gap-3 font-sans text-sm leading-6 opacity-75"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-mustard" />{contribution}</li>)}</ul><div className="mt-4 flex flex-wrap gap-2">{role.technologies.map((technology) => <Badge key={technology} color="slate">{technology}</Badge>)}</div></section>)}</div></article></StaggerItem>)}
      </StaggerContainer>
    </section>
  );
}
