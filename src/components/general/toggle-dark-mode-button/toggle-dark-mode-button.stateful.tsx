"use client";

import { Button } from "@/components/ui/button";
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
    <Button
      onClick={toggleDarkMode}
      className="
       fixed right-8 bottom-8
       aspect-square
      "
    >
      {isDark ? (
        <Sun strokeWidth={2} size={18} className="stroke-neutral-100" />
      ) : (
        <Moon strokeWidth={1.5} size={18} className="stroke-neutral-100" />
      )}
    </Button>
  );
};
