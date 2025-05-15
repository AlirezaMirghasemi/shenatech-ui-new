import { createTheme } from "flowbite-react";

export const LabelThemeConfig = createTheme({
  root: {
    base: "text-sm font-medium text-text-default transition-colors duration-[--transition-duration] ease-[--transition-timing]",
    disabled: "opacity-[var(--opacity-disabled)] pointer-events-none",
    colors: {
      default: "text-text-default",
      info: "text-[var(--colors-status-info-text)]",
      danger: "text-[var(--colors-status-danger-text)]",
      warning: "text-[var(--colors-status-warning-text)]",
      success: "text-[var(--colors-status-success-text)]",
    },
  },
});
