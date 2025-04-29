"use client";

import React from "react";
import { ThemeMode, ThemeModeScript } from "flowbite-react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeModeScript mode={localStorage.getItem("theme") as ThemeMode} />
      {children}
    </>
  );
}
