module.exports = (express, conn) => {
    const news = express.Router()

    news.get('/', (req, res) => {
        const recentNews = [
            {
                nick : '기현',
                type : 'comment',
                postId : '포스트아이디',
                content : '하하',
                ISODate : new Date().toISOString()
            },
            {
                nick : '지형',
                type : 'like',
                postId : '포스트아이디',
                ISODate : new Date().toISOString()
            },
            {
                nick : '동은',
                type : 'follow',
                ISODate : new Date().toISOString()
            }
        ]
    })

    return news
}