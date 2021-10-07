import './style.css'
export default ({
    Vue, // the version of Vue being used in the VuePress app
    options, // the options for the root Vue instance
    router, // the router instance for the app
    siteData // site metadata
}) => {
    const { routes } = router.options
    routes.unshift({
        name: 'google-site-verification',
        path: '/google603171b62dec4aac.html'
    })
    routes.unshift({
        name: 'naver-site-verification',
        path: '/naverd0af24031866c2cb391f545d6da12043.html'
    })
}