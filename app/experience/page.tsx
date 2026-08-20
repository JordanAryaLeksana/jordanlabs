import type { Metadata } from "next";
import { ExperienceTimeline } from "@/components/pages/experience/ExperienceTimeline";
import { Footer } from "@/components/pages/layout/Footer";
import { PROFILE } from "@/lib/config/profile";
import { CinematicPageChapter } from "@/components/pages/layout/CinematicPageChapter";
import { PortfolioHeader } from "@/components/pages/layout/PortfolioHeader";

export const metadata: Metadata = { title: `Experience — ${PROFILE.fullName}`, description: "Verified AI engineering, project management, and frontend leadership experience from Jordan Arya Leksana's CV.", alternates: { canonical: "/experience" } };

export default function ExperiencePage() { return <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)]"><CinematicPageChapter scene="experience" priority className="min-h-[72svh]"><PortfolioHeader /><ExperienceTimeline /></CinematicPageChapter><Footer /></main>; }
