module.exports = {
    title: "SEUNGWOO's TECH LOG",
    plugins: [
        ['@vuepress/search', {
            searchMaxSuggestions: 10
        }],
        [require('./plugins/vuepress-plugin-demo-block.js')],
        ['@vuepress/last-updated'],
        ['@vuepress/back-to-top'],
        ['@vuepress/nprogress'],
        ['@vuepress/pwa', {
            serviceWorker: true,
            updatePopup: true
        }],
        [
            '@vuepress/google-analytics',
            {
                'ga': 'UA-155428271-1'
            }
        ]
    ],
    themeConfig: {
        theme: '@vuepress/vue',
        lastUpdated: 'Last Updated',
        nav: [
            {
                text: 'Blog',
                link: '/blog/'
            },
            {
                text: 'About',
                link: '/about/'
            },
            {
                text: 'GitHub',
                link: 'https://github.com/Seungwoo321'
            }
        ],
        // sidebar: {
        //     '/project/environment': [
        //         ''
        //     ]
        // }
    }
}


