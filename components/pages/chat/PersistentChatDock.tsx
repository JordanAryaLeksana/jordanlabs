"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChatCircleDotsIcon, MinusIcon } from "@phosphor-icons/react";
import { ChatWidget } from "@/components/pages/chat/ChatWidget";
import { IconButton } from "@/components/interfaces/ui/IconButton";

export function PersistentChatDock() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    if (window.matchMedia("(max-width: 639px)").matches) document.body.style.overflow = "hidden";
    panelRef.current?.querySelector("input")?.focus();
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [isOpen]);

  if (pathname === "/") return null;

  return isOpen ? <aside ref={panelRef} aria-label="Jordan's AI assistant" className="fixed inset-0 z-50 flex h-[100svh] w-full flex-col overflow-hidden bg-[var(--bg)] sm:inset-auto sm:bottom-[max(1rem,env(safe-area-inset-bottom))] sm:right-4 sm:h-[min(38rem,78svh)] sm:w-[min(28rem,calc(100vw-2rem))] sm:rounded-2xl sm:border sm:border-current/15 sm:shadow-2xl"><div className="flex items-center justify-between border-b border-current/10 px-4 py-3"><span className="font-display text-sm font-bold">Jordan AI</span><IconButton icon={<MinusIcon size={18} />} label="Minimize assistant" onClick={() => setIsOpen(false)} /></div><ChatWidget variant="dock" className="min-h-0 flex-1" /></aside> : <button ref={triggerRef} type="button" onClick={() => setIsOpen(true)} className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-3 z-50 inline-flex min-h-12 items-center gap-2 rounded-full bg-pine px-4 font-sans text-sm font-bold text-text-on-dark shadow-xl transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frame-green motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:right-4 sm:gap-3 sm:px-5" aria-label="Open Jordan's AI assistant"><ChatCircleDotsIcon size={22} /><span className="hidden min-[340px]:inline">Ask Jordan AI</span></button>;
}
