import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-playfair)", "serif"],
        mono: ["var(--font-roboto-mono)", "monospace"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.25rem", letterSpacing: "0.01em" }],
        sm: ["0.875rem", { lineHeight: "1.5rem", letterSpacing: "0.01em" }],
        base: ["1rem", { lineHeight: "1.75rem", letterSpacing: "0.0125em" }],
        lg: ["1.125rem", { lineHeight: "1.75rem", letterSpacing: "0.015em" }],
        xl: ["1.25rem", { lineHeight: "1.75rem", letterSpacing: "0.015em" }],
        "2xl": ["1.5rem", { lineHeight: "2rem", letterSpacing: "0.015em" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem", letterSpacing: "0.02em" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem", letterSpacing: "0.02em" }],
        "5xl": ["3rem", { lineHeight: "1", letterSpacing: "0.025em" }],
        "6xl": ["3.75rem", { lineHeight: "1", letterSpacing: "0.025em" }],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        input: "hsl(var(--input))",
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
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
        blockchain: {
          DEFAULT: "hsl(var(--blockchain))",
          foreground: "hsl(var(--blockchain-foreground))",
          pending: "hsl(var(--blockchain-pending))",
          confirmed: "hsl(var(--blockchain-confirmed))",
          error: "hsl(var(--blockchain-error))",
        },
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        sidebar: {
          background: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          primaryForeground: "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          accentForeground: "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        "blockchain-card":
          "0 4px 6px -1px rgba(11, 102, 255, 0.1), 0 2px 4px -1px rgba(11, 102, 255, 0.06)",
        "transaction-hover": "0 10px 15px -3px rgba(59, 130, 246, 0.3)",
        "block-highlight": "0 0 0 2px hsl(var(--blockchain)))",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "transaction-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5", transform: "scale(0.98)" },
        },
        "block-confirm": {
          "0%": { transform: "translateY(0)", opacity: "0.6" },
          "50%": { transform: "translateY(-2px)", opacity: "1" },
          "100%": { transform: "translateY(0)", opacity: "0.6" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "transaction-pending":
          "transaction-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "block-confirmation": "block-confirm 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
  ],
};

export default config;
