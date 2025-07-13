import { createTheme } from "flowbite-react";

export const ToggleSwitchThemeConfig = createTheme({
  root: {
    base: "group flex rounded-lg focus:outline-none",
    active: {
      on: "cursor-pointer",
      off: "cursor-not-allowed opacity-[var(--opacity-disabled)]",
    },
    label:
      "ms-3 mt-0.5 text-start text-sm font-medium text-[var(--colors-text-default)]",
    input: "sr-only",
  },
  toggle: {
    base: "relative rounded-full after:absolute after:rounded-full after:border after:bg-white after:transition-all group-focus:ring-4 group-focus:ring-[var(--colors-ring-default)]",
    checked: {
      on: "after:translate-x-full after:border-transparent rtl:after:-translate-x-full",
      off: "bg-[var(--colors-bg-interactive)] after:border-[var(--colors-border-default)]",
      color: {
        default:
          "bg-[var(--colors-primary)] group-focus:ring-[var(--colors-primary)]/30",
        blue: "bg-[var(--colors-info)] group-focus:ring-[var(--colors-info)]/30",
        dark: "bg-[var(--colors-neutral-800)] group-focus:ring-[var(--colors-neutral-800)]/30",
        failure:
          "bg-[var(--colors-danger)] group-focus:ring-[var(--colors-danger)]/30",
        gray: "bg-[var(--colors-neutral-500)] group-focus:ring-[var(--colors-neutral-500)]/30",
        green:
          "bg-[var(--colors-success)] group-focus:ring-[var(--colors-success)]/30",
        light:
          "bg-[var(--colors-bg-alt)] group-focus:ring-[var(--colors-bg-alt)]/30",
        red: "bg-[var(--colors-danger)] group-focus:ring-[var(--colors-danger)]/30",
        purple:
          "bg-[var(--colors-primary-400)] group-focus:ring-[var(--colors-primary-400)]/30",
        success:
          "bg-[var(--colors-success)] group-focus:ring-[var(--colors-success)]/30",
        yellow:
          "bg-[var(--colors-warning)] group-focus:ring-[var(--colors-warning)]/30",
        warning:
          "bg-[var(--colors-warning)] group-focus:ring-[var(--colors-warning)]/30",
        cyan: "bg-[var(--colors-info-400)] group-focus:ring-[var(--colors-info-400)]/30",
        lime: "bg-[var(--colors-success-300)] group-focus:ring-[var(--colors-success-300)]/30",
        indigo:
          "bg-[var(--colors-primary-600)] group-focus:ring-[var(--colors-primary-600)]/30",
        teal: "bg-[var(--colors-secondary-400)] group-focus:ring-[var(--colors-secondary-400)]/30",
        info: "bg-[var(--colors-info)] group-focus:ring-[var(--colors-info)]/30",
        pink: "bg-[var(--colors-accent)] group-focus:ring-[var(--colors-accent)]/30",
      },
    },
    sizes: {
      sm: "h-5 w-9 min-w-9 after:left-0.5 after:top-0.5 after:h-4 after:w-4 rtl:after:right-0.5",
      md: "h-6 w-11 min-w-11 after:left-0.5 after:top-0.5 after:h-5 after:w-5 rtl:after:right-0.5",
      lg: "h-7 w-[52px] min-w-[52px] after:left-0.5 after:top-0.5 after:h-6 after:w-6 rtl:after:right-0.5",
    },
  },
});
