import { createTheme } from "flowbite-react";

export const DropdownThemeConfig = createTheme({
  arrowIcon: "ms-2 h-4 w-4 text-text-muted",
  content:
    "py-1 focus:outline-none focus:ring-2 focus:ring-[var(--colors-ring-default)]",
  floating: {
    animation:
      "transition-all duration-[--transition-duration] ease-[--transition-timing]",
    arrow: {
      base: "absolute z-10 h-2 w-2 rotate-45 border border-border-default bg-bg-surface",
      placement: "-4px",
    },
    base: "z-10 w-fit divide-y divide-border-surface rounded-lg shadow-lg bg-bg-surface border border-border-default",
    content: "py-1 text-sm text-text-default",
    divider: "my-1 h-px bg-border-surface",
    header: "block px-4 py-2 text-sm text-text-secondary",
    hidden: "invisible opacity-0",
    item: {
      container: "rtl:text-right",
      base: "flex w-full cursor-pointer items-center justify-start px-4 py-2 text-sm text-text-default transition-colors duration-[--transition-duration] hover:bg-[var(--colors-bg-hover)] focus:bg-[var(--colors-bg-active)] focus:outline-none",
      icon: "me-2 h-4 w-4 text-text-muted",
    },
    target: "w-fit",
  },
  inlineWrapper: "flex items-center gap-2",
});
