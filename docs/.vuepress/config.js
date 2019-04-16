module.exports = {
    title: "SALARY LUPINE",
    description: "Salary Lupine's log",
    themeConfig: {
        nav: [
            {
                text: 'Home',
                link: '/'
            },
            {
                text: 'Project',
                link: '/project/'
                // items: [
                //     {
                //         text: 'Environment',
                //         link: '/project/environment/'
                //     }
                // ]
            },
            {
                text: 'English',
                link: '/english/'
            },
            {
                text: 'About',
                link: '/about/'
            }
        ],
        sidebar: {
            '/project/environment/': [
                ''
            ]
        }
    }
}