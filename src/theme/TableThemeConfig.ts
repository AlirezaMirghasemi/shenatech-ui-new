import { createTheme } from "flowbite-react";

export const TableThemeConfig = createTheme({
  root: {
    base: "w-full rtl:text-right text-sm text-text-default   overflow-hidden border border-border-default",
    shadow:
      "absolute start-0 top-0 -z-10 h-full w-full g bg-bg-surface shadow-lg dark:bg-bg-surface",
    wrapper: "relative",
  },
  body: {
    base: "group/body divide-y divide-border-surface",
    cell: {
      base: "px-4 py-3 text-text-default transition-colors duration-300 ",
    },
  },
  head: {
    base: "group/head text-md font-semibold uppercase text-text-default bg-bg-alt text-center ",
    cell: {
      base: "px-4 py-3 bg-bg-active sticky top-0 border-b-2 border-border-default backdrop-blur-sm z-10",
    },
  },
  row: {
    base: "group/row  transition-colors duration-[--transition-duration] ease-[--transition-timing]",
    hovered: "hover:bg-[var(--colors-bg-hover)]",
    striped: "[&:nth-child(even)]:bg-[var(--colors-bg-disabled)]/20",
  },
});
