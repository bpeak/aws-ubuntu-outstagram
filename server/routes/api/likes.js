module.exports = (express, conn) => {
    const likes = express.Router()

    likes.put('/like/:postId/:hostNick', (req, res) => {
        conn((err, db, mongo) => {
            const postObjectId = mongo.ObjectId(req.params.postId)
            const nick = req.session.passport.user.nick
            const field = { $and : [{ _id : postObjectId }, { likes : nick }]}
            db.collection('posts').find(field)
            .toArray()
            .then(results => {
                if(results.length === 0){
                    //존재X => 추가
                    const field = { _id : postObjectId }
                    const query = { $push : { likes : nick}}
                    db.collection('posts').update(field, query)
                    conn((err, db, mongo) => {
                        if(err){return console.log(err)}
                        const field = { nick : req.params.hostNick }
                        const newNews = {
                            nick : req.session.passport.user.nick,
                            type : 'like',
                            postId : req.params.postId,
                            date : new Date().toISOString()
                        }
                        const query = { $push : { recentNews : newNews }}
                        db.collection('users')
                        .update(field, query)
                    })
                } else {
                    //존재O => done
                }
            })
        })
    })


    likes.delete('/like/:postId/:hostNick', (req, res) => {
        conn((err, db, mongo) => {
            const postObjectId = mongo.ObjectId(req.params.postId)
            const nick = req.session.passport.user.nick
            const hostNick = req.params.hostNick
            const query = { $and : [{ _id : postObjectId }, { likes : nick }]}
            const cursor = db.collection('posts')
            .find(query)
            cursor.toArray()
            .then(results => {
                if(results.length === 0){
                    //존재X => done
                } else {
                    //존재O
                    const field = { $and : [{ _id : postObjectId }, { likes : nick }]}
                    const query = { $pull: { likes : nick } }
                    db.collection('posts').update(field, query)

                    conn((err, db, mongo) => {
                        if(err){return console.log(err)}
                        const field = { $and : [ 
                            { nick : hostNick }
                        ]}
                        const query = { $pull : { recentNews : { $and : [
                            { nick : 'bpeak' },
                            { type : 'like' },
                            { postId : req.params.postId }
                        ]}}}
                        db.collection('users')
                        .update(field, query)
                    })                    
                }
            })
        })
    })
    
    return likes
}