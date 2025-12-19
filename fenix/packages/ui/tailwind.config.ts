import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../apps/web-admin/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../apps/mobile-app/app/**/*.{js,ts,jsx,tsx}",
    "../../apps/mobile-app/src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: '#F3F4F6', // Canvas Grey
        surface: '#FFFFFF',    // Pure White
        primary: {
          DEFAULT: '#0EA5E9', // Ocean Tech
          dark: '#0284C7',
        },
        secondary: '#0F172A', // Deep Navy
        subtext: '#6B7280',   // Cool Grey
        success: '#10B981',   // Emerald Life
        warning: '#F59E0B',   // Amber Signal
        danger: '#EF4444',    // Red Error
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 15px rgba(14, 165, 233, 0.5)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      }
    },
  },
  plugins: [],
};
export default config;
