module.exports = (express, conn, path) => {
    const posts = express.Router()

    post => posts/write
    post => posts/get/main
    post => posts/get/compass
    post => posts/write/comment

    const upload = require(path.join(__rootDir, '/server/middlewares/upload.js'))
	posts.post('/write', upload.postFile.array('postFiles'), (req, res) => {
        const { id, nick } = req.session.user
        const contents = req.body.contents
        const user_input_textarea = req.body.user_input_textarea
        let hashtags = typeof req.body.hashtags === 'string' ? [req.body.hashtags] : req.body.hashtags
        const isoDate = new Date().toISOString()
        const post = {
            id,
            nick,
            contents,
            description : user_input_textarea,
            hashtags : [...hashtags],
            comments : [],
            likes : [],
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
    
    posts.post('/get/main', (req, res) => {
        //1) followings 검색
        //2) followings 에 해당 posts 검색
        //3) posts 해당 users profilePhoto 검색 && 좋아요 여부 셋팅
        
        conn((err, db, mongo) => {
            //err 컨트롤 필요
            //followings 검색
            const nick = req.session.passport.user.nick
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
        conn((err, db, mongo) => {
            if(err){
                console.log(err)
            } else {
                const postId = req.body.postId
                const nick = req.session.user.nick
                
                const field = { nick }
                const query = { $addToSet: { flags : postId }}
                db.collection('users').update(field, query)
            }
        })
    })

    return posts
}