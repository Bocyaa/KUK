import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      /* add a raw media‑query breakpoint */
      screens: {
        standalone: { raw: "(display-mode: standalone)" },
      },
    },
  },
};

export default config;
