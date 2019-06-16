const sentry = require('@sentry/node')
const { SENTRY_KEY } = process.env
const express = require('express')
const serverless = require('serverless-http')
const multer = require('multer')
const upload = multer()

const app = express()

function initSentry() {
    if (SENTRY_KEY) {
        Sentry.init({
            dsn: `https://${process.env.SENTRY_KEY}@sentry.io/1483051`,
        })
    }
}

initSentry()

app.get('/', (req, res) => {
    console.log('SEND GET HANDLER')
    res.sendStatus(200)
})

app.post('/', upload.none(), (req, res) => {
    console.log('SEND POST HANDLER')
    const formData = req.body
    res.sendStatus(200)
})

module.exports.handler = serverless(app)
