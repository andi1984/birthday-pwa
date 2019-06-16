const fs = require('fs')
fs.writeFileSync('./.env', `SENTRY_KEY=${process.env.SENTRY_KEY}`)
