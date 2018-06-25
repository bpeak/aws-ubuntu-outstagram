module.exports = (express, conn) => {
    const likes = express.Router()

    likes.put('/like/:postId', (req, res) => {
        conn((err, db, mongo) => {
            const postObjectId = mongo.ObjectId(req.params.postId)
            const nick = req.session.user.nick
            const field = { $and : [{ _id : postObjectId }, { likes : nick }]}
            db.collection('posts').find(field)
            .toArray()
            .then(results => {
                if(results.length === 0){
                    //존재X => 추가
                    const field = { _id : postObjectId }
                    const query = { $push : { likes : nick}}
                    db.collection('posts').update(field, query)
                } else {
                    //존재O => done
                }
            })
        })
    })


    likes.delete('/like/:postId', (req, res) => {
        conn((err, db, mongo) => {
            const postObjectId = mongo.ObjectId(req.params.postId)
            const nick = req.session.user.nick
            const query = { $and : [{ _id : postObjectId }, { likes : nick }]}
            const cursor = db.collection('posts')
            .find(query)
            cursor.toArray()
            .then(results => {
                if(results.length === 0){
                    //존재X => done
                } else {
                    //존재O => done
                    const field = { $and : [{ _id : postObjectId }, { likes : nick }]}
                    const query = { $pull: { likes : nick } }
                    db.collection('posts').update(field, query)              
                }
            })
        })
    })
    
    return likes
}