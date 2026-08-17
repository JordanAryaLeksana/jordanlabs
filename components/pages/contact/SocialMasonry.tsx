import {
  ArrowUpRightIcon,
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import { CONTACT_CHANNELS, CONTACT_PROFILE } from "@/lib/config/contact";

const CHANNELS = [
  {
    label: "EMAIL",
    value: CONTACT_PROFILE.email,
    href: CONTACT_PROFILE.emailUrl,
    icon: <EnvelopeSimpleIcon size={21} />,
    accent: "text-coral",
  },
  {
    label: "GITHUB",
    value: CONTACT_CHANNELS.github.handle,
    href: CONTACT_CHANNELS.github.url,
    icon: <GithubLogoIcon size={21} />,
    accent: "text-sage",
  },
  {
    label: "LINKEDIN",
    value: CONTACT_CHANNELS.linkedin.handle,
    href: CONTACT_CHANNELS.linkedin.url,
    icon: <LinkedinLogoIcon size={21} />,
    accent: "text-slate",
  },
] as const;

export function SocialMasonry() {
  return (
    <section id="contact-socials" className="border-b border-current/10 bg-[var(--bg)]">
      <div className="mx-auto w-full max-w-5xl px-6 py-10 sm:py-14">
        <div className="flex flex-wrap items-end justify-between gap-5 pb-7">
          <div>
            <Typography as="p" variant="text" size="xs" className="font-mono tracking-[0.2em] opacity-50">
              DIRECT CHANNELS
            </Typography>
            <Typography as="h2" variant="header" size="2xl" className="mt-2">
              Choose one. Keep it simple.
            </Typography>
          </div>
          <Typography variant="text" size="xs" className="max-w-sm leading-5 opacity-58">
            {CONTACT_PROFILE.responseNote}
          </Typography>
        </div>

        <div className="border-t border-current/12">
          {CHANNELS.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel={channel.href.startsWith("http") ? "noreferrer noopener" : undefined}
              className="group grid min-h-16 grid-cols-[2rem_1fr_auto] items-center gap-3 border-b border-current/12 py-4 focus-visible:outline-2 focus-visible:outline-frame-green"
            >
              <span className={channel.accent}>{channel.icon}</span>
              <span>
                <span className="block font-mono text-[10px] tracking-[0.16em] opacity-48">{channel.label}</span>
                <span className="mt-1 block break-all font-display text-base font-bold group-hover:text-coral">{channel.value}</span>
              </span>
              <ArrowUpRightIcon size={17} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
