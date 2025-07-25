import { createTheme } from "flowbite-react";

// PopoverThemeConfig.ts
export const PopoverThemeConfig = createTheme({
  base: "absolute z-[9999] inline-block w-max rounded-lg border border-border-default bg-bg-surface shadow-lg",
  content: "z-[9999] overflow-hidden rounded-lg",
  arrow: {
    base: "absolute z-0 h-3 w-3 rotate-45 bg-bg-surface",
    placement: "-4px",
  },
});
