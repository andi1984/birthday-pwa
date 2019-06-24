import React from 'react'
import App, { Container } from 'next/app'
import * as Sentry from '@sentry/browser'
Sentry.init({
    dsn: `https://${process.env.SENTRY_KEY}@sentry.io/1483051`,
})

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {}

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        return { pageProps }
    }

    componentDidCatch(error, errorInfo) {
        Sentry.withScope(scope => {
            Object.keys(errorInfo).forEach(key => {
                scope.setExtra(key, errorInfo[key])
            })

            Sentry.captureException(error)
        })

        super.componentDidCatch(error, errorInfo)
    }

    render() {
        const { Component, pageProps } = this.props

        return (
            <Container>
                <Component {...pageProps} />
            </Container>
        )
    }
}

export default MyApp
