// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss"],

  tailwindcss: {
    configPath: "~/tailwind.config.ts",
  },

  css: ["~/assets/css/global.css"],

  runtimeConfig: {
    public: {
      strapiUrl: "http://localhost:1337",
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
});
