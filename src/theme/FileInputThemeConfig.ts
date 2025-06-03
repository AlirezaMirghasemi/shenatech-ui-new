import { createTheme } from "flowbite-react";

export const FileInputThemeConfig = createTheme({
  base: " block w-full cursor-pointer  rounded-lg border border-border-default bg-bg-surface  file:cursor-pointer file:me-1 file:ms-1 file:border-none file:bg-primary file:py-1  file:text-sm file:font-medium file:leading-[inherit] file:text-text-on-primary hover:file:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-[var(--colors-ring-default)] transition-colors duration-[--transition-duration] ease-[--transition-timing]",
  sizes: {
    sm: "text-xs py-2",
    md: "text-sm py-2.5",
    lg: "text-lg py-3",
  },
  colors: {
    default: "focus:border-border-focus",
    info: "border-[var(--colors-status-info-border)] focus:border-[var(--colors-status-info-border)] focus:ring-[var(--colors-status-info-border)]",
    success:
      "border-[var(--colors-status-success-border)] focus:border-[var(--colors-status-success-border)] focus:ring-[var(--colors-status-success-border)]",
    warning:
      "border-[var(--colors-status-warning-border)] focus:border-[var(--colors-status-warning-border)] focus:ring-[var(--colors-status-warning-border)]",
    danger:
      "border-[var(--colors-status-danger-border)] focus:border-[var(--colors-status-danger-border)] focus:ring-[var(--colors-status-danger-border)]",
  },
});
