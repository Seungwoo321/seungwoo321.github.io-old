module.exports = {
    title: "SEUNGWOO's TECH LOG",
    plugins: [
        ['@vuepress/search', {
            searchMaxSuggestions: 10
        }],
        [
            require('./plugins/vuepress-plugin-demo-block.js')
        ]
    ],
    themeConfig: {
        nav: [
            {
                text: 'Blog',
                link: '/Blog/'
            },
            {
                text: 'Open Source',
                link: '/OpenSource/'
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