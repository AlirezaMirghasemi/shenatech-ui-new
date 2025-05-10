import { createTheme } from "flowbite-react";

export const ButtonThemeConfig = createTheme({
  base: "relative flex items-center justify-center text-center font-medium transition-all duration-[--transition-duration] ease-[--transition-timing] focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-[--opacity-disabled]",
  fullSized: "w-full",
  grouped:
    "rounded-none border-l-0 first:rounded-s-lg first:border-l last:rounded-e-lg focus:ring-2 focus:ring-inset",
  pill: "rounded-full",
  size: {
    xs: "h-8 px-3 text-xs rounded-md",
    sm: "h-9 px-4 text-sm rounded-lg",
    md: "h-10 px-5 text-base rounded-lg",
    lg: "h-12 px-6 text-lg rounded-xl",
    xl: "h-14 px-8 text-xl rounded-xl",
  },
  color: {
    primary:
      "bg-primary text-text-on-primary hover:bg-primary-hover hover:opacity-[--opacity-hover] focus:ring-primary-300/50 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800/50",
    secondary:
      "bg-secondary text-text-on-secondary hover:bg-secondary-hover hover:opacity-[--opacity-hover] focus:ring-secondary-300/50 dark:bg-secondary-600 dark:hover:bg-secondary-700 dark:focus:ring-secondary-800/50",
    accent:
      "bg-accent text-text-on-accent hover:bg-accent-hover hover:opacity-[--opacity-hover] focus:ring-accent-300/50 dark:bg-accent-600 dark:hover:bg-accent-700 dark:focus:ring-accent-800/50",
    success:
      "bg-success-500 text-text-on-primary hover:bg-success-600 hover:opacity-[--opacity-hover] focus:ring-success-300/50 dark:bg-success-600 dark:hover:bg-success-700 dark:focus:ring-success-800/50",
    warning:
      "bg-warning-500 text-text-on-primary hover:bg-warning-600 hover:opacity-[--opacity-hover] focus:ring-warning-300/50 dark:bg-warning-600 dark:hover:bg-warning-700 dark:focus:ring-warning-800/50",
    danger:
      "bg-danger-500 text-text-on-primary hover:bg-danger-600 hover:opacity-[--opacity-hover] focus:ring-danger-300/50 dark:bg-danger-600 dark:hover:bg-danger-700 dark:focus:ring-danger-800/50",
    info: "bg-info-500 text-text-on-primary hover:bg-info-600 hover:opacity-[--opacity-hover] focus:ring-info-300/50 dark:bg-info-600 dark:hover:bg-info-700 dark:focus:ring-info-800/50",
  },
  outlineColor: {
    primary:
      "border border-primary-500 text-primary-500 hover:bg-primary-50/50 hover:opacity-[--opacity-hover] focus:ring-primary-300/50 dark:text-primary-400 dark:border-primary-400 dark:hover:bg-primary-900/20 dark:focus:ring-primary-800/50",
    secondary:
      "border border-secondary-500 text-secondary-500 hover:bg-secondary-50/50 hover:opacity-[--opacity-hover] focus:ring-secondary-300/50 dark:text-secondary-400 dark:border-secondary-400 dark:hover:bg-secondary-900/20 dark:focus:ring-secondary-800/50",
    accent:
      "border border-accent-500 text-accent-500 hover:bg-accent-50/50 hover:opacity-[--opacity-hover] focus:ring-accent-300/50 dark:text-accent-400 dark:border-accent-400 dark:hover:bg-accent-900/20 dark:focus:ring-accent-800/50",
    success:
      "border border-success-500 text-success-500 hover:bg-success-50/50 hover:opacity-[--opacity-hover] focus:ring-success-300/50 dark:text-success-400 dark:border-success-400 dark:hover:bg-success-900/20 dark:focus:ring-success-800/50",
    warning:
      "border border-warning-500 text-warning-500 hover:bg-warning-50/50 hover:opacity-[--opacity-hover] focus:ring-warning-300/50 dark:text-warning-400 dark:border-warning-400 dark:hover:bg-warning-900/20 dark:focus:ring-warning-800/50",
    danger:
      "border border-danger-500 text-danger-500 hover:bg-danger-50/50 hover:opacity-[--opacity-hover] focus:ring-danger-300/50 dark:text-danger-400 dark:border-danger-400 dark:hover:bg-danger-900/20 dark:focus:ring-danger-800/50",
    info: "border border-info-500 text-info-500 hover:bg-info-50/50 hover:opacity-[--opacity-hover] focus:ring-info-300/50 dark:text-info-400 dark:border-info-400 dark:hover:bg-info-900/20 dark:focus:ring-info-800/50",
  },
});
