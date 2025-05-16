import { createTheme } from "flowbite-react";

export const PaginationThemeConfig = createTheme({
  base: "flex flex-col items-center gap-4",
  layout: {
    table: {
      base: "text-sm text-text-default",
      span: "font-semibold text-text-default",
    },
  },
  pages: {
    base: "inline-flex items-center gap-1",
    showIcon: "inline-flex",
    previous: {
      base: "rounded-s-lg border border-border-default bg-bg-surface px-3 py-2 text-text-muted transition-colors duration-[--transition-duration] hover:bg-bg-hover hover:text-text-default focus:outline-none focus:ring-2 focus:ring-[var(--colors-ring-default)]",
      icon: "h-5 w-5",
    },
    next: {
      base: "rounded-e-lg border border-border-default bg-bg-surface px-3 py-2 text-text-muted transition-colors duration-[--transition-duration] hover:bg-bg-hover hover:text-text-default focus:outline-none focus:ring-2 focus:ring-[var(--colors-ring-default)]",
      icon: "h-5 w-5",
    },
    selector: {
      base: "w-12 border border-border-default bg-bg-surface py-2 text-center text-text-default transition-colors duration-[--transition-duration] hover:bg-bg-hover focus:outline-none focus:ring-2 focus:ring-[var(--colors-ring-default)]",
      active:
        "bg-[var(--colors-status-info-bg)] text-[var(--colors-status-info-text)] ring-1 ring-[var(--colors-status-info-border)]",
      disabled: "cursor-not-allowed opacity-[var(--opacity-disabled)]",
    },
  },
});
