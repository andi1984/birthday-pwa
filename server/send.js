const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')
const cors = require('cors')

const app = express()

var s3 = new aws.S3({
    accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
})

const S3_BUCKET_NAME = 'birthday-2019'

app.use(cors())
var storage = multerS3({
    s3: s3,
    bucket: S3_BUCKET_NAME,
    acl: 'public-read',
    // Auto detect contet type
    contentType: multerS3.AUTO_CONTENT_TYPE,
    destination: function(req, file, cb) {
        cb(null, 'multeruploads')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    },
})
var upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 },
}).single('image')
app.post('*', (req, res) => {
    upload(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)
    })
})

module.exports = app
