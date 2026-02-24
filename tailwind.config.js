/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
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
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
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
        neon: {
          cyan: "#00ffff",
          orange: "#ff6600",
        },
        cyber: {
          black: "#000000",
          dark: "#0a0a0a",
          gray: "#2a2a2a",
        }
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
        mono: ['Courier New', 'monospace'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        neon: "0 0 20px rgba(0, 255, 255, 0.5)",
        "neon-strong": "0 0 40px rgba(0, 255, 255, 0.8)",
        "neon-orange": "0 0 20px rgba(255, 102, 0, 0.5)",
        glass: "0 8px 32px rgba(0, 255, 255, 0.1)",
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
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-neon": {
          "0%, 100%": { 
            boxShadow: "0 0 20px rgba(0, 255, 255, 0.5)",
            opacity: "1"
          },
          "50%": { 
            boxShadow: "0 0 40px rgba(0, 255, 255, 0.8)",
            opacity: "0.8"
          },
        },
        "glow": {
          "0%, 100%": { 
            textShadow: "0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 20px #00ffff"
          },
          "50%": { 
            textShadow: "0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 40px #00ffff"
          },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "orbit": {
          "0%": { transform: "rotate(0deg) translateX(150px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(150px) rotate(-360deg)" },
        },
        "tunnel-move": {
          "0%": { transform: "translateZ(0) scale(1)", opacity: "1" },
          "100%": { transform: "translateZ(1000px) scale(0)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-neon": "pulse-neon 2s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        "orbit": "orbit 10s linear infinite",
        "tunnel-move": "tunnel-move 3s linear infinite",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-grid': 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
