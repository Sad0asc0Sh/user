import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontWeight: {
        thin: "100",
        medium: "500",
        bold: "700",
      },
      colors: {
        // O�U+U_�?OU�OUO OO�U,UO O"O� OO3OO3 U.O'OrO�OO�
        'header-bg': '#FFFFFF',
        'header-border': '#E6E9EE', // OrO� O�O_OUcU+U+O_U� O,O�UOU?
        'text-primary': '#1A202C', // U.O�U+ OO�U,UO (O�UOO�U؃?OO�O�)
        'text-secondary': '#6B7280', // U.O�U+ O�OU+U^UOU� OrOUcO3O�O�UO
        'brand-primary': '#1E3A8A', // O�O"UO/O3O�U.U؃?OOUO O"O�OUO O�OUcUOO_U�O
        'brand-secondary': '#D6E0FF', // O�O"UO O�U^O'U+�?OO�O� (O"O�OUO outline)
        'badge-bg': '#EF4444', // U,O�U.O� U.U,OUOU. O"UZO�
        'badge-text': '#FFFFFF',
        'mega-menu-accent': '#DCEBFF', // Pastel blue for accents
        'mega-menu-accent-light': '#EFF5FF', // Lighter pastel blue for backgrounds
        'sale-bg': '#EF4444',
        'sale-text': '#FFFFFF',
        
        // Original colors needed for base styles
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
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "0.5rem", // 8px (UOO 0.75rem O"O�OUO 12px)
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)', // O3OUOU� U.U,OUOU.
        'soft-lg': '0 18px 45px -12px rgb(15 23 42 / 0.20)', // U.O,O�O�O3O� U.U,OUOU. O3OO�U,U�
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
