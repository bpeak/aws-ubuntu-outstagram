module.exports = (express, conn, path) => {
    const api = express.Router()

	//apis
	const posts = require('./posts.js')(express, conn, path)
	api.use('/posts', posts)

    const profile = require('./profile.js')(express, conn, path)
    api.use('/profile', profile)

    const search = require('./search.js')(express, conn, path)
    api.use('/search', search)

    const compass = require('./compass.js')(express, conn, path)
    api.use('/compass', compass)

    const users = require('./users.js')(express, conn)
    api.use('/users', users)

	return api
}