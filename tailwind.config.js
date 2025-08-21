/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        light: {
          primary: "#4f46e5",   // Indigo
          secondary: "#9333ea", // Purple
          accent: "#f59e0b",    // Amber
          neutral: "#1f2937",   // Gray-800
          "base-100": "#ffffff", 
        },
        dark: {
          primary: "#6366f1",   // Indigo
          secondary: "#a855f7", // Purple
          accent: "#fbbf24",    // Amber
          neutral: "#111827",   // Gray-900
          "base-100": "#1f2937",
        },
      },
    ],
  },
};
