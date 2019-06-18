var express = require('express')
var app = express()
var multer = require('multer')
var cors = require('cors')
var serverless = require('serverless-http')

app.use(cors())
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'multeruploads')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    },
})
var upload = multer({ storage: storage }).single('image')
//const router = express.Router()
app.post('/upload', (req, res) => {
    upload(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)
    })
})

// app.use('/.netlify/functions/send', (req, res) => {
//     upload(req, res, function(err) {
//         if (err instanceof multer.MulterError) {
//             return res.status(500).json(err)
//         } else if (err) {
//             return res.status(500).json(err)
//         }
//         return res.status(200).send(req.file)
//     })
// })

// module.exports = app
// module.exports.handler = serverless(app)
app.listen(1222, () => console.log('listen on 1222'))
