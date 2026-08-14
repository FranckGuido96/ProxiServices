/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
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
          200: "#BBF7D0",
          500: "#2FA866",
          600: "#1F7A4D",
          700: "#166534",
          800: "#14532D",
        },
        "primary-hover": "#14532D",
        secondary: {
          100: "#FFEDD5",
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
        serif: ["Playfair Display", "serif"],
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
      keyframes: {
        fadeSlideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px) scale(0.97)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      animation: {
        fadeSlideDown: 'fadeSlideDown 0.18s ease-out',
      },
    },
  },
  plugins: [],
};