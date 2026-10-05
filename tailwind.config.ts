import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Barlow Condensed", "Impact", "sans-serif"],
        body: ["Source Sans 3", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
      },
      colors: {
        brand: {
          bg: "#061820",
          fg: "#d7f7ff",
          muted: "#9bc9d6",
          primary: "#00d2ff",
          accent: "#00d2ff",
          surface: "#0a3040",
          border: "#00d2ff66",
          hero: "#061820",
          amber: "#00d2ff",
          steel: "#d7f7ff",
          concrete: "#00d2ff66",
        },
      },
      keyframes: {
        rise: { "0%": { opacity: "0", transform: "translateY(8px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
      },
      animation: {
        rise: "rise 0.5s ease both",
        marquee: "marquee 22s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
