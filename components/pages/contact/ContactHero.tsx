import { Badge } from "@/components/interfaces/ui/Badge";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";

export function ContactHero() {
  return <section className="relative overflow-hidden border-b border-current/15"><div className="mx-auto w-full max-w-5xl px-6 py-14 sm:py-24"><Badge color="pine">LET&apos;S CONNECT</Badge><Typography as="h1" variant="header" size="5xl" className="mt-5 max-w-3xl leading-none sm:text-7xl">Have an AI idea or engineering opportunity?</Typography><Typography variant="text" size="sm" className="mt-6 max-w-xl leading-6 opacity-70">Choose the channel that works best for you, or send a direct message through the contact form.</Typography></div></section>;
}
