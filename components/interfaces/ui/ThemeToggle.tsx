"use client";

import { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { IconButton } from "@/components/interfaces/ui/IconButton";

type Theme = "dark" | "light";

const THEME_CHANGE_EVENT = "portfolio-theme-change";

function readStoredTheme(): Theme {
  const stored = window.localStorage.getItem("theme");
  return stored === "light" ? "light" : "dark";
}

function readServerTheme(): Theme {
  return "dark";
}

function subscribeToThemeChange(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
  };
}

/**
 * Toggle data-theme di <html> + persist localStorage; default gelap sesuai
 * CLAUDE.md §4 "Default gelap". Nilai awal state selalu "dark" supaya markup
 * client cocok dengan script anti-flash di app/layout.tsx. localStorage
 * diperlakukan sebagai external store agar sinkronisasi mengikuti lifecycle React.
 */
export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeToThemeChange,
    readStoredTheme,
    readServerTheme
  );

  function handleToggle() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("theme", nextTheme);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }

  return (
    <IconButton
      icon={theme === "dark" ? <SunIcon size={20} /> : <MoonIcon size={20} />}
      label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      onClick={handleToggle}
    />
  );
}
