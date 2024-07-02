import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "3xl": "1900px",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          background: `linear-gradient(225deg, #999 0%, #ddd 100%)`,
          primary: "#048d3e",
          secondary: "#ffcc00",
          neutral: "#545454",
          "neutral-content": "#fff",
          "base-content": "#545454",
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          background: `linear-gradient(225deg, #20252a 0%, #30353a 100%)`,
          primary: "#048d3e",
          secondary: "#ffcc00",
          neutral: "#242424",
          "neutral-content": "#fff",
          "base-content": "#cecece",
        },
      },
    ],
  },
};

export default config;
