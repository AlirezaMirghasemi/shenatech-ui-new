import { createTheme } from "flowbite-react";

export const AvatarThemeConfig = createTheme({
  root: {
    base: "flex items-center justify-center space-x-4 rounded transition-all duration-[--transition-duration] ease-[--transition-timing]",
    inner: "relative",
    bordered: " ring-2 ring-[var(--colors-border-default)]",
    rounded: "rounded-full",
    color: {
      dark: "ring-[var(--colors-border-default)]",
      failure: "ring-[var(--colors-status-danger-border)]",
      gray: "ring-[var(--colors-border-surface)]",
      info: "ring-[var(--colors-status-info-border)]",
      light: "ring-[var(--colors-border-surface)]",
      purple: "ring-[var(--colors-primary)]",
      success: "ring-[var(--colors-status-success-border)]",
      warning: "ring-[var(--colors-status-warning-border)]",
      pink: "ring-[var(--colors-accent)]",
      primary: "ring-[var(--colors-primary)]",
      secondary: "ring-[var(--colors-secondary)]",
      accent: "ring-[var(--colors-accent)]",
    },
    img: {
      base: "rounded object-cover",
      off: "relative overflow-hidden bg-[var(--colors-bg-alt)]",
      on: "",
      placeholder:
        "absolute -bottom-1 h-auto w-auto text-[var(--colors-text-muted)]",
    },
    size: {
      xs: "h-6 w-6",
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-20 w-20",
      xl: "h-36 w-36",
    },
    stacked: "ring-2 ring-[var(--colors-border-default)]",
    statusPosition: {
      "bottom-left": "-bottom-1 -start-1",
      "bottom-center": "-bottom-1 start-1/2 -translate-x-1/2",
      "bottom-right": "-bottom-1 -end-1",
      "top-left": "-start-1 -top-1",
      "top-center": "-top-1 start-1/2 -translate-x-1/2",
      "top-right": "-end-1 -top-1",
      "center-right": "-end-1 top-1/2 -translate-y-1/2",
      center: "top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2",
      "center-left": "-start-1 top-1/2 -translate-y-1/2",
    },
    status: {
      away: "bg-[var(--colors-status-warning-bg)]",
      base: "absolute h-3.5 w-3.5 rounded-full border-2 border-[var(--colors-bg-surface-border)]",
      busy: "bg-[var(--colors-status-danger-bg)]",
      offline: "bg-[var(--colors-bg-disabled)]",
      online: "bg-[var(--colors-status-success-bg)]",
    },
    initials: {
      text: "font-medium text-[var(--colors-text-default)]",
      base: "relative inline-flex items-center justify-center overflow-hidden bg-[var(--colors-bg-alt)]",
    },
  },
  group: {
    base: "flex -space-x-4 rtl:space-x-reverse",
  },
  groupCounter: {
    base: "relative flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xs font-medium text-[var(--colors-text-on-primary)] ring-2 ring-[var(--colors-border-default)] hover:bg-primary-hover transition-colors",
  },
});
