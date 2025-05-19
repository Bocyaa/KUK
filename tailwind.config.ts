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
      /* add a raw media‑query breakpoint */
      screens: {
        standalone: { raw: '(display-mode: standalone)' },
      },
    },
  },
};

export default config;
