/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  extend: {
    colors: {
      background: "hsl(var(--background) / <alpha-value>)",
      foreground: "hsl(var(--foreground) / <alpha-value>)",
      primary: "hsl(var(--primary) / <alpha-value>)",
      secondary: "hsl(var(--secondary) / <alpha-value>)",
      border: "hsl(var(--border) / <alpha-value>)",
    },
  },
  plugins: [],
};
