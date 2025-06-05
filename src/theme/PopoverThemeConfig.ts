import { createTheme } from "flowbite-react";

export const PopoverThemeConfig = createTheme({
  base: "absolute  z-50 inline-block w-max max-w-[100vw] rounded-lg border border-border-default bg-bg-surface shadow-lg outline-none  transition-all duration-[--transition-duration] ease-[--transition-timing]",
  inner: "relative p-0",
  content: "z-1000 overflow-hidden rounded-lg overflow-y-auto",
  arrow: {
    base: "absolute z-0 h-3 w-3 rotate-45 border border-border-default bg-bg-surface shadow-[0_0_0_1px_rgba(0,0,0,0.05)]",
    placement: "-6px",
  },
});
