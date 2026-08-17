import { ArrowDownRightIcon } from "@phosphor-icons/react/dist/ssr";
import { Badge } from "@/components/interfaces/ui/Badge";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";

export function ContactHero() {
  return (
    <section className="relative flex min-h-[calc(64svh-4.75rem)] items-end overflow-hidden border-b border-text-on-dark/15">
      <div className="mx-auto grid w-full max-w-5xl gap-8 px-6 py-14 sm:grid-cols-[1fr_auto] sm:items-end sm:py-20">
        <div>
          <Badge color="pine">THE CLOSING CHAPTER</Badge>
          <Typography as="h1" variant="header" size="5xl" className="mt-5 max-w-4xl leading-[0.9] sm:text-7xl">
            Let&apos;s build something <span className="text-coral">worth discussing.</span>
          </Typography>
          <Typography variant="text" size="sm" className="mt-6 max-w-xl leading-7 text-text-on-dark/68">
            AI engineering, software collaboration, or a thoughtful role conversation—start with the channel that feels natural.
          </Typography>
        </div>
        <ArrowDownRightIcon size={42} className="hidden text-mustard sm:block" aria-hidden="true" />
      </div>
    </section>
  );
}
