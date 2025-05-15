import { createTheme } from "flowbite-react";

export const AlertThemeConfig = createTheme({
  base: "flex flex-col gap-2 p-4 text-sm rounded-lg border border-border-default transition-all duration-[--transition-duration] ease-[--transition-timing]",
  borderAccent: "border-t-4 border-[var(--status-border)]",
  closeButton: {
    base: "-m-1.5 ml-auto inline-flex h-8 w-8 rounded-lg p-1.5 focus:ring-2 focus:ring-[var(--colors-ring-default)] hover:bg-[var(--colors-bg-hover)]",
    icon: "h-5 w-5",
    color: {
      info: "text-[var(--colors-status-info-text)]",
      success: "text-[var(--colors-status-success-text)]",
      warning: "text-[var(--colors-status-warning-text)]",
      danger: "text-[var(--colors-status-danger-text)]",
    },
  },
  color: {
    info: "bg-[var(--colors-status-info-bg)] border-[var(--colors-status-info-border)] text-[var(--colors-status-info-text)]",
    success:
      "bg-[var(--colors-status-success-bg)] border-[var(--colors-status-success-border)] text-[var(--colors-status-success-text)]",
    warning:
      "bg-[var(--colors-status-warning-bg)] border-[var(--colors-status-warning-border)] text-[var(--colors-status-warning-text)]",
    danger:
      "bg-[var(--colors-status-danger-bg)] border-[var(--colors-status-danger-border)] text-[var(--colors-status-danger-text)]",
  },
  icon: "mr-3 inline h-5 w-5 shrink-0 [&>svg]:fill-current",
  rounded: "rounded-lg",
  wrapper: "flex items-center",
});
