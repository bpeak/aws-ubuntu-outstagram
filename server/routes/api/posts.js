module.exports = (express, conn, path) => {
    const posts = express.Router()

    // post => posts/write
    // post => posts/get/main
    // post => posts/get/compass
    // post => posts/write/comment

    const upload = require(path.join(__rootDir, '/server/middlewares/upload.js'))
	posts.post('/write', upload.postFile.array('postFiles'), (req, res) => {
        const { nick } = req.session.passport.user
        const contents = req.body.contents
        const user_input_textarea = req.body.user_input_textarea
        let hashtags
        if(req.body.hashtags === undefined){
            hashtags = []
        } else {
            let list = typeof req.body.hashtags === 'string' ? [req.body.hashtags] : req.body.hashtags
            hashtags = [...list]
        }
        const isoDate = new Date().toISOString()
        const post = {
            nick,
            contents,
            description : user_input_textarea,
            hashtags,
            comments : [],
            likes : [],
            flags : [],
            date : isoDate
        }
        conn((err, db) => {
            if(err){
                console.log(err)
            } else {
                db.collection('posts').insert(post)
                .then(result => {
                    const response = {
                        isSuccess : true
                    }
                    res.json(JSON.stringify(response))
                })
            }
        })
    })

    posts.post('/get/one', (req, res) => {
        conn((err, db, mongo) => {
            if(err){ return console.log(err)}
            const { postId } = req.body
            const field = { _id : mongo.ObjectId(postId)}
            db.collection('posts')
            .find(field)
            .toArray()
            .then(results => {
                const response = {
                    post : results[0]
                }
                res.json(JSON.stringify(response))
            })
        })
    })
    
    posts.post('/get/main', (req, res) => {
        //1) followings 검색
        //2) followings 에 해당 posts 검색
        //3) posts 해당 users profilePhoto 검색 && 좋아요 여부 셋팅
        
        conn((err, db, mongo) => {
            //err 컨트롤 필요
            //followings 검색
            const { nick } = req.session.passport.user
            const query = { nick }
            db.collection('users').find(query)
            .toArray()
            .then(results => {
                return results[0].followings
            })
            .then(followings => {
                //followings 해당 posts 검색
                const postsCurrentIdList = req.body.postsCurrentIdList
                const postsCurrentObjectIdList = postsCurrentIdList.map((id) => {
                    return mongo.ObjectId(id)
                })     
                const condition = [
                    { _id : { $nin: postsCurrentObjectIdList } },
                    { nick : { $in : followings } }
                ]
                const query = { $and: condition }
                return db.collection('posts')
                .find(query)
                .limit(1)
                .sort({'date' : -1})
                .toArray()
            })
            .then(posts => {
                //posts 해당 user profilePhoto 검색
                const postsNicks = posts.map((post) => {
                    return post.nick
                })
                const query = { nick : { $in : postsNicks} }
                db.collection('users')
                .find(query)
                .toArray()
                .then(users => {
                    const usersProfilePhotoUrl = users.reduce((result, user) => {
                        result[user.nick] = user.profilePhotoUrl
                        return result
                    }, {})
                    const postsAddedProfilePhotoUrl = posts.map((post) => {
                        post.profilePhotoUrl = usersProfilePhotoUrl[post.nick]
                        return post
                    })
                    const response = {
                        posts : postsAddedProfilePhotoUrl
                    }
                    res.json(JSON.stringify(response))
                })
            })
        })
    })

    posts.post('/get/compass', (req, res) => {
        console.log('df')
    })

    posts.post('/save', (req, res) => {
        console.log('저장을 왜 안해?')
        conn((err, db, mongo) => {
            if(err){
                console.log(err)
            } else {
                const postId = req.body.postId
                const postObjectId = mongo.ObjectId(postId)
                const nick = req.session.passport.user.nick
                
                const field = { _id : postObjectId }
                const query = { $addToSet: { flags : nick }}
                db.collection('posts').update(field, query)
            }
        })
    })

    posts.post('/delete', (req, res) => {
        conn((err, db, mongo) => {
            if(err){
                console.log(err)
            } else {
                const postId = req.body.postId
                const postObjectId = mongo.ObjectId(postId)
                const nick = req.session.passport.user.nick
                
                const field = { _id : postObjectId }
                const query = { $pull: { flags : nick }}
                db.collection('posts').update(field, query)
            }
        })
    })

    posts.post('/all', (req, res) => {
        const postIds = req.body.postIds
        conn((err, db, mongo) => {
            if(err){ return console.log(err) }
            const postsCurrentObjectIdList = postIds.map((id) => {
                return mongo.ObjectId(id)
            })
            const field = { _id : { $nin: postsCurrentObjectIdList } }
            db.collection('posts')
            .find(field)
            .limit(3)
            .sort({ likes : 1 })
            .toArray()
            .then(results => {
                const response = {
                    posts : results
                }
                res.json(JSON.stringify(response))
            })   
        })
    })

    return posts
}