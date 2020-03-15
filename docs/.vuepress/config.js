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
        {
            'seo': {
                siteTitle: (_, $site) => $site.title,
                title: $page => $page.title,
                description: $page => $page.frontmatter.description,
                author: (_, $site) => $site.themeConfig.author,
                tags: $page => $page.frontmatter.tags,
                url: (_, $site, path) => ($site.themeConfig.domain || '') + path,
                image: ($page, $site) => $page.frontmatter.image && (($site.themeConfig.domain || '') + $page.frontmatter.image),
                publishedAt: $page => $page.frontmatter.date && new Date($page.frontmatter.date),
                modifiedAt: $page => $page.lastUpdated && new Date($page.lastUpdated),
            
            }
        }
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
                link: '/blog/'
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
        ],
        // sidebar: {
        //     '/project/environment': [
        //         ''
        //     ]
        // }
    }
}


