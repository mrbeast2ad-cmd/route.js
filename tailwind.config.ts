import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#14232A', soft: '#1D3138' },
        mist: '#EEF2F1',
        lagoon: { DEFAULT: '#0F766E', dark: '#0B5A54' },
        gold: '#B7791F',
      },
      fontFamily: {
        sans: ['var(--font-ui)', 'system-ui', 'sans-serif'],
        reading: ['var(--font-reading)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
