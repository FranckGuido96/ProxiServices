/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#F2F9F5",
          100: "#DCFCE7",
          500: "#2FA866",
          600: "#1F7A4D",
          700: "#166534",
          800: "#14532D",
        },
        "primary-hover": "#14532D",
        secondary: {
          500: "#FF6B4A",
          600: "#F97316",
          700: "#EA580C",
        },
        accent: "#F59E0B",
        background: "#F5F1EB",
        surface: "#FFFFFF",
        "surface-card": "#FFFBF8",
        border: "#EAE5DE",
        text: {
          DEFAULT: "#111827",
          secondary: "#78716C",
          muted: "#9CA3AF",
        },
        success: "#22C55E",
        warning: "#F97316",
        error: "#DC2626",
        info: "#3B82F6",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        xl: "16px",
        "2xl": "24px",
        "3xl": "32px",
      },
      boxShadow: {
        card: "0 12px 32px rgba(0, 0, 0, 0.05)",
        soft: "0 4px 20px rgba(0, 0, 0, 0.03)",
        floating: "0 16px 40px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};