import { createTheme } from "flowbite-react";

export const SidebarThemeConfig = createTheme({
  root: {
    base: "h-full",
    collapsed: {
      on: "w-16",
      off: "w-72",
    },
    inner: "h-full  overflow-y-auto overflow-x-hidden rounded bg-bg-surface px-5 py-4 dark:bg-bg-surface transition-colors duration-300",
  },
  collapse: {
    button: "group flex w-full items-center rounded-lg p-2 text-base font-normal text-text-default transition-all duration-300 hover:bg-bg-hover dark:hover:bg-bg-hover",
    icon: {
      base: "h-6 w-6 text-text-muted ml-3 transition-colors duration-300 group-hover:text-primary-600 dark:group-hover:text-primary-400",
      open: {
        off: "",
        on: "text-primary-600 dark:text-primary-400",
      },
    },
    label: {
      base: "ml-3 flex-1 whitespace-nowrap text-right text-text-default", // تغییر جهت متن به راستچین
      title: "sr-only",
      icon: {
        base: "h-6 w-6 transition-transform duration-300 ease-out",
        open: {
          on: "rotate-180",
          off: "",
        },
      },
    },
    list: "space-y-2 py-2",
  },
  cta: {
    base: "mt-6 rounded-lg bg-status-info-bg p-4 border border-status-info-border text-status-info-text dark:bg-status-info-bg dark:border-status-info-border dark:text-status-info-text",
    color: {
      blue: "bg-status-info-bg dark:bg-status-info-bg",
      dark: "bg-bg-dark-800 dark:bg-bg-dark-900",
      failure: "bg-status-danger-bg dark:bg-status-danger-bg",
      success: "bg-status-success-bg dark:bg-status-success-bg",
      warning: "bg-status-warning-bg dark:bg-status-warning-bg",
    },
  },
  item: {
    base: "flex items-center justify-end rounded-lg p-2 text-base font-normal text-text-default transition-all duration-300 hover:bg-bg-hover dark:hover:bg-bg-hover", // راستچین کردن آیتمها
    active: "bg-primary-500/20 text-primary-600 dark:text-primary-400", // بهبود حالت فعال
    collapsed: {
      insideCollapse: "group w-full pr-8 transition-all duration-300", // تغییر جهت به راست
      noIcon: "font-semibold",
    },
    content: {
      base: "flex-1 whitespace-nowrap px-3 text-right", // متن راستچین
    },
    icon: {
      base: "h-6 w-6 shrink-0 text-text-muted transition-colors duration-300 group-hover:text-primary-600 dark:group-hover:text-primary-400",
      active: "text-primary-600 dark:text-primary-400",
    },
    label: "text-sm font-medium",
    listItem: "relative",
  },
  items: {
    base: "space-y-1",
  },
  itemGroup: {
    base: "mt-4 space-y-2 border-t border-border-default pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-border-default",
  },
  logo: {
    base: "mb-5 flex items-center justify-end pr-2.5", // راستچین لوگو
    collapsed: {
      on: "hidden",
      off: "self-center whitespace-nowrap text-xl font-semibold text-text-default",
    },
    img: "ml-3 h-8 w-8", // تغییر جهت margin
  },
});
