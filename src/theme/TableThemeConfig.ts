import { createTheme } from "flowbite-react";

export const TableThemeConfig = createTheme({
  root: {
    base: "w-full rtl:text-right text-sm text-text-default font-vazir rounded-lg overflow-hidden border border-border-default",
    shadow:
      "absolute start-0 top-0 -z-10 h-full w-full rounded-lg bg-bg-surface shadow-lg dark:bg-bg-surface",
    wrapper: "relative",
  },
  body: {
    base: "group/body divide-y divide-border-surface",
    cell: {
      base: "px-4 py-3 text-text-default transition-colors duration-300 ",
    },
  },
  head: {
    base: "group/head text-md font-semibold uppercase text-text-muted bg-bg-alt text-center ",
    cell: {
      base: "px-4 py-3 bg-bg-active sticky top-0 border-b-2 border-border-default",
    },
  },
  row: {
    base: "group/row bg-bg-default transition-colors duration-300",
    hovered: "hover:bg-primary-100/40 dark:hover:bg-primary-900/20",
    striped:
      "[&:nth-child(even)]:bg-[var(--bg-disabled)]/30 dark:[&:nth-child(even)]:bg-[var(--bg-disabled)]/30",
  },
});
