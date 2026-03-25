import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "outline-variant": "#c3c5d9",
        "on-primary-fixed-variant": "#3f465c",
        "tertiary": "#735c00",
        "on-tertiary-fixed-variant": "#574500",
        "surface-tint": "#565e74",
        "inverse-primary": "#bec6e0",
        "on-secondary": "#ffffff",
        "on-error": "#ffffff",
        "on-tertiary-fixed": "#241a00",
        "surface-variant": "#e0e3e5",
        "secondary-fixed": "#89f5e7",
        "primary": "#464e63",
        "primary-fixed": "#dae2fd",
        "tertiary-fixed-dim": "#e9c349",
        "secondary-fixed-dim": "#6bd8cb",
        "on-error-container": "#93000a",
        "outline": "#737688",
        "primary-container": "#5e667c",
        "primary-fixed-dim": "#bec6e0",
        "surface-container": "#eceef0",
        "on-secondary-fixed": "#00201d",
        "tertiary-container": "#cca730",
        "surface-container-highest": "#e0e3e5",
        "on-primary-container": "#dde4ff",
        "inverse-on-surface": "#eff1f3",
        "error-container": "#ffdad6",
        "surface-dim": "#d8dadc",
        "on-primary": "#ffffff",
        "on-tertiary": "#ffffff",
        "on-surface-variant": "#434656",
        "on-secondary-container": "#006f66",
        "surface": "#f7f9fb",
        "error": "#ba1a1a",
        "tertiary-fixed": "#ffe088",
        "surface-container-lowest": "#ffffff",
        "on-background": "#191c1e",
        "on-tertiary-container": "#4f3d00",
        "secondary": "#006a61",
        "inverse-surface": "#2d3133",
        "on-secondary-fixed-variant": "#005049",
        "secondary-container": "#86f2e4",
        "surface-bright": "#f7f9fb",
        "surface-container-low": "#f2f4f6",
        "on-surface": "#191c1e",
        "on-primary-fixed": "#131b2e",
        "surface-container-high": "#e6e8ea",
        "background": "#f7f9fb"
      },
      fontFamily: {
        "headline": ["var(--font-manrope)"],
        "body": ["var(--font-inter)"],
        "label": ["var(--font-inter)"]
      }
    }
  }
};
export default config;
