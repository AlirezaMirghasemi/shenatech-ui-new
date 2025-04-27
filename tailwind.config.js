/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";
import defaultTheme from "tailwindcss/defaultTheme";

module.exports = {
  darkMode: "class",

  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "node_modules/flowbite/**/*.js",
  ],

  safelist: [
    "bg-blue-50",
    "bg-blue-100",
    "bg-blue-200",
    "bg-blue-300",
    "bg-blue-400",
    "bg-blue-500",
    "bg-blue-600",
    "bg-blue-700",
    "bg-blue-800",
    "bg-blue-900",
    "bg-gray-50",
    "bg-gray-100",
    "bg-gray-200",
    "bg-gray-300",
    "bg-gray-400",
    "bg-gray-500",
    "bg-gray-600",
    "bg-gray-700",
    "bg-gray-800",
    "bg-gray-900",
    "bg-khaki-50",
    "bg-khaki-100",
    "bg-khaki-200",
    "bg-khaki-300",
    "bg-khaki-400",
    "bg-khaki-500",
    "bg-khaki-600",
    "bg-khaki-700",
    "bg-khaki-800",
    "bg-khaki-900",
    "bg-purple-50",
    "bg-purple-100",
    "bg-purple-200",
    "bg-purple-300",
    "bg-purple-400",
    "bg-purple-500",
    "bg-purple-600",
    "bg-purple-700",
    "bg-purple-800",
    "bg-purple-900",
    "bg-firoozi-50",
    "bg-firoozi-100",
    "bg-firoozi-200",
    "bg-firoozi-300",
    "bg-firoozi-400",
    "bg-firoozi-500",
    "bg-firoozi-600",
    "bg-firoozi-700",
    "bg-firoozi-800",
    "bg-firoozi-900",
    "bg-neutral-50",
    "bg-neutral-100",
    "bg-neutral-200",
    "bg-neutral-300",
    "bg-neutral-400",
    "bg-neutral-500",
    "bg-neutral-600",
    "bg-neutral-700",
    "bg-neutral-800",
    "dark",
    "dark:bg-gray-800",
  ],

  theme: {
    extend: {
      colors: {
        blue: Object.fromEntries(
          [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((s) => [
            s,
            `rgb(var(--color-blue-${s}) / <alpha-value>)`,
          ])
        ),
        gray: Object.fromEntries(
          [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((s) => [
            s,
            `rgb(var(--color-gray-${s}) / <alpha-value>)`,
          ])
        ),
        khaki: Object.fromEntries(
          [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((s) => [
            s,
            `rgb(var(--color-khaki-${s}) / <alpha-value>)`,
          ])
        ),
        purple: Object.fromEntries(
          [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((s) => [
            s,
            `rgb(var(--color-purple-${s}) / <alpha-value>)`,
          ])
        ),
        firoozi: Object.fromEntries(
          [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((s) => [
            s,
            `rgb(var(--color-firoozi-${s}) / <alpha-value>)`,
          ])
        ),
        neutral: Object.fromEntries(
          [50, 100, 200, 300, 400, 500, 600, 700, 800].map((s) => [
            s,
            `rgb(var(--color-neutral-${s}) / <alpha-value>)`,
          ])
        ),
        black: "rgb(var(--color-black)   / <alpha-value>)",
        white: "rgb(var(--color-white)   / <alpha-value>)",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },

  plugins: [
    import("flowbite/plugin"),

    plugin(({ addUtilities }) => {
      addUtilities({
        ".text-shadow": { textShadow: "2px 2px var(--color-black)" },
      });
    }),
  ],
};
