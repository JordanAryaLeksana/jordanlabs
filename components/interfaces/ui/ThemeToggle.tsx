"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { IconButton } from "@/components/interfaces/ui/IconButton";

type Theme = "dark" | "light";

function readStoredTheme(): Theme {
  const stored = window.localStorage.getItem("theme");
  return stored === "light" ? "light" : "dark";
}

/**
 * Toggle data-theme di <html> + persist localStorage; default gelap sesuai
 * CLAUDE.md §4 "Default gelap". Nilai awal state selalu "dark" supaya markup
 * client cocok dengan script anti-flash di app/layout.tsx sebelum useEffect
 * membaca preferensi tersimpan sesungguhnya.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(readStoredTheme());
  }, []);

  function handleToggle() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("theme", nextTheme);
  }

  return (
    <IconButton
      icon={theme === "dark" ? <SunIcon size={20} /> : <MoonIcon size={20} />}
      label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      onClick={handleToggle}
    />
  );
}
