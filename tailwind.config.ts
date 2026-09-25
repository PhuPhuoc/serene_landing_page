import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{vue,js,ts,jsx,tsx}",
    "./components/**/*.{vue,js,ts,jsx,tsx}",
    "./layouts/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        clay: "#B88868",
        sand: "#D8B898",
        cream: "#F6E7CD",
        paper: "#FDF9F2",
        espresso: "#2A1A12",
        foliage: "#3A4A38",
        "river-mist": "#C8D8D8",
        muted: "#5C4A3C",
        subtle: "#6B5A48",
        border: "#E3D6C3",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      fontSize: {
        eyebrow: ["0.6875rem", { letterSpacing: "0.22em", lineHeight: "1rem" }],
        mono: ["0.8125rem", { letterSpacing: "0.06em", lineHeight: "1.5rem" }],
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
      transitionDuration: {
        slow: "500ms",
        medium: "300ms",
        fast: "150ms",
      },
      borderRadius: {
        sm: "2px",
        DEFAULT: "4px",
        md: "4px",
        lg: "8px",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
      maxWidth: {
        prose: "60ch",
      },
      lineHeight: {
        relaxed: "1.7",
        loose: "1.8",
      },
    },
  },
  plugins: [],
} satisfies Config;
