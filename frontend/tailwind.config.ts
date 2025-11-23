import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                border: "hsl(var(--border))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))", // Welf Logic
                primary: {
                    DEFAULT: "hsl(var(--primary))", // Vita Logic (Golden-Orange)
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))", // Welf Logic (Gray)
                    foreground: "hsl(var(--secondary-foreground))",
                },
                // Custom brand specifics if needed directly
                welf: {
                    50: '#f8fafc',
                    500: '#64748b',
                    900: '#0f172a',
                },
                vita: {
                    400: '#fbbf24',
                    500: '#f59e0b', // Golden Orange
                    600: '#d97706',
                }
            },
            fontFamily: {
                sans: ['var(--font-iransans)'],
            },
        },
    },
    plugins: [],
};
export default config;
