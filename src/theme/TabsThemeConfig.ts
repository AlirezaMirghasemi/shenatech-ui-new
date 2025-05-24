import { createTheme } from "flowbite-react";

export const TabsThemeConfig = createTheme({
  base: "flex flex-col gap-3 ",
  tablist: {
    base: "flex text-center py-3 px-4 ",
    variant: {
      default: "flex-wrap border-b border-border-default ",
      underline:
        "grid w-full grid-flow-col -mb-px flex-wrap border-b border-border-default pt-5",
      pills: "flex-wrap gap-2 text-sm font-medium",
      fullWidth:
        "grid w-full grid-flow-col divide-x divide-border-default  text-sm font-medium shadow",
    },
    tabitem: {
      base: " flex items-center justify-center p-5 mt-3  text-sm font-medium transition-all duration-[--transition-duration] ease-[--transition-timing] focus:outline-none focus:ring-2 focus:ring-[var(--colors-ring-default)] disabled:cursor-not-allowed disabled:opacity-[var(--opacity-disabled)] cursor-pointer",
      variant: {
        default: {
          base: "rounded-t-lg border-b-2",
          active: {
            on: "border-b-2 border-[var(--colors-border-focus)] text-text-link bg-bg-hover",
            off: "text-text-muted hover:bg-bg-hover hover:text-text-default",
          },
        },
        underline: {
          base: "rounded-t-lg border-b-2 ",
          active: {
            on: "border-b-2 border-[var(--colors-border-focus)] text-text-link",
            off: "border-b-2 border-transparent text-text-muted hover:border-border-interactive",
          },
        },
        pills: {
          base: "rounded-lg border border-border-default",
          active: {
            on: "bg-primary text-text-on-primary border-transparent",
            off: "text-text-muted hover:bg-bg-hover hover:text-text-default",
          },
        },
        fullWidth: {
          base: "flex w-full rounded-lg first:ms-0 ",
          active: {
            on: "bg-bg-hover text-text-default",
            off: "bg-bg-surface hover:bg-bg-hover hover:text-text-default",
          },
        },
      },
      icon: "me-2 h-5 w-5 shrink-0 ",
    },
  },
  tabpanel:
    "py-3 focus:outline-none focus:ring-2 focus:ring-[var(--colors-ring-default)] rounded-lg",
  helperText: {
    base: "mt-2 text-sm text-text-muted transition-opacity",
  },
});
