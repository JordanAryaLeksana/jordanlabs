import { Typography } from "@/components/ui/Typography/Typography";
import { SandboxSwingBadge } from "@/components/scenes/SandboxSwingBadge";
import { EMAIL_MAILTO_URL, GITHUB_URL, LINKEDIN_URL } from "@/lib/config/links";
import { PROFILE } from "@/lib/config/profile";

/** Strip blok warna di puncak footer -- motif color-block bar sebagai pemisah bergaya (§6a Divider). */
const TOP_STRIP_COLOR_CLASS_NAMES = ["bg-coral", "bg-mustard", "bg-pine", "bg-slate", "bg-brick", "bg-plum"];

/** Tautan cepat ke section Home; id-nya mencerminkan SECTION_IDS di lib/tools/types.ts (CLAUDE.md §1a). */
const FOOTER_NAV_LINKS = [
  { label: "Projects", href: "#featured-projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Research", href: "#research" },
  { label: "Contact", href: "#contact" },
] as const;

const FOOTER_SOCIAL_LINKS = [
  { label: "GitHub", href: GITHUB_URL },
  { label: "LinkedIn", href: LINKEDIN_URL },
  { label: "Email", href: EMAIL_MAILTO_URL },
] as const;

/**
 * Footer situs (CLAUDE.md §1a): tautan cepat + sosial, ditutup baris watermark
 * -- ilustrasi sandbox kecil di ujung kanan-bawah sebagai tanda tangan visual
 * nuansa drama startup. Bukan target scroll tool, jadi tanpa id section.
 */
export function Footer() {
  return (
    <footer className="bg-ink-panel text-text-on-dark">
      <div aria-hidden className="flex h-1.5">
        {TOP_STRIP_COLOR_CLASS_NAMES.map((colorClassName) => (
          <span key={colorClassName} className={`h-full flex-1 ${colorClassName}`} />
        ))}
      </div>

      <div className="mx-auto grid w-full max-w-5xl gap-10 px-6 py-12 md:grid-cols-3">
        <div className="flex flex-col gap-2">
          <Typography as="p" variant="header" size="xl">
            JORDAN-LABS
          </Typography>
          <Typography as="p" variant="text" size="sm" className="opacity-70">
            {PROFILE.fullName} — {PROFILE.role}
          </Typography>
        </div>

        <nav className="flex flex-col gap-2" aria-label="Quick links">
          <Typography as="span" variant="text" size="xs" className="font-mono tracking-[0.2em] opacity-50">
            EXPLORE
          </Typography>
          {FOOTER_NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="font-sans text-sm opacity-80 hover:underline">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-2">
          <Typography as="span" variant="text" size="xs" className="font-mono tracking-[0.2em] opacity-50">
            CONNECT
          </Typography>
          {FOOTER_SOCIAL_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="font-sans text-sm opacity-80 hover:underline"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-ink-raised">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <Typography as="p" variant="text" size="xs" className="font-mono opacity-60">
            © 2026 {PROFILE.fullName}
          </Typography>
          <span className="flex items-center gap-2">
            <Typography as="span" variant="text" size="xs" className="hidden font-mono opacity-50 sm:inline">
              from the sandbox
            </Typography>
            <SandboxSwingBadge className="w-8 opacity-90" />
          </span>
        </div>
      </div>
    </footer>
  );
}
