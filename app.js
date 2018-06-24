const express = require('express')
const app = express()

const PORT = 80
app.listen(PORT, () => {
    console.log(`PORT ${PORT} CONNECTED SUCCESS`)
})

global.__rootDir = __dirname

//modules
const path = require('path')
const conn = require('./server/modules/mongo.js')()
const bodyParser = require('body-parser')
const session = require('express-session')

//middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
    secret: '@!@$$%&$@$TFGHJGJ&^%U$T',
    resave: false, //변경사항없을시에도 언제나 재저장여부 => 권장값 false
    saveUninitialized: true,
    cookie: {
        maxAge: ( 1000 * 60 * 60 ) * 12
    }
}))

//routes
const auth = require('./server/routes/auth.js')(express, conn, path)
const api = require('./server/routes/api')(express, conn, path)

app.use('/auth', auth)
app.use('/api', api)
app.use('/public', express.static('./react/public'))
app.use('/uploads', express.static('./server/uploads'))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/react/public/index.html'))
})

