const sentry = require('@sentry/node')
const { SENTRY_KEY } = process.env
const express = require('express')
const serverless = require('serverless-http')
const multer = require('multer')
const upload = multer()

const app = express()

export function initSentry() {
    if (SENTRY_KEY) {
        Sentry.init({
            dsn: `https://${process.env.SENTRY_KEY}@sentry.io/1483051`,
        })
    }
}

initSentry()

app.post('/', upload.none(), (req, res) => {
    const formData = req.body
    res.sendStatus(200)
})

module.exports.handler = serverless(app)
