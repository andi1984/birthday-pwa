const withCSS = require('@zeit/next-css')
const withSourceMaps = require('@zeit/next-source-maps')()
const withOffline = require('next-offline')

module.exports = withOffline(
    withCSS(
        withSourceMaps({
            target: 'serverless',
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
            env: {
                SENTRY_KEY: process.env.SENTRY_KEY,
                MY_AWS_ACCESS_KEY_ID: process.env.MY_AWS_ACCESS_KEY_ID,
                MY_AWS_SECRET_ACCESS_KEY: process.env.MY_AWS_SECRET_ACCESS_KEY,
            },
        })
    )
)
