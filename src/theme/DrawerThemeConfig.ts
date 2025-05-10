import { createTheme } from "flowbite-react";

export const DrawerThemeConfig = createTheme({
  root: {
    base: "fixed z-40 overflow-y-auto  bg-bg-surface p-4 transition-transform shadow-xl dark:bg-bg-surface ",
    backdrop:
      "fixed inset-0 z-30 bg-gray-900/50 backdrop-blur-sm dark:bg-gray-900/80 transition-opacity",
    edge: "bottom-16",
    position: {
      top: {
        on: "left-0 right-0 top-0 w-full transform-none",
        off: "left-0 right-0 top-0 w-full -translate-y-full",
      },
      right: {
        on: "right-0 top-0 h-screen w-80 transform-none",
        off: "right-0 top-0 h-screen w-80 translate-x-full",
      },
      bottom: {
        on: "bottom-0 left-0 right-0 w-full transform-none",
        off: "bottom-0 left-0 right-0 w-full translate-y-full",
      },
      left: {
        on: "left-0 top-0 h-screen w-80 transform-none",
        off: "left-0 top-0 h-screen w-80 -translate-x-full",
      },
    },
  },
  header: {
    inner: {
      closeButton:
        "absolute start-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-text-muted transition-all duration-300 hover:bg-bg-hover hover:text-text-default focus:ring-2 focus:ring-ring-default dark:hover:bg-bg-hover",
      closeIcon: "h-5 w-5",
      titleCloseIcon: "sr-only",
      titleIcon: "ms-2.5 h-5 w-5 text-text-muted",
      titleText:
        "mb-4 inline-flex items-center text-lg font-semibold text-text-default",
    },
    collapsed: {
      on: "hidden",
      off: "block",
    },
  },
  items: {
    base: "space-y-2 py-2 [&>li]:px-2 [&>li]:py-1 [&>li]:transition-colors [&>li]:duration-300 [&>li:hover]:bg-bg-hover",
  },
});
