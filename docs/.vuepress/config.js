module.exports = {
    title: "SEUNGWOO's TECH LOG",
    head: [
        ['link', { rel: 'icon', href: '/fire.png' }]
    ],
    plugins: [
        [
            '@vuepress/search', {
                searchMaxSuggestions: 10
            }
        ],
        [
            require('./plugins/vuepress-plugin-demo-block.js')
        ],
        [
            '@vuepress/back-to-top'
        ],
        [
            '@vuepress/nprogress'
        ],
        [
            '@vuepress/pwa', {
                serviceWorker: true,
                updatePopup: true
            }
        ],
        [
            '@vuepress/google-analytics', {
                'ga': 'UA-155428271-1'
            }
        ],
        [
            'vuepress-plugin-table-of-contents'
        ],
        [
            '@vuepress/html-redirect', {
                countdown: 0
            }
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
        nav: [
            {
                text: 'TECH',
                link: '/'
            },
            {
                text: 'PORTFOLIO',
                link: '/portfolio/'
            },
            {
                text: 'ABOUT',
                link: '/about/'
            },
            {
                text: 'GITHUB',
                link: 'https://github.com/Seungwoo321'
            }
        ]
    }
}


