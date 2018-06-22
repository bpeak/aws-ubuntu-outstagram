module.exports = (express, conn, path) => {
    const api = express.Router()

	//apis
	const posts = require('./apis/posts.js')(express, conn, path)
	api.use('/posts', posts)

    const profile = require('./apis/profile.js')(express, conn, path)
    api.use('/profile', profile)

    const search = require('./apis/search.js')(express, conn, path)
    api.use('/search', search)

    const compass = require('./apis/compass.js')(express, conn, path)
    api.use('/compass', compass)

	return api
}