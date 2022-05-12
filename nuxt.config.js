export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-project',
    htmlAttrs: {
      lang: 'en'
    },
    script: [{
      src: "https://yastatic.net/vh-player/loader.js",
    }, ],
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      },
      {
        name: 'format-detection',
        content: 'telephone=no'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'ant-design-vue/dist/antd.css',
    'static/fonts/ALS-hauss/stylesheet.css',
    'static/fonts/Rubik/stylesheet.css',
    'static/fonts/icomoon/style.css',
    'static/css/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/antd-ui',
    '@/plugins/VueScroll.js',
    {
      src: "@/plugins/error.js",
      mode: "client"
    },
    {
      src: "@/plugins/smartRouter.js",
      mode: "client"
    }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/moment',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/toast',
  ],
  axios: {
    baseURL: 'https://m.bot-marketing.com/api/public/tunnelSessions',
  },
  toast: {
    position: 'top-center',
    duration: 3000,
  },


  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
