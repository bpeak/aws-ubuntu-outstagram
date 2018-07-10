module.exports = (express, conn) => {
    const news = express.Router()

    news.get('/', (req, res) => {
        
        conn((err, db, mongo) => {
            if(err){ return console.log(err)}
            const field = { nick : req.session.passport.user.nick }
            db.collection('users')
            .find(field)
            .toArray()
            .then(results => {
                const recentNews_ordered = results[0].recentNews.sort((a, b) => ( a > b ? -1 : 1 ))
                const response = {
                    recentNews : recentNews_ordered
                }
                res.json(JSON.stringify(response))
            })
        })
    })

    return news
}