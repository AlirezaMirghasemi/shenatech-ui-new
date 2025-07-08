import { createTheme } from "flowbite-react";

export const TextInputThemeConfig = createTheme({
  base: "flex w-full transition-all duration-[--transition-duration] ease-[--transition-timing] mb-1",
  addon:
    "inline-flex order-last items-center rounded-l-md border border-r-0 border-border-default bg-bg-alt px-3 text-sm text-text-default transition-colors duration-[--transition-duration] ease-[--transition-timing]",
  field: {
    base: "relative w-full",
    icon: {
      base: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 transition-colors duration-[--transition-duration] ease-[--transition-timing]",
      svg: "h-5 w-5 text-text-muted",
    },
    rightIcon: {
      base: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 transition-colors duration-[--transition-duration] ease-[--transition-timing]",
      svg: "h-5 w-5 text-text-muted",
    },
    input: {
      base: "block w-full bg-bg-surface text-text-default placeholder-text-placeholder transition-all duration-[--transition-duration] ease-[--transition-timing] focus:outline-none disabled:cursor-not-allowed disabled:bg-bg-disabled disabled:opacity-[var(--opacity-disabled)]",
      sizes: {
        sm: "p-2 text-xs rounded-md",
        md: "p-3 text-sm rounded-lg",
        lg: "p-4 text-base rounded-lg",
      },
      colors: {
        default: `
          border
          border-t-[0.5px]
          border-x-[0.5px]
          border-b
          border-border-default
          focus:border-x-[0.5px]
          focus:border-b
          focus:border-t-0
          focus:border-t-transparent
          focus:ring-0
          focus:ring-inset
          focus:ring-[var(--colors-ring-default)]
          focus:shadow-[0_2px_0_0_var(--colors-ring-default)]
        `,
        info: `
          border
          border-t-[0.5px]
          border-x-[0.5px]
          border-b
          border-[var(--colors-status-info-border)]
          focus:border-x-[0.5px]
          focus:border-b
          focus:border-t-0
          focus:border-t-transparent
          focus:ring-0
          focus:ring-inset
          focus:ring-[var(--colors-status-info-border)]
          focus:shadow-[0_2px_0_0_var(--colors-status-info-border)]
        `,
        success: `
          border
          border-t-[0.5px]
          border-x-[0.5px]
          border-b
          border-[var(--colors-status-success-border)]
          focus:border-x-[0.5px]
          focus:border-b
          focus:border-t-0
          focus:border-t-transparent
          focus:ring-0
          focus:ring-inset
          focus:ring-[var(--colors-status-success-border)]
          focus:shadow-[0_2px_0_0_var(--colors-status-success-border)]
        `,
        warning: `
          border
          border-t-[0.5px]
          border-x-[0.5px]
          border-b
          border-[var(--colors-status-warning-border)]
          focus:border-x-[0.5px]
          focus:border-b
          focus:border-t-0
          focus:border-t-transparent
          focus:ring-0
          focus:ring-inset
          focus:ring-[var(--colors-status-warning-border)]
          focus:shadow-[0_2px_0_0_var(--colors-status-warning-border)]
        `,
        danger: `
          border
          border-t-[0.5px]
          border-x-[0.5px]
          border-b
          border-[var(--colors-status-danger-border)]
          focus:border-x-[0.5px]
          focus:border-b
          focus:border-t-0
          focus:border-t-transparent
          focus:ring-0
          focus:ring-inset
          focus:ring-[var(--colors-status-danger-border)]
          focus:shadow-[0_2px_0_0_var(--colors-status-danger-border)]
        `,
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
        on: "rounded-r-lg border-l-0",
        off: "rounded-lg",
      },
      withShadow: {
        on: "shadow-sm hover:shadow-md focus:shadow-md",
        off: "",
      },
    },
  },
});
