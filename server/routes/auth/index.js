module.exports = (express, conn) => {
    const auth = express.Router()

    const login = require('./login')(express, conn)
    const join = require('./join.js')(express, conn)
    const check = require('./check.js')(express, conn)
    const logout = require('./logout.js')(express, conn)
    auth.use('/login', login)
    auth.use('/join', join)
    auth.use('/check', check)
    auth.use('/logout', logout)
	return auth
}