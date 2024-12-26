// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    modules: ['nuxt-auth-utils', '@nuxt/eslint', '@nuxt/ui'],
    runtimeConfig: {
        public: {
            apiBase: 'https://xxvnapi.com/api'
        }
    }
})
