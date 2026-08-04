import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { Section } from "@/components/interfaces/ui/Section";
import { Badge } from "@/components/interfaces/ui/Badge";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import { ABOUT_PROFILE } from "@/lib/config/about";

export function ExperiencedAs() {
  return (
    <Section className="grid gap-8 py-12 md:grid-cols-[0.8fr_1.2fr] md:items-center">
      <div>
        <Typography as="p" variant="text" size="xs" className="tracking-[0.22em] opacity-60">EXPERIENCED AS</Typography>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Typography as="h2" variant="header" size="3xl">{ABOUT_PROFILE.previousExperience}</Typography>
          <ArrowRightIcon size={28} className="text-coral" aria-hidden="true" />
          <Typography as="span" variant="header" size="3xl" className="text-pine">{ABOUT_PROFILE.title}</Typography>
        </div>
      </div>
      <div>
        <Typography variant="text" size="sm" className="max-w-xl leading-6 opacity-80">{ABOUT_PROFILE.experiencedAs}</Typography>
        <div className="mt-4 flex flex-wrap gap-2">{ABOUT_PROFILE.focusAreas.map((area) => <Badge key={area} color="slate">{area}</Badge>)}</div>
      </div>
    </Section>
  );
}
