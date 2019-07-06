var fs = require('fs')
const express = require('express')
const cors = require('cors')
const cloudinary = require('cloudinary')
// Send the user to the url from above. Once they grant access they will be redirected to the
// the redirect URL above with a query param code in the redirect. Use the code below to get the
// access token.

const app = express()

const pickRandomItemFromArray = items =>
    items[Math.floor(Math.random() * items.length)]

app.use(cors())
app.get('*', (req, res) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    })
    cloudinary.v2.api.resources(
        { type: 'upload', prefix: 'Birthday PWA', max_results: 200 },
        function(error, result) {
            const images = result.resources.map(({ width, height, secure_url }) => ({
                width,
                height,
                url: secure_url,
            }))

            const pickedImages = Array.from(Array(10).keys()).map(() =>
                pickRandomItemFromArray(images)
            )

            return res.status(200).send(pickedImages)
        }
    )
})

module.exports = app
