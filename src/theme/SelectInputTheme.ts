import { createTheme } from "flowbite-react";

export const SelectInputThemeConfig = createTheme({
  base: "flex w-full transition-all duration-[--transition-duration] ease-[--transition-timing] mb-1",
  addon: "inline-flex items-center rounded-s-lg border border-e-0 border-border-default bg-bg-alt px-3 text-sm text-text-default transition-colors",
  field: {
    base: "relative w-full",
    icon: {
      base: "pointer-events-none absolute end-3 top-1/2 -translate-y-1/2",
      svg: "h-5 w-5 text-text-muted transition-colors"
    },
    select: {
      base: "block w-full appearance-none border border-border-default bg-bg-surface text-text-default placeholder-text-placeholder focus:outline-none focus:ring-2 focus:ring-[var(--colors-ring-default)] focus:ring-offset-1 disabled:cursor-not-allowed disabled:bg-bg-accent disabled:opacity-[var(--opacity-disabled)] transition-all duration-[--transition-duration] ease-[--transition-timing]",
      withIcon: {
        on: "pe-10 ps-3",
        off: "px-3"
      },
      withAddon: {
        on: "rounded-s-none rounded-e-lg",
        off: "rounded-lg"
      },
      withShadow: {
        on: "shadow-sm hover:shadow-md",
        off: ""
      },
      sizes: {
        sm: "py-2 text-xs",
        md: "py-2.5 text-sm",
        lg: "py-3 text-base"
      },
      colors: {
        default: "focus:border-border-focus",
        info: "border-[var(--colors-status-info-border)] focus:border-[var(--colors-status-info-border)] focus:ring-[var(--colors-status-info-border)]",
        success: "border-[var(--colors-status-success-border)] focus:border-[var(--colors-status-success-border)] focus:ring-[var(--colors-status-success-border)]",
        warning: "border-[var(--colors-status-warning-border)] focus:border-[var(--colors-status-warning-border)] focus:ring-[var(--colors-status-warning-border)]",
        danger: "border-[var(--colors-status-danger-border)] focus:border-[var(--colors-status-danger-border)] focus:ring-[var(--colors-status-danger-border)]"
      }
    }
  },
  helperText: {
    base: "mt-2 text-sm text-text-muted transition-opacity"
  }
});
