import type { Config } from 'tailwindcss';

// Same "Growth Ledger" tokens as apps/marketing, adapted for app-shell use.
// Duplicated rather than shared for now — extracting this into
// packages/config is the natural next step from Phase 2's monorepo plan
// (ADR-002) once a third app needs it too (apps/admin).
export default <Partial<Config>>{
  content: ['./components/**/*.{vue,js,ts}', './pages/**/*.vue', './layouts/**/*.vue', './app.vue'],
  theme: {
    extend: {
      colors: {
        paper: '#EEF0E4',
        ink: '#16241B',
        forest: { DEFAULT: '#2F5233', dark: '#20391F', light: '#4A7350' },
        gold: { DEFAULT: '#B8863A', light: '#D9AE6B', dark: '#8F6A2C' },
        sky: { DEFAULT: '#3E6B8A', light: '#6B93AE' },
        soil: { DEFAULT: '#8B5A2B', light: '#A97847' },
      },
      fontFamily: {
        display: ['Outfit', '"Plus Jakarta Sans"', 'ui-sans-serif', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'sans-serif'],
        mono: ['"DM Mono"', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        ledger: 'repeating-linear-gradient(to bottom, transparent, transparent 35px, rgba(22,36,27,0.05) 35px, rgba(22,36,27,0.05) 36px)',
      },
    },
  },
  plugins: [],
};
