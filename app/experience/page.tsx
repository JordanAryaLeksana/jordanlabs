import type { Metadata } from "next";
import { ExperienceTimeline } from "@/components/pages/experience/ExperienceTimeline";
import { Footer } from "@/components/pages/layout/Footer";
import { PROFILE } from "@/lib/config/profile";
import { SceneBackdrop } from "@/components/interfaces/scenes/SceneBackdrop";
import { PortfolioHeader } from "@/components/pages/layout/PortfolioHeader";

export const metadata: Metadata = { title: `Experience — ${PROFILE.fullName}`, description: "Verified AI engineering, project management, and frontend leadership experience from Jordan Arya Leksana's CV.", alternates: { canonical: "/experience" } };

export default function ExperiencePage() { return <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)]"><div className="relative min-h-[72svh] bg-ink-base text-text-on-dark"><SceneBackdrop scene="experience" priority /><PortfolioHeader /><div className="relative"><ExperienceTimeline /></div></div><Footer /></main>; }
