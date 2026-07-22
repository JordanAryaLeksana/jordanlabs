import { EnvelopeSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography/Typography";
import { CONTACT_PROFILE } from "@/lib/config/contact";

export function ContactCard() {
  return <article className="relative flex min-h-72 flex-col overflow-hidden border-2 border-current bg-pine p-6 text-text-on-dark md:col-span-2"><div aria-hidden="true" className="absolute -right-8 -top-8 h-32 w-32 border-[18px] border-mustard" /><EnvelopeSimpleIcon size={34} /><div className="relative mt-auto"><Typography as="p" variant="text" size="xs" className="tracking-[0.2em] opacity-70">CONTACT CARD / AVAILABLE</Typography><Typography as="h2" variant="header" size="3xl" className="mt-2">{CONTACT_PROFILE.name}</Typography><Typography variant="text" size="sm" className="mt-2">{CONTACT_PROFILE.focus} · {CONTACT_PROFILE.location}</Typography><Typography variant="text" size="sm" className="mt-4 max-w-xl leading-6 opacity-80">{CONTACT_PROFILE.responseNote}</Typography><div className="mt-5 flex flex-wrap gap-3"><Button href={CONTACT_PROFILE.emailUrl}>Send an email</Button><Button href="#contact-form" variant="ghost">Open contact form</Button></div></div></article>;
}
