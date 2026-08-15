import { EnvelopeSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/interfaces/ui/Button";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import { CONTACT_PROFILE } from "@/lib/config/contact";

export function ContactCard() {
  return <article className="relative flex min-h-72 flex-col overflow-hidden rounded-2xl bg-pine p-6 text-text-on-dark shadow-lg md:col-span-2 sm:p-8"><div className="flex items-center justify-between"><span className="grid size-12 place-items-center rounded-full bg-text-on-dark/10"><EnvelopeSimpleIcon size={24} /></span><span className="rounded-full bg-text-on-dark/10 px-3 py-1 font-mono text-[10px] tracking-[0.16em]">AVAILABLE</span></div><div className="relative mt-auto pt-12"><Typography as="h2" variant="header" size="3xl">{CONTACT_PROFILE.name}</Typography><Typography variant="text" size="sm" className="mt-2">{CONTACT_PROFILE.focus} · {CONTACT_PROFILE.location}</Typography><Typography variant="text" size="sm" className="mt-4 max-w-xl leading-6 opacity-80">{CONTACT_PROFILE.responseNote}</Typography><div className="mt-6 flex flex-wrap gap-3"><Button href={CONTACT_PROFILE.emailUrl}>Send an email</Button><Button href="#contact-form" variant="ghost">Use contact form</Button></div></div></article>;
}
