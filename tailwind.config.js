/** @type {import('tailwindcss').Config} */

import flowbite from "flowbite/plugin";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.js",
    "node_modules/flowbite/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        /* Semantic background/text/border */
        "bg-default": "var(--colors-bg-default)",
        "bg-surface": "var(--colors-bg-surface)",
        "bg-alt": "var(--colors-bg-alt)",
        "bg-interactive": "var(--colors-bg-interactive)",
        "bg-hover": "var(--colors-bg-hover)",
        "bg-active": "var(--colors-bg-active)",
        "bg-disabled": "var(--colors-bg-disabled)",

        "text-default": "var(--colors-text-default)",
        "text-secondary": "var(--colors-text-secondary)",
        "text-muted": "var(--colors-text-muted)",
        "text-placeholder": "var(--colors-text-placeholder)",
        "text-link": "var(--colors-text-link)",
        "text-link-hover": "var(--colors-text-link-hover)",
        "text-on-primary": "var(--colors-text-on-primary)",
        "text-on-secondary": "var(--colors-text-on-secondary)",
        "text-on-accent": "var(--colors-text-on-accent)",
        "text-on-dark": "var(--colors-text-on-dark)",

        "border-default": "var(--colors-border-default)",
        "border-surface": "var(--colors-border-surface)",
        "border-interactive": "var(--colors-border-interactive)",
        "border-focus": "var(--colors-border-focus)",
        "border-disabled": "var(--colors-border-disabled)",

        "ring-default": "var(--colors-ring-default)",

        /* Primary/Secondary/Accent Color Scales */
        primary: {
          DEFAULT: "var(--colors-primary)",
          foreground: "var(--colors-text-on-primary)",
          50: "var(--color-primary-50)",
          100: "var(--color-primary-100)",
          200: "var(--color-primary-200)",
          300: "var(--color-primary-300)",
          400: "var(--color-primary-400)",
          500: "var(--color-primary-500)",
          600: "var(--color-primary-600)",
          700: "var(--color-primary-700)",
          800: "var(--color-primary-800)",
          900: "var(--color-primary-900)",
          950: "var(--color-primary-950)",
        },
        secondary: {
          DEFAULT: "var(--colors-secondary)",
          foreground: "var(--colors-text-on-secondary)",
          50: "var(--color-secondary-50)",
          100: "var(--color-secondary-100)",
          200: "var(--color-secondary-200)",
          300: "var(--color-secondary-300)",
          400: "var(--color-secondary-400)",
          500: "var(--color-secondary-500)",
          600: "var(--color-secondary-600)",
          700: "var(--color-secondary-700)",
          800: "var(--color-secondary-800)",
          900: "var(--color-secondary-900)",
          950: "var(--color-secondary-950)",
        },
        accent: {
          DEFAULT: "var(--colors-accent)",
          foreground: "var(--colors-text-on-accent)",
          50: "var(--color-accent-50)",
          100: "var(--color-accent-100)",
          200: "var(--color-accent-200)",
          300: "var(--color-accent-300)",
          400: "var(--color-accent-400)",
          500: "var(--color-accent-500)",
          600: "var(--color-accent-600)",
          700: "var(--color-accent-700)",
          800: "var(--color-accent-800)",
          900: "var(--color-accent-900)",
          950: "var(--color-accent-950)",
        },

        /* Optional: Light/Dark background scales if نیاز دارید */
        "bg-light": {
          50: "var(--color-background-light-50)",
          100: "var(--color-background-light-100)",
          200: "var(--color-background-light-200)",
          300: "var(--color-background-light-300)",
          400: "var(--color-background-light-400)",
          500: "var(--color-background-light-500)",
          600: "var(--color-background-light-600)",
          700: "var(--color-background-light-700)",
          800: "var(--color-background-light-800)",
          900: "var(--color-background-light-900)",
          950: "var(--color-background-light-950)",
        },
        "bg-dark": {
          50: "var(--color-background-dark-50)",
          100: "var(--color-background-dark-100)",
          200: "var(--color-background-dark-200)",
          300: "var(--color-background-dark-300)",
          400: "var(--color-background-dark-400)",
          500: "var(--color-background-dark-500)",
          600: "var(--color-background-dark-600)",
          700: "var(--color-background-dark-700)",
          800: "var(--color-background-dark-800)",
          900: "var(--color-background-dark-900)",
          950: "var(--color-background-dark-950)",
        },
      },
    },
  },
  plugins: [flowbite, forms, typography],
};
