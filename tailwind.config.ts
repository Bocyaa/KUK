import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Default text font
        sans: [
          '"SF Pro Text"',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'sans-serif',
        ],

        // Display font for headings
        display: [
          '"SF Pro Display"',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'sans-serif',
        ],
      },
      fontWeight: {
        ultralight: '100',
        thin: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        heavy: '800',
      },
      fontSize: {
        // Optional: add a breakpoint where text switches from Text to Display
        // These match Apple's typical behavior
        xs: ['0.75rem', { lineHeight: '1rem' }], // SF Pro Text
        sm: ['0.875rem', { lineHeight: '1.25rem' }], // SF Pro Text
        base: ['1rem', { lineHeight: '1.5rem' }], // SF Pro Text
        lg: ['1.125rem', { lineHeight: '1.75rem' }], // SF Pro Text
        xl: ['1.25rem', { lineHeight: '1.75rem' }], // SF Pro Display
        '2xl': ['1.5rem', { lineHeight: '2rem' }], // SF Pro Display
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // SF Pro Display
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // SF Pro Display
        '5xl': ['3rem', { lineHeight: '1' }], // SF Pro Display
        '6xl': ['3.75rem', { lineHeight: '1' }], // SF Pro Display
      },
      screens: {
        standalone: { raw: '(display-mode: standalone)' },
        // Add common mobile breakpoints
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      // Add some Apple-like colors if needed
      colors: {
        'ios-blue': '#007AFF',
        'ios-green': '#34C759',
        'ios-orange': '#FF9500',
        'ios-red': '#FF3B30',
        'ios-gray': '#8E8E93',
        'ios-gray2': '#AEAEB2',
        'ios-gray3': '#C7C7CC',
        'ios-gray4': '#D1D1D6',
        'ios-gray5': '#E5E5EA',
        'ios-gray6': '#F2F2F7',
      },
    },
  },
  plugins: [],
};

export default config;
