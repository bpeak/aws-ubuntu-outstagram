module.exports = (express, conn) => {
    const login = express.Router()

    const local = require('./local.js')(express, conn)
    const kakao = require('./kakao.js')(express, conn)
    const facebook = require('./facebook.js')(express, conn)

    login.use('/local', local)
    login.use('/kakao', kakao)
    login.use('/facebook', facebook)

    return login
}