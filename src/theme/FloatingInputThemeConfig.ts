import { createTheme } from "flowbite-react";

export const FloatingInputThemeConfig = createTheme({
  input: {
    default: {
      filled: {
        sm: "peer block w-full appearance-none rounded-t-lg border-t-[0.5px] border-x-[0.5px] border-b border-[var(--colors-border-default)] bg-[var(--colors-bg-alt)] px-2.5 pb-2.5 pt-5 text-sm text-[var(--colors-text-default)] transition-all duration-[--transition-duration] ease-[--transition-timing] focus:outline-none focus:border-t-0 focus:border-t-transparent focus:shadow-[0_2px_0_0_var(--colors-ring-default)] z-20",
        md: "peer block w-full appearance-none rounded-t-lg border-t-[0.5px] border-x-[0.5px] border-b border-[var(--colors-border-default)] bg-[var(--colors-bg-alt)] px-2.5 pb-2.5 pt-5 text-base text-[var(--colors-text-default)] transition-all duration-[--transition-duration] ease-[--transition-timing] focus:outline-none focus:border-t-0 focus:border-t-transparent focus:shadow-[0_2px_0_0_var(--colors-ring-default)] z-20",
      },
      outlined: {
        sm: "peer block w-full appearance-none rounded-lg border border-[var(--colors-border-default)] bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-[var(--colors-text-default)] transition-all duration-[--transition-duration] ease-[--transition-timing] focus:outline-none focus:ring-2 focus:ring-[var(--colors-ring-default)] z-20",
        md: "peer block w-full appearance-none rounded-lg border border-[var(--colors-border-default)] bg-transparent px-2.5 pb-2.5 pt-4 text-base text-[var(--colors-text-default)] transition-all duration-[--transition-duration] ease-[--transition-timing] focus:outline-none focus:ring-2 focus:ring-[var(--colors-ring-default)] z-20",
      },
      standard: {
        sm: "peer block w-full appearance-none border-0 border-b-2 border-[var(--colors-border-default)] bg-transparent px-0 py-2.5 text-sm text-[var(--colors-text-default)] transition-all duration-[--transition-duration] ease-[--transition-timing] focus:outline-none focus:border-b-2 focus:border-[var(--colors-border-focus)] focus:shadow-[0_2px_0_0_var(--colors-ring-default)] z-20",
        md: "peer block w-full appearance-none border-0 border-b-2 border-[var(--colors-border-default)] bg-transparent px-0 py-2.5 text-base text-[var(--colors-text-default)] transition-all duration-[--transition-duration] ease-[--transition-timing] focus:outline-none focus:border-b-2 focus:border-[var(--colors-border-focus)] focus:shadow-[0_2px_0_0_var(--colors-ring-default)] z-20",
      },
    },
    success: {
      filled: {
        sm: "peer block w-full appearance-none rounded-t-lg border-t-[0.5px] border-x-[0.5px] border-b border-[var(--colors-status-success-border)] bg-[var(--colors-bg-alt)] px-2.5 pb-2.5 pt-5 text-sm text-[var(--colors-text-default)] transition-all duration-[--transition-duration] ease-[--transition-timing] focus:outline-none focus:border-t-0 focus:border-t-transparent focus:shadow-[0_2px_0_0_var(--colors-status-success-border)] z-20",
        md: "peer block w-full appearance-none rounded-t-lg border-t-[0.5px] border-x-[0.5px] border-b border-[var(--colors-status-success-border)] bg-[var(--colors-bg-alt)] px-2.5 pb-2.5 pt-5 text-base text-[var(--colors-text-default)] transition-all duration-[--transition-duration] ease-[--transition-timing] focus:outline-none focus:border-t-0 focus:border-t-transparent focus:shadow-[0_2px_0_0_var(--colors-status-success-border)] z-20",
      },
      outlined: {
        sm: "peer block w-full appearance-none rounded-lg border border-[var(--colors-status-success-border)] bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-[var(--colors-text-default)] transition-all duration-[--transition-duration] ease-[--transition-timing] focus:outline-none focus:ring-2 focus:ring-[var(--colors-status-success-border)] z-20",
        md: "peer block w-full appearance-none rounded-lg border border-[var(--colors-status-success-border)] bg-transparent px-2.5 pb-2.5 pt-4 text-base text-[var(--colors-text-default)] transition-all duration-[--transition-duration] ease-[--transition-timing] focus:outline-none focus:ring-2 focus:ring-[var(--colors-status-success-border)] z-20",
      },
      standard: {
        sm: "peer block w-full appearance-none border-0 border-b-2 border-[var(--colors-status-success-border)] bg-transparent px-0 py-2.5 text-sm text-[var(--colors-text-default)] transition-all duration-[--transition-duration] ease-[--transition-timing] focus:outline-none focus:border-b-2 focus:border-[var(--colors-status-success-border)] focus:shadow-[0_2px_0_0_var(--colors-status-success-border)] z-20",
        md: "peer block w-full appearance-none border-0 border-b-2 border-[var(--colors-status-success-border)] bg-transparent px-0 py-2.5 text-base text-[var(--colors-text-default)] transition-all duration-[--transition-duration] ease-[--transition-timing] focus:outline-none focus:border-b-2 focus:border-[var(--colors-status-success-border)] focus:shadow-[0_2px_0_0_var(--colors-status-success-border)] z-20",
      },
    },
    error: {
      filled: {
        sm: "peer block w-full appearance-none rounded-t-lg border-t-[0.5px] border-x-[0.5px] border-b border-[var(--colors-status-danger-border)] bg-[var(--colors-bg-alt)] px-2.5 pb-2.5 pt-5 text-sm text-[var(--colors-text-default)] transition-all duration-[--transition-duration] ease-[--transition-timing] focus:outline-none focus:border-t-0 focus:border-t-transparent focus:shadow-[0_2px_0_0_var(--colors-status-danger-border)] z-20",
        md: "peer block w-full appearance-none rounded-t-lg border-t-[0.5px] border-x-[0.5px] border-b border-[var(--colors-status-danger-border)] bg-[var(--colors-bg-alt)] px-2.5 pb-2.5 pt-5 text-base text-[var(--colors-text-default)] transition-all duration-[--transition-duration] ease-[--transition-timing] focus:outline-none focus:border-t-0 focus:border-t-transparent focus:shadow-[0_2px_0_0_var(--colors-status-danger-border)] z-20",
      },
      outlined: {
        sm: "peer block w-full appearance-none rounded-lg border border-[var(--colors-status-danger-border)] bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-[var(--colors-text-default)] transition-all duration-[--transition-duration] ease-[--transition-timing] focus:outline-none focus:ring-2 focus:ring-[var(--colors-status-danger-border)] z-20",
        md: "peer block w-full appearance-none rounded-lg border border-[var(--colors-status-danger-border)] bg-transparent px-2.5 pb-2.5 pt-4 text-base text-[var(--colors-text-default)] transition-all duration-[--transition-duration] ease-[--transition-timing] focus:outline-none focus:ring-2 focus:ring-[var(--colors-status-danger-border)] z-20",
      },
      standard: {
        sm: "peer block w-full appearance-none border-0 border-b-2 border-[var(--colors-status-danger-border)] bg-transparent px-0 py-2.5 text-sm text-[var(--colors-text-default)] transition-all duration-[--transition-duration] ease-[--transition-timing] focus:outline-none focus:border-b-2 focus:border-[var(--colors-status-danger-border)] focus:shadow-[0_2px_0_0_var(--colors-status-danger-border)] z-20",
        md: "peer block w-full appearance-none border-0 border-b-2 border-[var(--colors-status-danger-border)] bg-transparent px-0 py-2.5 text-base text-[var(--colors-text-default)] transition-all duration-[--transition-duration] ease-[--transition-timing] focus:outline-none focus:border-b-2 focus:border-[var(--colors-status-danger-border)] focus:shadow-[0_2px_0_0_var(--colors-status-danger-border)] z-20",
      },
    },
  },
  label: {
    default: {
      filled: {
        sm: "absolute right-2.5 top-4 origin-[100%] -translate-y-4 scale-90 text-sm text-[var(--colors-text-muted)] transition-all duration-[--transition-duration] ease-[--transition-timing] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:text-[var(--colors-ring-default)] bg-transparent pointer-events-none rtl:right-auto rtl:left-2.5",
        md: "absolute right-2.5 top-4 origin-[100%] -translate-y-4 scale-90 text-base text-[var(--colors-text-muted)] transition-all duration-[--transition-duration] ease-[--transition-timing] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:text-[var(--colors-ring-default)] bg-transparent pointer-events-none rtl:right-auto rtl:left-2.5",
      },
      outlined: {
        sm: "absolute right-2.5 top-2 origin-[100%] -translate-y-4 scale-90 px-2 text-sm text-[var(--colors-text-muted)] transition-all duration-[--transition-duration] ease-[--transition-timing] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:px-2 peer-focus:text-[var(--colors-ring-default)] bg-transparent pointer-events-none rtl:right-auto rtl:left-2.5",
        md: "absolute right-2.5 top-2 origin-[100%] -translate-y-4 scale-90 px-2 text-base text-[var(--colors-text-muted)] transition-all duration-[--transition-duration] ease-[--transition-timing] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:px-2 peer-focus:text-[var(--colors-ring-default)] bg-transparent pointer-events-none rtl:right-auto rtl:left-2.5",
      },
      standard: {
        sm: "absolute top-3 origin-[100%] -translate-y-6 scale-90 text-sm text-[var(--colors-text-muted)] transition-all duration-[--transition-duration] ease-[--transition-timing] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:right-0 peer-focus:-translate-y-6 peer-focus:scale-90 peer-focus:text-[var(--colors-ring-default)] bg-transparent pointer-events-none rtl:right-auto rtl:left-0",
        md: "absolute top-3 origin-[100%] -translate-y-6 scale-90 text-base text-[var(--colors-text-muted)] transition-all duration-[--transition-duration] ease-[--transition-timing] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:right-0 peer-focus:-translate-y-6 peer-focus:scale-90 peer-focus:text-[var(--colors-ring-default)] bg-transparent pointer-events-none rtl:right-auto rtl:left-0",
      },
    },
    success: {
      filled: {
        sm: "absolute right-2.5 top-4 origin-[100%] -translate-y-4 scale-90 text-sm text-[var(--colors-status-success-text)] transition-all duration-[--transition-duration] ease-[--transition-timing] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-90 bg-transparent pointer-events-none rtl:right-auto rtl:left-2.5",
        md: "absolute right-2.5 top-4 origin-[100%] -translate-y-4 scale-90 text-base text-[var(--colors-status-success-text)] transition-all duration-[--transition-duration] ease-[--transition-timing] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-90 bg-transparent pointer-events-none rtl:right-auto rtl:left-2.5",
      },
      outlined: {
        sm: "absolute right-2.5 top-2 origin-[100%] -translate-y-4 scale-90 px-2 text-sm text-[var(--colors-status-success-text)] transition-all duration-[--transition-duration] ease-[--transition-timing] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:px-2 bg-transparent pointer-events-none rtl:right-auto rtl:left-2.5",
        md: "absolute right-2.5 top-2 origin-[100%] -translate-y-4 scale-90 px-2 text-base text-[var(--colors-status-success-text)] transition-all duration-[--transition-duration] ease-[--transition-timing] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:px-2 bg-transparent pointer-events-none rtl:right-auto rtl:left-2.5",
      },
      standard: {
        sm: "absolute top-3 origin-[100%] -translate-y-6 scale-90 text-sm text-[var(--colors-status-success-text)] transition-all duration-[--transition-duration] ease-[--transition-timing] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:right-0 peer-focus:-translate-y-6 peer-focus:scale-90 bg-transparent pointer-events-none rtl:right-auto rtl:left-0",
        md: "absolute top-3 origin-[100%] -translate-y-6 scale-90 text-base text-[var(--colors-status-success-text)] transition-all duration-[--transition-duration] ease-[--transition-timing] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:right-0 peer-focus:-translate-y-6 peer-focus:scale-90 bg-transparent pointer-events-none rtl:right-auto rtl:left-0",
      },
    },
    error: {
      filled: {
        sm: "absolute right-2.5 top-4 origin-[100%] -translate-y-4 scale-90 text-sm text-[var(--colors-status-danger-text)] transition-all duration-[--transition-duration] ease-[--transition-timing] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-90 bg-transparent pointer-events-none rtl:right-auto rtl:left-2.5",
        md: "absolute right-2.5 top-4 origin-[100%] -translate-y-4 scale-90 text-base text-[var(--colors-status-danger-text)] transition-all duration-[--transition-duration] ease-[--transition-timing] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-90 bg-transparent pointer-events-none rtl:right-auto rtl:left-2.5",
      },
      outlined: {
        sm: "absolute right-2.5 top-2 origin-[100%] -translate-y-4 scale-90 px-2 text-sm text-[var(--colors-status-danger-text)] transition-all duration-[--transition-duration] ease-[--transition-timing] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:px-2 bg-transparent pointer-events-none rtl:right-auto rtl:left-2.5",
        md: "absolute right-2.5 top-2 origin-[100%] -translate-y-4 scale-90 px-2 text-base text-[var(--colors-status-danger-text)] transition-all duration-[--transition-duration] ease-[--transition-timing] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:px-2 bg-transparent pointer-events-none rtl:right-auto rtl:left-2.5",
      },
      standard: {
        sm: "absolute top-3 origin-[100%] -translate-y-6 scale-90 text-sm text-[var(--colors-status-danger-text)] transition-all duration-[--transition-duration] ease-[--transition-timing] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:right-0 peer-focus:-translate-y-6 peer-focus:scale-90 bg-transparent pointer-events-none rtl:right-auto rtl:left-0",
        md: "absolute top-3 origin-[100%] -translate-y-6 scale-90 text-base text-[var(--colors-status-danger-text)] transition-all duration-[--transition-duration] ease-[--transition-timing] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:right-0 peer-focus:-translate-y-6 peer-focus:scale-90 bg-transparent pointer-events-none rtl:right-auto rtl:left-0",
      },
    },
  },
});
