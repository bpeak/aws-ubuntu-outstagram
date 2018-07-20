const express = require('express')
const app = express()

const PORT = process.env.PORT || 80
app.listen(PORT, () => {
    console.log(`PORT ${PORT} CONNECTED SUCCESS`)
})

global.__rootDir = __dirname

//modules
const path = require('path')
const conn = require('./server/modules/mongo.js')()
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const passportConfig = require('./server/modules/passportConfig')

conn((err, db, mongo) => {
    db.collection('posts')
    .find()
    .limit(5)
    .sort({ likes : 1 })
    .toArray()
    .then(results => {
        console.log(results)
    })
})


//routes
//const auth = require('./server/routes/auth.js')(express, conn, path)
const api = require('./server/routes/api')(express, conn, path)
///임시
// const auth2 = require('./server/routes/auth2.js')(express, conn, path)


const auth3 = require('./server/routes/auth/')(express, conn)

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
app.use(passport.initialize())// passport 구동
app.use(passport.session())// 세션 연결
passportConfig()

// app.use('*', (req, res, next) => {
//     const user = {
//         id : 'bpeak',
//         name : 'bpeak'
//     }
//     req.session.passport = {
//         user
//     }
//     next()
// })

app.use('/auth', auth3)
app.use('/api', api)
app.use('/public', express.static('./react/public'))
app.use('/uploads', express.static('./server/uploads'))

// app.get('*', (req, res, next) => {
//     const user = {
//         id : 'xotjq',
//         nick : 'xotjq',
//         name : 'xotjq'
//     }
//     req.session.passport = {
//         user : user
//     }
//     next()
// })

app.get('*', (req, res) => {
    console.log(req.session.passport)
    if(req.headers['user-agent'].indexOf('Chrome') === -1){
        res.sendFile(path.join(__dirname, '/react/public/recommendChrome.html'))
    } else {
        res.sendFile(path.join(__dirname, '/react/public/index.html'))
    }
})

