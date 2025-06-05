import { createTheme } from "flowbite-react";

export const TooltipThemeConfig = createTheme({
  target: "w-fit",
  animation:
    "transition-opacity duration-[--transition-duration] ease-[--transition-timing]",
  arrow: {
    base: "absolute z-10 h-3 w-3 rotate-45 border border-border-default bg-bg-alt shadow-[0_0_0_1px_rgba(0,0,0,0.05)]",
    placement: "-6px",
  },
  base: "absolute z-10 inline-block rounded-lg px-3 py-2 text-sm font-medium shadow-lg bg-bg-alt text-text-default border border-border-default max-w-xs",
  hidden: "invisible opacity-0 pointer-events-none",
  content: "relative z-20 text-center",
});
