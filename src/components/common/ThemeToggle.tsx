"use client";

import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";

export default function ThemeToggle({className}:{className?:string}) {
  const [theme, setTheme] = useState<"light" | "dark" | "">("");
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
    <>
    <div className={className ? className : "z-50 absolute m-5"}>
    <Button
      onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
      aria-label="تغییر تم"
      outline
      className="border-none outline-none rounded-full p-0"
      size="xs"

    >
      {theme === "light" ? (
        <FaMoon
          className=" rounded-full p-2  transition-colors transition-discrete duration-700
         hover:text-secondary-hover hover:bg-primary w-8 h-8 "
        />
      ) : (
        <FaSun
          className=" rounded-full p-2 transition-colors transition-discrete duration-700
         hover:text-secondary-hover hover:bg-primary w-8 h-8 "
        />
      )}
    </Button>
    </div>
    </>
  );
}
