const express = require('express')
const serverless = require('serverless-http')
var bodyParser = require('body-parser')
var multer = require('multer')
const path = require('path')
const fs = require('fs')
var cors = require('cors')
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'multeruploads')
    },
    filename: function(req, file, cb) {
        cb(
            null,
            file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        )
    },
})
var upload = multer({ storage: storage })

const app = express()
// for parsing multipart/form-data
app.use(upload.single('image'))

const router = express.Router()
router.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write('<h1>Hello from Express.js!</h1>')
    res.end()
})
router.get('/another', (req, res) => res.json({ route: req.originalUrl }))
router.options('*', cors())
router.post('/', (req, res) => {
    res.set('Content-Type', 'application/octet-stream')
    res.end(res.file, 'binary')
})

app.use('/.netlify/functions/send', router)

module.exports = app
module.exports.handler = serverless(app)
