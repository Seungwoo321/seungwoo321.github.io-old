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
        ],
        [
            'vuepress-plugin-table-of-contents'
        ]
    ],
    markdown: {
        lineNumbers: true,
        config: md => {
            md.use(require('markdown-it-deflist'))
        },
        extendMarkdown: md => {
            md.use(require('markdown-it-imsize'))
        }
    },
    themeConfig: {
        theme: '@vuepress/vue',
        lastUpdated: 'Last Updated',
        nav: [
            {
                text: 'Blog',
                link: '/blog/',
                sidebar: 'auto'
            },
            {
                text: 'Portfolio',
                link: '/portfolio/'
            },
            {
                text: 'About',
                link: '/about/'
            },
            {
                text: 'GitHub',
                link: 'https://github.com/Seungwoo321'
            }
        ]
    }
}


