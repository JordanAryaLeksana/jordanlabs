import type { Metadata } from "next";
import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline";
import { Footer } from "@/components/layout/Footer";
import { PROFILE } from "@/lib/config/profile";

export const metadata: Metadata = { title: `Experience — ${PROFILE.fullName}`, description: "Verified AI engineering, project management, and frontend leadership experience from Jordan Arya Leksana's CV.", alternates: { canonical: "/experience" } };

export default function ExperiencePage() { return <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)]"><ExperienceTimeline /><Footer /></main>; }
