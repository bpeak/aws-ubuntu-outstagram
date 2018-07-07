module.exports = (express, conn) => {
    const comment = express.Router()

    comment.post('/', (req, res) => {
        conn((err, db, mongo) => {
            if(err){
                console.log(err)
            } else {
                const postObjectId = mongo.ObjectId(req.body.postId)
                const content = req.body.user_input_comment
                const nick = req.session.passport.user.nick
                const isoDate = new Date().toISOString()
                
                const comment = {
                    nick,
                    content,
                    date : isoDate
                }      
                const field = { _id : postObjectId }
                const query = { $push: { comments : comment} }
                db.collection('posts').update(field, query)
                .then((results) => {
                    if(results.result.ok === 1){
                        const response = {
                            comment
                        }
                        res.json(JSON.stringify(response))
                    }
                })
            }
        })
    })

    return comment

}