import { createTheme } from "flowbite-react";

export const BadgeThemeConfig = createTheme({
  root: {
    base: "inline-flex h-fit items-center gap-1 font-semibold transition-colors duration-[--transition-duration] ease-[--transition-timing]",
    color: {
      info: "bg-[var(--colors-status-info-bg)] text-[var(--colors-status-info-text)] hover:bg-[var(--colors-status-info-border)]",
      success:
        "bg-[var(--colors-status-success-bg)] text-[var(--colors-status-success-text)] hover:bg-[var(--colors-status-success-border)]",
      warning:
        "bg-[var(--colors-status-warning-bg)] text-[var(--colors-status-warning-text)] hover:bg-[var(--colors-status-warning-border)]",
      danger:
        "bg-[var(--colors-status-danger-bg)] text-[var(--colors-status-danger-text)] hover:bg-[var(--colors-status-danger-border)]",
      neutral:
        "bg-[var(--colors-bg-alt)] text-[var(--colors-text-default)] hover:bg-[var(--colors-bg-hover)]",
      primary:
        "bg-primary/20 text-[var(--colors-text-on-primary)] hover:bg-primary/30",
      secondary:
        "bg-secondary/20 text-[var(--colors-text-on-secondary)] hover:bg-secondary/30",
      accent:
        "bg-accent/20 text-[var(--colors-text-on-accent)] hover:bg-accent/30",
    },
    size: {
      xs: "px-2 py-0.5 text-xs",
      sm: "px-2.5 py-1 text-sm",
      md: "px-3 py-1.5 text-base",
    },
  },
  icon: {
    off: "rounded-lg px-2 py-0.5",
    on: "rounded-full p-1.5",
    size: {
      xs: "h-3.5 w-3.5",
      sm: "h-4 w-4",
      md: "h-5 w-5",
    },
  },
});
