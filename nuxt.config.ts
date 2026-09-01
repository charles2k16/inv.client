export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', '@pinia/nuxt'],

  // Register by filename (AppInput, FerrowLogo) — templates don't use Ui/Brand/App prefixes.
  components: [
    { path: '~/components/ui', pathPrefix: false },
    { path: '~/components/brand', pathPrefix: false },
    { path: '~/components/app', pathPrefix: false },
  ],

  css: ['~/assets/css/main.css'],

  googleFonts: {
    families: {
      Outfit: [400, 500, 600, 700],
      'Plus Jakarta Sans': [400, 500, 600, 700],
      'DM Mono': [400, 500],
    },
    display: 'swap',
    download: true,
  },

  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:4000/graphql',
    },
  },

  // Static export for Hostinger (and similar) file hosting.
  // Build: npm run generate  →  deploy apps/investor/.output/public/
  nitro: {
    preset: 'static',
  },

  // Hybrid rendering, exactly as designed in Phase 2 ADR-002: pre-auth
  // routes are server-rendered for a fast first paint; everything past
  // auth is client-only — the dashboard has no SEO value, and
  // server-rendering authenticated financial data would mean the server
  // holding per-request session context for no real benefit.
  routeRules: {
    '/login': { ssr: true },
    '/register': { ssr: true },
    '/setup-pin': { ssr: true },
    '/forgot-pin': { ssr: true },
    '/forgot-password': { ssr: true },
    '/reset-password': { ssr: true },
    '/dashboard': { ssr: false },
    '/dashboard/**': { ssr: false },
    '/notifications': { ssr: false },
    '/invest': { ssr: false },
    '/invest/**': { ssr: false },
    '/investments': { ssr: false },
    '/investments/**': { ssr: false },
    '/wallet': { ssr: false },
    '/wallet/**': { ssr: false },
    '/referrals': { ssr: false },
    '/referrals/**': { ssr: false },
    '/profile': { ssr: false },
    '/profile/**': { ssr: false },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Ferrow',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'theme-color', content: '#EEF0E4' },
      ],
    },
  },
});
