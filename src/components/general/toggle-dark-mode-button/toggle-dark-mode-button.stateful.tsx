"use client";

import { Moon, Sun } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export function getInitialDarkMode(): boolean {
  const saved = localStorage.getItem("theme"); // 'dark' | 'light' | null
  if (saved === "dark") return true;
  if (saved === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function applyDarkClass(isDark: boolean) {
  document.documentElement.classList.toggle("dark", isDark);
}

export const ToggleDarkModeButtonStateful = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const init = getInitialDarkMode();
    applyDarkClass(init);
    setIsDark(init);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      applyDarkClass(next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  }, []);

  return (
    <button
      type="button"
      onClick={toggleDarkMode}
      className="
        outline outline-zinc-800 dark:outline-zinc-100
        p-2 rounded-full
        fixed right-8 bottom-8
        bg-white dark:bg-zinc-900
        shadow-lg
        transition-colors
        hover:bg-zinc-100 dark:hover:bg-zinc-800
      "
    >
      {isDark ? (
        <Sun strokeWidth={2} size={18} />
      ) : (
        <Moon strokeWidth={1.2} size={18} />
      )}
    </button>
  );
};
