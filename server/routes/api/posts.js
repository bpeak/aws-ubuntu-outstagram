module.exports = (express, conn, path) => {
    const posts = express.Router()

    //modules
    const connPromise = require(path.join(__rootDir, '/server/modules/conn.js'))
    //현재 conn 과 connPromise 분리되어있는데
    //conn 을 함수객체로만들어서 conn 호출시는 그대로하고
    //conn.promise호출시는 이거튀어나오게하자면 되겟다.    

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
    
    posts.post('/main', (req, res) => {
        //1) followings 검색
        //2) followings 에 해당 posts 검색
        //3) posts 해당 users profilePhoto 검색 && 좋아요 여부 셋팅
        
        connPromise((err, db, mongo) => {
            //err 컨트롤 필요
            //followings 검색
            const nick = req.session.user.nick
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

    posts.delete('/like/:id', (req, res) => {
        const currentPostId = req.params.postId
        conn((err, db, mongo) => {
            const currentPostObjectId = mongo.ObjectId(currentPostId)
            const query = { $and : [{ currentPostObjectId }, { likes : 'kihyun' }]}
            const cursor = db.collection('posts').find(query)
            cursor.toArray()
            .then(results => {
                if(results.length === 0){
                    //해당포스트 좋아요목록에 해당유저 nick 존재X
                    //done
                } else {
                    console.log('잇음 삭제해')
                }
            })
        })
    })

    posts.put('/like/:postId', (req, res) => {
        conn((err, db, mongo) => {
            const postObjectId = mongo.ObjectId(req.params.postId)
            const nick = req.session.user.nick
            const query = { $and : [{ _id : postObjectId }, { likes : 'wdsfjdsafjksdfajkdfsk' }]}
            const cursor = db.collection('posts').find(query)
            cursor.toArray()
            .then(results => {
                    //해당포스트 좋아요목록에 해당유저 nick
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
    
    posts.post('/comment', (req, res) => {
        conn((err, db, mongo) => {
            if(err){
                console.log(err)
            } else {
                const postObjectId = mongo.ObjectId(req.body.postId)
                const content = req.body.user_input_postComment
                const nick = req.session.user.nick
                const isoDate = new Date().toISOString()
                const comment = {
                    nick,
                    content,
                    date : isoDate
                }
                console.log(comment)            
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

    return posts
}








// posts.post('/main', (req, res) => {
//     const postsCurrentIdList = req.body.postsCurrentIdList
//     conn((err, db, mongo) => {
//         console.log('콜백함수실행')
//         const postsCurrentObjectIdList = []
//         for(let i = 0; i < postsCurrentIdList.length; i++){
//             postsCurrentObjectIdList.push(mongo.ObjectId(postsCurrentIdList[i]))
//         }
//         const query = { _id : { $nin: postsCurrentObjectIdList } }
//         const cursor = db.collection('posts').find(query).sort({'date' : -1}).limit(2)
//         cursor.toArray()
//         .then(results => {
//             const response = {}
//             if(results.length === 0){
//                 response.posts = null
//             } else {
//                 response.posts = results
//             }
//             console.log('데이터읽고나서 전송중')
//             res.json(JSON.stringify(response))
//         })
//     })
// })

// posts.post('/main', (req, res) => {
//     //내 팔로잉검색
//     connPromise((err, db, mongo) => {
//         return new Promise((resolve, reject) => {
//             const nick = req.session.user.nick
//             let query = { nick }
//             db.collection('users')
//             .find(query)
//             .toArray()
//             .then(results => {
//                 const followings = results[0].followings
//                 db.collection('users')
//                 .find(query)
//                 .toArray()
//                 .then(() => {
//                     console.log('한번더쿼리햇다')
//                 })
//                 resolve(followings)
//             })
//         })
//     })
//     .then(followings => {
//         connPromise((err, db, mongo) => {
//             return new Promise((resolve, reject) => {
//                 let query = { nick : { $in : followings }}
//                 db.collection('posts')
//                 .find(query)
//                 .sort({ date : -1 })
//                 .toArray()
//                 .then(results => {
//                     console.log(results)
//                 })
//             })
//         })
//     })
// })