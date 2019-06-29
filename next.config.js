const withCSS = require('@zeit/next-css')
const withSourceMaps = require('@zeit/next-source-maps')()
const withOffline = require('next-offline')

module.exports = withCSS(
    withSourceMaps(
        withOffline({
            target: 'serverless',
            cssLoaderOptions: {
                url: true,
            },
            generateInDevMode: true,
            devSwSrc: '/_next/static/service-worker.js',
            workboxOpts: {
                globPatterns: ['static/**/*'],
                globDirectory: '.',
                runtimeCaching: [
                    {
                        urlPattern: /.png$/,
                        handler: 'StaleWhileRevalidate',
                    },
                ],
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
