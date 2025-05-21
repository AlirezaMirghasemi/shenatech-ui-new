import { createTheme } from "flowbite-react";

export const TextInputThemeConfig = createTheme({
  base: "flex w-full transition-all duration-[--transition-duration] ease-[--transition-timing] mb-1",
  addon:
    "inline-flex order-last items-center rounded-l-md border border-r-0 border-border-default bg-bg-alt px-3 text-sm text-text-default",
  field: {
    base: "relative w-full",
    icon: {
      base: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3",
      svg: "h-5 w-5 text-text-muted",
    },
    rightIcon: {
      base: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3",
      svg: "h-5 w-5 text-text-muted",
    },
    input: {
      base: "block w-full border border-border-default bg-bg-surface text-text-default placeholder-text-placeholder focus:outline-none focus:ring-2 focus:ring-[var(--colors-ring-default)] focus:ring-offset-1 disabled:cursor-not-allowed disabled:bg-bg-disabled disabled:opacity-[var(--opacity-disabled)]",
      sizes: {
        sm: "p-2 text-xs",
        md: "p-3 text-sm",
        lg: "p-4 text-base",
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
      withRightIcon: {
        on: "pr-10",
        off: "",
      },
      withIcon: {
        on: "pl-10",
        off: "",
      },
      withAddon: {
        on: "rounded-r-lg",
        off: "rounded-lg",
      },
      withShadow: {
        on: "shadow-sm",
        off: "",
      },
    },
  },
});
