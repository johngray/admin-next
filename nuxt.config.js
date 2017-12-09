module.exports = {

    /*
    ** Headers of the page
    */
    head: {
        title: 'Интерфейс администратора Почты России',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: 'Новый интерфейс администартора Почты России'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },

    css: ['startbootstrap-sb-admin/css/sb-admin.min.css', '~/static/css/fontawesome.css', '~/static/css/fa-solid.css', '~/static/css/sb-admin-fix.css'],

    // Important. Do not touch
    mode: 'spa',

    /*
    ** Customize the progress bar color
    */
    loading: {color: '#3B8070'},

    modules: [
        'bootstrap-vue/nuxt'
    ],

    plugins: [
        {src: '~/plugins/flatpickr.js'},
        {src: '~/plugins/notification.js'}
    ],

    env: {
        logicBaseUrl: process.env.LOGIC_BASE_URL || 'http://localhost:8081/logic',
        oldAdminUrl: process.env.OLD_ADMIN_URL || 'http://localhost:5000'
    },

    generate: {
        minify: {
            collapseWhitespace: false
        }
    },

    /*
    ** Build configuration
    */
    build: {

        vendor: ['axios', 'bootstrap-vue', 'vue-flatpickr-component', 'vuex-persistedstate', 'vue-notification',
                 'moment', 'vue-slider-component'],

        /*
        ** Run ESLint on save
        */
        extend (config, ctx) {
            if (ctx.dev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    }
};
