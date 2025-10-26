/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // White color variations
        white: {
          DEFAULT: '#ffffff',
          50: '#ffffff',
          100: '#f8f9fa',
          200: '#e9ecef',
        },
        // Grey color variations
        grey: {
          50: '#f9f9f9',
          100: '#f0f0f0',
          200: '#e0e0e0',
          300: '#d0d0d0',
          400: '#a0a0a0',
          500: '#808080',
          600: '#606060',
          700: '#404040',
          800: '#303030',
          900: '#202020',
        },
        // Brown color variations
        brown: {
          50: '#fdf8f6',
          100: '#f5e9e5',
          200: '#ebd3ca',
          300: '#d9b7a9',
          400: '#c49682',
          500: '#a9775c',
          600: '#8c5e46',
          700: '#714937',
          800: '#5a392b',
          900: '#482d22',
        },
        // Primary color mapping to our new theme
        primary: {
          50: '#fdf8f6',
          100: '#f5e9e5',
          200: '#ebd3ca',
          300: '#d9b7a9',
          400: '#c49682',
          500: '#a9775c',
          600: '#8c5e46',
          700: '#714937',
          800: '#5a392b',
          900: '#482d22',
        },
        // Accent color mapping to our new theme
        accent: {
          50: '#f9f9f9',
          100: '#f0f0f0',
          200: '#e0e0e0',
          300: '#d0d0d0',
          400: '#a0a0a0',
          500: '#808080',
          600: '#606060',
          700: '#404040',
          800: '#303030',
          900: '#202020',
        },
        // Business color mapping to our new theme
        business: {
          50: '#f9f9f9',
          100: '#f0f0f0',
          200: '#e0e0e0',
          300: '#d0d0d0',
          400: '#a0a0a0',
          500: '#808080',
          600: '#606060',
          700: '#404040',
          800: '#303030',
          900: '#202020',
        },
        // Dark color mapping to our new theme
        dark: {
          50: '#f9f9f9',
          100: '#f0f0f0',
          200: '#e0e0e0',
          300: '#d0d0d0',
          400: '#a0a0a0',
          500: '#808080',
          600: '#606060',
          700: '#404040',
          800: '#303030',
          900: '#202020',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #a9775c, 0 0 10px #a9775c, 0 0 15px #a9775c' },
          '100%': { boxShadow: '0 0 10px #a9775c, 0 0 20px #a9775c, 0 0 30px #a9775c' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'ai-pattern': 'linear-gradient(45deg, #d0d0d0 25%, transparent 25%), linear-gradient(-45deg, #d0d0d0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #d0d0d0 75%), linear-gradient(-45deg, transparent 75%, #d0d0d0 75%)',
      },
    },
  },
  plugins: [],
}