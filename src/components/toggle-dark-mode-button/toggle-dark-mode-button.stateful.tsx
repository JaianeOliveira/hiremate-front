"use client";

import { Moon, Sun } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export const ToggleDarkModeButtonStateful = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const nextMode = saved === "dark" || (saved === null && systemPrefersDark);

    document.documentElement.classList.toggle("dark", nextMode);
    setIsDark(nextMode);
  }, []);

  const toggleDarkMode = useCallback(() => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    setIsDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }, [isDark]);

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
