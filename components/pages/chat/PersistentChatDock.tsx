"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRightIcon,
  ChatCircleDotsIcon,
  MinusIcon,
} from "@phosphor-icons/react";
import { ChatWidget } from "@/components/pages/chat/ChatWidget";
import { IconButton } from "@/components/interfaces/ui/IconButton";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import { usePortfolioChat } from "@/components/pages/chat/usePortfolioChat";
import { isChatBusy } from "@/components/pages/chat/isChatBusy";
import { FUNCTIONAL_EASE } from "@/components/interfaces/motion/motionConfig";

interface PageCompanionContext {
  label: string;
  action: string;
  prompt: string;
}

function getPageCompanionContext(pathname: string): PageCompanionContext {
  if (pathname.startsWith("/projects/")) {
    return {
      label: "PROJECT DETAIL",
      action: "Explain this project",
      prompt: "Explain this project's problem, engineering approach, evidence, and limitations without navigating away from the page.",
    };
  }

  const contexts: Record<string, PageCompanionContext> = {
    "/about": {
      label: "ABOUT JORDAN",
      action: "Explain Jordan's profile",
      prompt: "Summarize Jordan's background and strongest documented skills from this page without navigating away.",
    },
    "/projects": {
      label: "PROJECTS",
      action: "Help me choose a project",
      prompt: "Help me choose which Jordan project to inspect based on technical depth and relevance. Keep me on this page for now.",
    },
    "/experience": {
      label: "EXPERIENCE",
      action: "Summarize the impact",
      prompt: "Summarize Jordan's most relevant experience, ownership, and documented impact without navigating away.",
    },
    "/contact": {
      label: "CONTACT",
      action: "Help me connect",
      prompt: "Help me choose the best supported way to contact Jordan. Keep the options inside this conversation.",
    },
  };

  return contexts[pathname] ?? {
    label: "PORTFOLIO GUIDE",
    action: "Explain this page",
    prompt: "Explain what I can learn about Jordan on this page without navigating away.",
  };
}

export function PersistentChatDock() {
  const pathname = usePathname();
  const { sendMessage, status } = usePortfolioChat();
  const reducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);
  const context = getPageCompanionContext(pathname);
  const disabled = isChatBusy(status);
  const transition = {
    duration: reducedMotion ? 0 : 0.32,
    ease: FUNCTIONAL_EASE,
  };

  function openAssistant() {
    previouslyFocusedElementRef.current = document.activeElement as HTMLElement | null;
    setIsOpen(true);
  }

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    panelRef.current?.querySelector("input")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocusedElementRef.current?.focus();
    };
  }, [isOpen]);

  if (pathname === "/") return null;

  return (
    <AnimatePresence initial={false} mode="wait">
      {isOpen ? (
        <motion.aside
          key="companion-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Jordan AI companion"
          className="fixed inset-0 z-50 flex h-[100svh] w-full flex-col overflow-hidden bg-[var(--bg)] text-[var(--fg)] sm:inset-auto sm:bottom-[max(1rem,env(safe-area-inset-bottom))] sm:left-4 sm:h-[min(40rem,82svh)] sm:w-[min(30rem,calc(100vw-2rem))] sm:rounded-2xl sm:border sm:border-current/15 sm:shadow-2xl"
          initial={{ opacity: 0, x: reducedMotion ? 0 : -18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: reducedMotion ? 0 : -12 }}
          transition={transition}
        >
          <header className="flex items-center justify-between gap-4 border-b border-current/10 px-4 py-3">
            <div className="min-w-0">
              <Typography as="p" variant="header" size="sm" weight="bold">
                Jordan AI
              </Typography>
              <Typography
                as="p"
                variant="text"
                size="xs"
                className="mt-1 truncate font-mono tracking-[0.12em] opacity-48"
              >
                {context.label}
              </Typography>
            </div>
            <IconButton
              icon={<MinusIcon size={18} />}
              label="Minimize assistant"
              onClick={() => setIsOpen(false)}
            />
          </header>

          <button
            type="button"
            disabled={disabled}
            onClick={() => sendMessage({ text: context.prompt })}
            className="group flex min-h-12 shrink-0 items-center justify-between gap-3 border-b border-current/10 px-4 text-left font-mono text-[11px] font-bold transition-colors hover:bg-[var(--bg-raised)] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-frame-green disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span>{context.action}</span>
            <ArrowRightIcon
              size={15}
              aria-hidden="true"
              className="shrink-0 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
            />
          </button>

          <ChatWidget variant="dock" className="min-h-0 flex-1" />
        </motion.aside>
      ) : (
        <motion.button
          key="companion-rail"
          type="button"
          onClick={openAssistant}
          aria-label="Open Jordan AI companion"
          className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-3 z-50 inline-flex min-h-12 items-center gap-2 rounded-full bg-pine px-4 font-sans text-sm font-bold text-text-on-dark shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frame-green sm:bottom-1/2 sm:left-0 sm:right-auto sm:min-h-0 sm:translate-y-1/2 sm:flex-col sm:gap-3 sm:rounded-l-none sm:rounded-r-xl sm:px-3 sm:py-5"
          initial={{ opacity: 0, x: reducedMotion ? 0 : -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: reducedMotion ? 0 : -8 }}
          whileHover={reducedMotion ? undefined : { x: 3 }}
          transition={transition}
        >
          <ChatCircleDotsIcon size={22} aria-hidden="true" />
          <span className="hidden min-[340px]:inline sm:[writing-mode:vertical-rl] sm:rotate-180">
            Ask Jordan AI
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
