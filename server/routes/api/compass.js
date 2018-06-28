module.exports = (express, conn, path) => {
    const compass = express.Router()
        
    compass.get('/hashtags/:hashtag', (req, res) => {
        const hashtag = req.params.hashtag
        conn((err, db) => {
            if(err){
                console.log(err)
            } else {
                let query = { hashtags : hashtag }
                db.collection('posts')
                .find(query)
                .toArray()
                .then(posts => {
                    posts.sort((a, b) => {
                        return a.likes.length <= b.likes.length
                    })
                    const response = {
                        posts : posts
                    }
                    res.json(JSON.stringify(response))
                })
            }
        })
    })  


    //이건 특정 해시태그한개만 주자
    // compass.get('/hashtag/:postId', (req, res) => {
    //     const hashtag = req.params.hashtag
    //     conn((err, db) => {
    //         if(err){
    //             console.log(err)
    //         } else {
    //             let query = { hashtags : hashtag }
    //             let cursor = db.collection('posts').find(query)                    
    //             cursor.toArray()
    //             .then(result => {
    //                 const response = {
    //                     posts : result
    //                 }
    //                 res.json(JSON.stringify(response))
    //             })
    //         }
    //     })
    // })
    return compass
}