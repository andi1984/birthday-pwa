const Dotenv = require('dotenv-webpack')
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

            config.plugins = [...config.plugins, new Dotenv()]
            return config
        },
    })
)
