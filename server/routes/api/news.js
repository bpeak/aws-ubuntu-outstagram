module.exports = (express, conn) => {
    const news = express.Router()

    news.get('/', (req, res) => {
        
        conn((err, db, mongo) => {

            let myFollowings = []

            if(err){ return console.log(err)}
            const field = { nick : req.session.passport.user.nick }
            db.collection('users')
            .find(field)
            .toArray()
            .then(results => {
                myFollowings = results[0].followings
                const users = results[0].recentNews.reduce((result, news) => {
                    if(result.indexOf(news.nick) === -1){
                        result.push(news.nick)
                        return result
                    } else {
                        return result
                    }
                }, [])

                const field = { nick : { $in : users }}
                db.collection('users')
                .find()
                .toArray()
                .then(results2 => {
                    const aa = results[0].recentNews.map((news) => {
                        const nick = news.nick
                        for(let i = 0; i < results2.length; i++){
                            if(results2[i].nick === nick){
                                news.profilePhotoUrl = results2[i].profilePhotoUrl
                                return news
                            } else {
                                continue
                            }
                        }
                    })
                    const recentNews_ordered = aa.sort((a, b) => ( a.date > b.date ? -1 : 1 ))
                    const response = {
                        recentNews : recentNews_ordered.map((news) => {
                            if(myFollowings.indexOf(news.nick) == -1){
                                news.follow = false
                            } else {
                                news.follow = true
                            }
                            return news
                        })
                    }

                    const postsId = recentNews_ordered.reduce((result3, news) => {
                        if(news.type === 'commnet' || news.type === 'like'){
                            if(result3.indexOf(news.postId) === -1){
                                result3.push(news.postId)
                                return result3
                            } else {
                                return result3
                            }
                        } else {
                            return result3
                        }
                    }, [])

                    const postObjectIds = postsId.map((postsId) => {
                        return mongo.ObjectId(postsId)
                    })
                    console.log(postObjectIds)
                    const field3 = { _id : { $in : postObjectIds }}
                    db.collection('posts')
                    .find(field3)
                    .toArray()
                    .then(results3 => {
                        const abc = response.recentNews.map((news) =>  {
                            const id = news.postId
                            if(news.type === "like" || news.type === 'comment'){
              
                                for(let i = 0; i < results3.length; i++){
                                    if(results3[i]._id == news.postId){
                                        news.post = results3[i]
                                    }
                                }
                                return news
                            } else {
                                return news
                            }
                        })
                        //console.log(abc)
                        response.recentNews = abc
                        res.json(JSON.stringify(response))       
                    })

                               
                })
            })
        })
    })

    return news
}