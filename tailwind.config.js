/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#8B2635', // deep-maroon
        'primary-50': '#FDF2F4', // very-light-maroon
        'primary-100': '#FCE7EA', // light-maroon
        'primary-200': '#F8CDD4', // medium-light-maroon
        'primary-300': '#F2A3B3', // medium-maroon
        'primary-400': '#E97A92', // medium-dark-maroon
        'primary-500': '#D85171', // dark-maroon
        'primary-600': '#B83E56', // darker-maroon
        'primary-700': '#8B2635', // deep-maroon
        'primary-800': '#6B1E2A', // very-dark-maroon
        'primary-900': '#4A151D', // darkest-maroon
        'primary-foreground': '#FFFFFF', // white

        // Secondary Colors
        'secondary': '#D4AF37', // rich-gold
        'secondary-50': '#FEFCF5', // very-light-gold
        'secondary-100': '#FDF8E8', // light-gold
        'secondary-200': '#FAF0CC', // medium-light-gold
        'secondary-300': '#F5E299', // medium-gold
        'secondary-400': '#EFD366', // medium-dark-gold
        'secondary-500': '#E9C446', // dark-gold
        'secondary-600': '#D4AF37', // rich-gold
        'secondary-700': '#B8962F', // darker-gold
        'secondary-800': '#8F7525', // very-dark-gold
        'secondary-900': '#66541B', // darkest-gold
        'secondary-foreground': '#2C1810', // rich-dark-brown

        // Accent Colors
        'accent': '#2E8B57', // forest-green
        'accent-50': '#F0F9F4', // very-light-green
        'accent-100': '#DCF2E4', // light-green
        'accent-200': '#BBE5CA', // medium-light-green
        'accent-300': '#8DD3A5', // medium-green
        'accent-400': '#5FBF7E', // medium-dark-green
        'accent-500': '#3DA862', // dark-green
        'accent-600': '#2E8B57', // forest-green
        'accent-700': '#26734A', // darker-green
        'accent-800': '#1F5A3A', // very-dark-green
        'accent-900': '#17412A', // darkest-green
        'accent-foreground': '#FFFFFF', // white

        // Background Colors
        'background': '#FEFCF8', // warm-off-white
        'surface': '#F8F6F0', // subtle-cream
        'surface-50': '#FEFCF8', // warm-off-white
        'surface-100': '#F8F6F0', // subtle-cream
        'surface-200': '#F2EFE7', // light-cream
        'surface-300': '#EBE7DD', // medium-cream
        'surface-400': '#E4DFD3', // medium-dark-cream
        'surface-500': '#DDD7C9', // dark-cream

        // Text Colors
        'text-primary': '#2C1810', // rich-dark-brown
        'text-secondary': '#6B5B4F', // medium-brown
        'text-muted': '#8B7D71', // light-brown
        'text-disabled': '#A8A098', // very-light-brown

        // Status Colors
        'success': '#22C55E', // green-500
        'success-50': '#F0FDF4', // green-50
        'success-100': '#DCFCE7', // green-100
        'success-500': '#22C55E', // green-500
        'success-600': '#16A34A', // green-600
        'success-foreground': '#FFFFFF', // white

        'warning': '#F59E0B', // amber-500
        'warning-50': '#FFFBEB', // amber-50
        'warning-100': '#FEF3C7', // amber-100
        'warning-500': '#F59E0B', // amber-500
        'warning-600': '#D97706', // amber-600
        'warning-foreground': '#FFFFFF', // white

        'error': '#DC2626', // red-600
        'error-50': '#FEF2F2', // red-50
        'error-100': '#FEE2E2', // red-100
        'error-500': '#EF4444', // red-500
        'error-600': '#DC2626', // red-600
        'error-foreground': '#FFFFFF', // white

        // Border Colors
        'border': 'rgba(107, 91, 79, 0.12)', // medium-brown-12
        'border-light': 'rgba(107, 91, 79, 0.08)', // medium-brown-8
        'border-strong': 'rgba(107, 91, 79, 0.24)', // medium-brown-24
      },
      fontFamily: {
        'heading': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
        'caption': ['Source Sans Pro', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        'header-desktop': '64px',
        'header-mobile': '56px',
      },
      borderRadius: {
        'lg': '8px',
        'md': '6px',
        'sm': '4px',
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(44, 24, 16, 0.08)',
        'medium': '0 4px 12px rgba(44, 24, 16, 0.12)',
        'strong': '0 8px 24px rgba(44, 24, 16, 0.16)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      },
      zIndex: {
        'header': '1000',
        'dropdown': '1050',
        'mobile-menu': '1100',
        'modal': '1200',
      },
      animation: {
        'fade-in': 'fadeIn 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-in-left': 'slideInLeft 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-out-left': 'slideOutLeft 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOutLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}