module.exports = (express, conn, path) => {
    const api = express.Router()

    //apis
    api.use('*', (req, res, next) => {
        if(req.session.passport && req.session.passport.user){
            next()
        } else {
            console.log('세션 만료')
        }
    })

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

    const likes = require('./likes.js')(express, conn)
    api.use('/likes', likes)

    const comment = require('./comment.js')(express, conn)
    api.use('/comment', comment)

    const news = require('./news.js')(express, conn)
    api.use('/news', news)

	return api
}