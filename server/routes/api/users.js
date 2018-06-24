module.exports = (express, conn) => {
    const users = express.Router()

    users.get('/:nick', (req, res) => {
        const nick = req.params.nick
        conn((err, db, mongo) => {
            if(err){
                console.log(err)
            } else {
                const query = { nick }
                db.collection('users')
                .find(nick)
                .toArray()
                .then(results => results[0])
                .then(user => {
                    console.log(nick)
                    const query = { nick }
                    db.collection('posts')
                    .find(query)
                    .toArray()
                    .then(posts => {
                        console.log(posts)
                        const classifiedUser = {
                            nick : user.nick,
                            name : user.name,
                            profilePhotoUrl : user.profilePhotoUrl,
                            followings : user.followings,
                            followers : user.followers,
                            posts
                        }
                        const response = {
                            user : classifiedUser
                        }
                        res.json(JSON.stringify(response))
                    })
                })
            }
        })
    })

    return users
}