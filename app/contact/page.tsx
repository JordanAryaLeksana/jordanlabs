import type { Metadata } from "next";
import { ContactForm } from "@/components/pages/contact/ContactForm";
import { ContactHero } from "@/components/pages/contact/ContactHero";
import { SocialMasonry } from "@/components/pages/contact/SocialMasonry";
import { Footer } from "@/components/pages/layout/Footer";
import { PROFILE } from "@/lib/config/profile";
import { CinematicPageChapter } from "@/components/pages/layout/CinematicPageChapter";
import { PortfolioHeader } from "@/components/pages/layout/PortfolioHeader";

export const metadata: Metadata = { title: `Contact ${PROFILE.fullName}`, description: "Contact Jordan Arya Leksana for AI engineering, software projects, collaboration, or recruitment conversations.", alternates: { canonical: "/contact" } };

export default function ContactPage() { return <main className="min-h-screen overflow-x-clip bg-[var(--bg)] text-[var(--fg)]"><CinematicPageChapter scene="contact" priority className="min-h-[64svh]"><PortfolioHeader /><ContactHero /></CinematicPageChapter><SocialMasonry /><ContactForm /><Footer /></main>; }
