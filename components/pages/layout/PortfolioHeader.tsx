import Link from "next/link";
import { PROFILE } from "@/lib/config/profile";
import { UtilityMenu } from "@/components/pages/layout/UtilityMenu";

export function PortfolioHeader() {
  return <header className="relative z-40 flex items-center justify-between gap-4 px-5 py-4 text-current sm:px-8"><Link href="/" className="group leading-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-frame-green"><span className="block font-display text-base font-bold group-hover:text-coral">{PROFILE.fullName}</span><span className="block font-mono text-[10px] tracking-[0.14em] opacity-65">SOFTWARE / AI ENGINEER</span></Link><UtilityMenu /></header>;
}
