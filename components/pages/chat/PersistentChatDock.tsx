"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChatCircleDotsIcon, MinusIcon } from "@phosphor-icons/react";
import { ChatWidget } from "@/components/pages/chat/ChatWidget";
import { IconButton } from "@/components/interfaces/ui/IconButton";

export function PersistentChatDock() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const input = panelRef.current?.querySelector("input");
    input?.focus();
  }, [isOpen]);

  if (pathname === "/") return null;

  return isOpen ? (
    <aside ref={panelRef} aria-label="Jordan's AI assistant" className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-50 flex h-[min(34rem,72svh)] w-[min(26rem,calc(100vw-2rem))] flex-col border-2 border-current bg-[var(--bg)] shadow-[6px_6px_0_0_var(--color-slate)]">
      <div className="flex items-center justify-between border-b border-current/20 bg-pine px-3 py-2 text-text-on-dark"><span className="font-mono text-xs font-bold tracking-wider">AI ASSISTANT / ONLINE</span><IconButton icon={<MinusIcon size={18} />} label="Minimize assistant" onClick={() => setIsOpen(false)} /></div>
      <ChatWidget
        variant="dock"
        className="min-h-0 flex-1"
      />
    </aside>
  ) : (
    <button type="button" onClick={() => setIsOpen(true)} className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-50 inline-flex items-center gap-3 border-2 border-current bg-pine px-4 py-3 font-mono text-sm font-bold text-text-on-dark shadow-[4px_4px_0_0_var(--color-slate)] transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frame-green motion-reduce:transition-none motion-reduce:hover:translate-y-0" aria-label="Open Jordan's AI assistant"><ChatCircleDotsIcon size={22} />Ask Jordan&apos;s AI</button>
  );
}
