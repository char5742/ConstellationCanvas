/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--md-sys-color-primary)",
        },
        "on-primary": {
          DEFAULT: "var(--md-sys-color-on-primary)",
        },
        "primary-container": {
          DEFAULT: "var(--md-sys-color-primary-container)",
        },
        "on-primary-container": {
          DEFAULT: "var(--md-sys-color-on-primary-container)",
        },
        secondary: {
          DEFAULT: "var(--md-sys-color-secondary)",
        },
        "on-secondary": {},
        "secondary-container": {
          DEFAULT: "var(--md-sys-color-secondary-container)",
        },
        "on-secondary-container": {
          DEFAULT: "var(--md-sys-color-on-secondary-container)",
        },
        tertiary: {
          DEFAULT: "var(--md-sys-color-tertiary)",
        },
        "on-tertiary": {
          DEFAULT: "var(--md-sys-color-on-tertiary)",
        },
        "tertiary-container": {
          DEFAULT: "var(--md-sys-color-tertiary-container)",
        },
        "on-tertiary-container": {
          DEFAULT: "var(--md-sys-color-on-tertiary-container)",
        },
        error: {
          DEFAULT: "var(--md-sys-color-error)",
        },
        "on-error": {
          DEFAULT: "var(--md-sys-color-on-error)",
        },
        "error-container": {
          DEFAULT: "var(--md-sys-color-error-container)",
        },
        "on-error-container": {
          DEFAULT: "var(--md-sys-color-on-error-container)",
        },
        background: {
          DEFAULT: "var(--md-sys-color-background)",
        },
        "on-background": {
          DEFAULT: "var(--md-sys-color-on-background)",
        },
        surface: {
          DEFAULT: "var(--md-sys-color-surface)",
        },
        "on-surface": {
          DEFAULT: "var(--md-sys-color-on-surface)",
        },
        "surface-variant": {
          DEFAULT: "var(--md-sys-color-surface-variant)",
        },
        "on-surface-variant": {
          DEFAULT: "var(--md-sys-color-on-surface-variant)",
        },
        outline: {
          DEFAULT: "var(--md-sys-color-outline)",
        },
        "outline-variant": {
          DEFAULT: "var(--md-sys-color-outline-variant)",
        },
        shadow: {
          DEFAULT: "var(--md-sys-color-shadow)",
        },
        scrim: {
          DEFAULT: "var(--md-sys-color-scrim)",
        },
        "inverse-surface": {
          DEFAULT: "var(--md-sys-color-inverse-surface)",
        },
        "inverse-on-surface": {
          DEFAULT: "var(--md-sys-color-inverse-on-surface)",
        },
        "inverse-primary": {
          DEFAULT: "var(--md-sys-color-inverse-primary)",
        },
      },
      borderRadius: {
        xl: "calc(var(--radius) * 7)",
        lg: "calc(var(--radius) * 4)",
        md: "calc(var(--radius) * 3)",
        sm: "calc(var(--radius) * 2)",
        xs: "var(--radius)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
