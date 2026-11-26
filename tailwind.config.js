/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        display: ['"Fredoka"', '"Plus Jakarta Sans"', "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#F9AA00",
          50: "#FFF8E6",
          100: "#FFEFC2",
          200: "#FFDF85",
          300: "#FFCB47",
          400: "#FDB81A",
          500: "#F9AA00",
          600: "#DB8B00",
          700: "#B06A00",
          800: "#7A4A05",
        },
        cream: "#FFF9F0",
        ink: {
          DEFAULT: "#241B14",
          soft: "#5E5147",
          muted: "#9A8D82",
        },
        line: "#F1E6D6",
        danger: "#E5484D",
        success: "#2F9E6E",
        info: "#2B7FD8",
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      dropShadow: {
        product: "0 10px 14px rgba(36, 27, 20, 0.18)",
      },
      boxShadow: {
        card: "0 1px 2px rgba(36, 27, 20, 0.04), 0 4px 16px rgba(36, 27, 20, 0.06)",
        lift: "0 2px 4px rgba(36, 27, 20, 0.06), 0 12px 28px rgba(36, 27, 20, 0.12)",
        glow: "0 8px 24px rgba(249, 170, 0, 0.35)",
        footer: "0 -8px 24px rgba(36, 27, 20, 0.06)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up .25s ease-out both",
      },
    },
  },
  plugins: [],
};
