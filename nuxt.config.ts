// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "@nuxtjs/i18n"],

  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  i18n: {
    defaultLocale: "en",
    strategy: "prefix_except_default",
    locales: [
      { code: "en", language: "en-US", name: "EN" },
      { code: "vi", language: "vi-VN", name: "VI" },
    ],
  },

  tailwindcss: {
    configPath: "~~/tailwind.config.ts",
  },

  runtimeConfig: {
    strapiToken: "",
    strapiUrl: "http://localhost:1337",
    public: {
      strapiUrl: "http://localhost:1337",
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  app: {
    head: {
      // title: "Serene Saigon",
      titleTemplate: "%s | Serene",
      link: [{ rel: "icon", type: "image/jpeg", href: "/logos/logo.jpg" }],
    },
  },

  routeRules: {
    "/": { redirect: { to: "/the-club", statusCode: 302 } },
    "/vi": { redirect: { to: "/vi/ve-serene", statusCode: 302 } },
  },
});
