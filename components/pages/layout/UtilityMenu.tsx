"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DownloadSimpleIcon, GithubLogoIcon, ListIcon, LinkedinLogoIcon, XIcon } from "@phosphor-icons/react";
import { ThemeToggle } from "@/components/interfaces/ui/ThemeToggle";
import { CV_URL, GITHUB_URL, LINKEDIN_URL } from "@/lib/config/links";
import { PAGE_ROUTES } from "@/lib/tools/types";

const LINKS = [["About", PAGE_ROUTES.about], ["Projects", PAGE_ROUTES.projects], ["Experience", PAGE_ROUTES.experience], ["Contact", PAGE_ROUTES.contact]] as const;

export function UtilityMenu() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); return; }
      if (event.key !== "Tab") return;
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [open]);

  return <>
    <button ref={triggerRef} type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="portfolio-menu" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-current/25 bg-[var(--surface)] px-4 font-mono text-xs font-bold backdrop-blur-md transition-colors hover:border-frame-green focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frame-green"><ListIcon size={19} /> Menu</button>
    {open ? <div className="fixed inset-0 z-[70] bg-ink-base/60 backdrop-blur-sm" onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}>
      <aside ref={panelRef} id="portfolio-menu" aria-label="Portfolio navigation and resources" className="ml-auto flex h-full w-full max-w-md flex-col overflow-y-auto bg-[var(--bg)] px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))] text-[var(--fg)] shadow-2xl sm:p-6">
        <div className="flex items-center justify-between"><span className="font-mono text-xs tracking-[0.2em] opacity-60">EXPLORE JORDAN</span><button ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="grid size-11 place-items-center rounded-full border border-current/20 focus-visible:outline-2 focus-visible:outline-frame-green"><XIcon size={20} /></button></div>
        <nav className="mt-8 flex flex-col sm:mt-14" aria-label="Content pages">{LINKS.map(([label, href], index) => <Link key={href} href={href} onClick={() => setOpen(false)} className="group flex items-center justify-between border-b border-current/15 py-4 font-display text-2xl hover:text-coral focus-visible:outline-2 focus-visible:outline-frame-green sm:py-5 sm:text-3xl"><span>{label}</span><span className="font-mono text-xs opacity-40">0{index + 1}</span></Link>)}</nav>
        <div className="mt-auto grid gap-3 pt-10"><a href={CV_URL} download className="flex min-h-12 items-center gap-3 rounded-xl bg-coral px-4 font-bold text-text-on-dark"><DownloadSimpleIcon size={20} />Download CV</a><div className="grid grid-cols-2 gap-3"><a href={GITHUB_URL} target="_blank" rel="noreferrer" className="flex min-h-12 items-center gap-2 rounded-xl border border-current/20 px-4"><GithubLogoIcon size={20} />GitHub</a><a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="flex min-h-12 items-center gap-2 rounded-xl border border-current/20 px-4"><LinkedinLogoIcon size={20} />LinkedIn</a></div><div className="flex items-center justify-between border-t border-current/15 pt-4"><span className="font-mono text-xs opacity-60">Appearance</span><ThemeToggle /></div></div>
      </aside>
    </div> : null}
  </>;
}
