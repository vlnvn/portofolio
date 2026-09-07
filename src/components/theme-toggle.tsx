"use client";

import { useEffect, useRef } from "react";

type Theme = "light" | "dark";

const storageKey = "portfolio-theme";

function currentTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function updateButton(button: HTMLButtonElement, theme: Theme) {
  const isDark = theme === "dark";
  button.setAttribute("aria-checked", String(isDark));
  button.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode",
  );
}

export function ThemeToggle() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonRef.current) updateButton(buttonRef.current, currentTheme());
  }, []);

  function toggleTheme() {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
    localStorage.setItem(storageKey, next);
    if (buttonRef.current) updateButton(buttonRef.current, next);
  }

  return (
    <button
      ref={buttonRef}
      className="theme-switch"
      type="button"
      role="switch"
      aria-checked="false"
      aria-label="Switch to dark mode"
      onClick={toggleTheme}
    >
      <svg className="theme-icon sun-icon" aria-hidden="true" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
      </svg>
      <span className="switch-track" aria-hidden="true">
        <span className="switch-thumb" />
      </span>
      <svg className="theme-icon moon-icon" aria-hidden="true" viewBox="0 0 24 24">
        <path d="M20 15.2A8.5 8.5 0 0 1 8.8 4 8.5 8.5 0 1 0 20 15.2Z" />
      </svg>
    </button>
  );
}
