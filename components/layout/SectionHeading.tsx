import { cn } from "@/lib/cn";
import { Typography } from "@/components/ui/Typography/Typography";

interface SectionHeadingProps {
  /** Label kecil bergaya mono di atas judul (mis. "01 / PROJECTS") -- penanda navigasi cepat bagi recruiter. */
  eyebrow: string;
  title: string;
  /** Warna blok kecil di depan eyebrow (token §5), pembeda antar-section. */
  accentColorClassName?: string;
  description?: string;
  className?: string;
}

/**
 * Kepala section yang konsisten di seluruh Home: blok kecil warna aset +
 * eyebrow mono, judul besar font display, dan deskripsi singkat opsional.
 * Konsistensi motif ini yang membuat halaman terasa satu sistem (CLAUDE.md
 * §4, §11 -- whitespace & disiplin warna, bukan efek).
 */
export function SectionHeading({
  eyebrow,
  title,
  accentColorClassName = "bg-coral",
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex max-w-2xl flex-col gap-3", className)}>
      <span className="flex items-center gap-2">
        <span className={cn("h-3 w-3", accentColorClassName)} />
        <Typography as="span" variant="text" size="sm" className="font-mono tracking-[0.2em] opacity-70">
          {eyebrow}
        </Typography>
      </span>
      <Typography as="h2" variant="header" size="4xl">
        {title}
      </Typography>
      {description ? (
        <Typography variant="text" size="base" className="opacity-80">
          {description}
        </Typography>
      ) : null}
    </div>
  );
}
