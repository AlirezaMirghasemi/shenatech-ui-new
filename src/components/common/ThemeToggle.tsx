"use client";

import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initialTheme = storedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (theme === "dark") {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
      aria-label="تغییر تم"
    >
      {theme === "light" ? (
        <FaMoon
          className=" rounded-full p-2 mr-2 transition-colors transition-discrete duration-700
         hover:text-secondary-hover hover:bg-primary w-8 h-8 "
        />
      ) : (
        <FaSun
          className=" rounded-full p-2 mr-2 transition-colors transition-discrete duration-700
         hover:text-secondary-hover hover:bg-primary w-8 h-8 "
        />
      )}
    </button>
  );
}
