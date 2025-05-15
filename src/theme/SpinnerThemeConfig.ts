import { createTheme } from "flowbite-react";

export const SpinnerThemeConfig = createTheme({
  base: "inline animate-spin text-[var(--colors-text-muted)] transition-colors duration-[--transition-duration] ease-[--transition-timing]",
  color: {
    default: "fill-[var(--colors-primary)]",
    danger: "fill-[var(--colors-status-danger-text)]",
    info: "fill-[var(--colors-status-info-text)]",
    success: "fill-[var(--colors-status-success-text)]",
    warning: "fill-[var(--colors-status-warning-text)]",
  },
  size: {
    xs: "h-3 w-3",
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-10 w-10",
  },
});
