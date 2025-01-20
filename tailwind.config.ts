import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-playfair)'],
        lora: ['var(--font-lora)'],
      },
      colors: {
        primary: {
          '50': '#f0f9ff',
          '100': '#e0f2fe',
          '200': '#bae6fd',
          '300': '#7dd3fc',
          '400': '#38bdf8',
          '500': '#0ea5e9',
          '600': '#0284c7',
          '700': '#0369a1',
          '800': '#075985',
          '900': '#0c4a6e',
        },
        accent: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#333',
            h2: {
              fontFamily: 'var(--font-playfair)',
              marginTop: '2rem',
              marginBottom: '1rem',
              fontSize: '1.875rem',
              fontWeight: '700',
              lineHeight: '2.25rem',
            },
            h3: {
              fontFamily: 'var(--font-playfair)',
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
              fontSize: '1.5rem',
              fontWeight: '600',
              lineHeight: '2rem',
            },
            'ul > li': {
              paddingLeft: '1.5rem',
              position: 'relative',
              '&::before': {
                content: '""',
                width: '0.375rem',
                height: '0.375rem',
                borderRadius: '50%',
                backgroundColor: '#4B5563',
                position: 'absolute',
                left: 0,
                top: '0.6875rem',
              },
            },
            'ol > li': {
              paddingLeft: '1.5rem',
              counterIncrement: 'list-counter',
              position: 'relative',
              '&::before': {
                content: 'counter(list-counter) "."',
                position: 'absolute',
                left: 0,
                color: '#4B5563',
                fontWeight: '500',
              },
            },
            blockquote: {
              fontStyle: 'normal',
              borderLeftWidth: '0.25rem',
              borderLeftColor: '#E5E7EB',
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
              paddingLeft: '1rem',
              color: '#4B5563',
              fontFamily: 'var(--font-lora)',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
