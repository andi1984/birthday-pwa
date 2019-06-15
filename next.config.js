const withCSS = require('@zeit/next-css')
const withSourceMaps = require('@zeit/next-source-maps')()
module.exports = withCSS(
    withSourceMaps({
        cssLoaderOptions: {
            url: true,
        },
        webpack: config => {
            // Fixes npm packages that depend on `fs` module
            config.node = {
                fs: 'empty',
            }

            return config
        },
    })
)
