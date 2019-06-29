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
            workboxOpts: {
                swDest: 'static/service-worker.js',
                runtimeCaching: [
                    {
                        urlPattern: /^https?.*/,
                        handler: 'NetworkFirst',
                        options: {
                            cacheName: 'https-calls',
                            networkTimeoutSeconds: 15,
                            expiration: {
                                maxEntries: 150,
                                maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
                            },
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                        },
                    },
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
