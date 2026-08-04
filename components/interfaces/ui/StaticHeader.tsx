import { DownloadSimpleIcon, GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { KineticHeading } from "@/components/interfaces/retro/KineticHeading";
import { DiagonalStripes } from "@/components/interfaces/retro/DiagonalStripes";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import { Button } from "@/components/interfaces/ui/Button";
import { Pill } from "@/components/interfaces/ui/Pill";
import { IconButton } from "@/components/interfaces/ui/IconButton";
import { ThemeToggle } from "@/components/interfaces/ui/ThemeToggle";
import { PROFILE } from "@/lib/config/profile";
import { CV_URL, GITHUB_URL, LINKEDIN_URL } from "@/lib/config/links";
import { PAGE_ROUTES } from "@/lib/tools/types";

const CONTENT_PAGE_LINKS = [
  { label: "About", href: PAGE_ROUTES.about },
  { label: "Projects", href: PAGE_ROUTES.projects },
  { label: "Experience", href: PAGE_ROUTES.experience },
  { label: "Contact", href: PAGE_ROUTES.contact },
] as const;

/**
 * Header statis landing (CLAUDE.md §1a, docs/landing.md §3): server-rendered
 * penuh supaya info inti (nama, posisi, CV, sosial) terlihat & terindeks SEO
 * tanpa menunggu chat dimuat.
 */
export function StaticHeader() {
  return (
    <header className="flex flex-col gap-4 border-b border-ink-raised px-6 py-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <KineticHeading text={PROFILE.fullName} underline />
            <Typography as="p" variant="text" size="sm" className="opacity-70">
              {PROFILE.role}
            </Typography>
          </div>
          <DiagonalStripes className="h-12 w-3" stripeCount={4} />
        </div>

        <div className="flex items-center gap-2">
          <Button href={CV_URL} download variant="primary">
            <DownloadSimpleIcon size={18} className="mr-2 inline" />
            Download CV
          </Button>
          <IconButton
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            icon={<GithubLogoIcon size={20} />}
            label="Open GitHub profile"
          />
          <IconButton
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            icon={<LinkedinLogoIcon size={20} />}
            label="Open LinkedIn profile"
          />
          <ThemeToggle />
        </div>
      </div>

      <nav className="flex flex-wrap gap-2" aria-label="Content pages">
        {CONTENT_PAGE_LINKS.map((link) => (
          <Pill key={link.href} href={link.href}>
            {link.label}
          </Pill>
        ))}
      </nav>
    </header>
  );
}
