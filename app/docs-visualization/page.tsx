import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnimationShowcase } from "./AnimationShowcase";

export const metadata: Metadata = {
  title: "Visual Playground — Development Only",
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

export default function AnimationDemoPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <AnimationShowcase />;
}
