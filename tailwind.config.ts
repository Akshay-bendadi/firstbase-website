import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        neon: {
          blue: "hsl(211 97% 62%)",
          cyan: "hsl(174 88% 52%)",
          purple: "hsl(263 82% 67%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "glow-blue": "0 0 18px hsl(211 97% 62% / 0.38), 0 0 56px hsl(211 97% 62% / 0.12)",
        "glow-cyan": "0 0 18px hsl(174 88% 52% / 0.38), 0 0 56px hsl(174 88% 52% / 0.12)",
        "glow-purple": "0 0 18px hsl(263 82% 67% / 0.38), 0 0 56px hsl(263 82% 67% / 0.12)",
        "neon-sm": "0 0 8px hsl(174 88% 52% / 0.4)",
        "glass": "0 8px 32px hsl(218 80% 5% / 0.6), inset 0 1px 0 hsl(218 22% 25% / 0.3)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-right": {
          from: { opacity: "0", transform: "translateX(-16px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "glow-pulse": {
          "0%, 100%": {
            opacity: "0.5",
            boxShadow: "0 0 4px hsl(174 88% 52% / 0.6)",
          },
          "50%": {
            opacity: "1",
            boxShadow: "0 0 12px hsl(174 88% 52% / 1)",
          },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out",
        "slide-right": "slide-right 0.4s ease-out",
        float: "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
