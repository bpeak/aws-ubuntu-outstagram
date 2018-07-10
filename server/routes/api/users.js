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
                .find(query)
                .toArray()
                .then(results => results[0])
                .then(user => {
                    console.log(nick)
                    const query = { nick }
                    db.collection('posts')
                    .find(query)
                    .sort({'date' : -1})
                    .toArray()
                    .then(posts => {
                        console.log(posts)
                        const classifiedUser = {
                            nick : user.nick,
                            name : user.name,
                            profilePhotoUrl : user.profilePhotoUrl,
                            followings : user.followings,
                            followers : user.followers,
                            savedPosts : user.flaged,
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

    users.get('/recommend/list', (req, res) => {
        let exceptNicks = []
        const recommendedUserNicks = {
            followMe : [],
            followingOfFollowing : []
        }

        conn((err, db, mongo) => {
            const field = { nick : req.session.passport.user.nick }
            db.collection('users')
            .find(field)
            .toArray()
            .then(results => {
                exceptNicks.push(results[0].nick)
                exceptNicks = [...exceptNicks, ...results[0].followings]
                const followers = results[0].followers
                for(let i = 0; i < followers.length; i++){
                    if(exceptNicks.indexOf(followers[i]) === -1){
                        exceptNicks.push(followers[i])
                        recommendedUserNicks['followMe'].push(followers[i])
                        continue
                    } else {
                        continue
                    }
                }

                
                const field = { nick : { $in : results[0].followings }}
                return db.collection('users')
                .find(field)
                .toArray()
            })
            .then(users => {
                for(let i = 0; i < users.length; i++){
                    for(let j = 0; j < users[i].followings.length; j++){
                        if(exceptNicks.indexOf(users[i].followings[j]) === -1){
                            exceptNicks.push(users[i].followings[j])
                            recommendedUserNicks['followingOfFollowing'].push(users[i].followings[j])
                            continue
                        } else {
                            continue
                        }
                    }
                }

                const allUsers = [...recommendedUserNicks['followMe'], ...recommendedUserNicks['followingOfFollowing']]
                const field = { nick : { $in : allUsers}}
                db.collection('users')
                .find(field)
                .toArray()
                .then(users => {
                    for(let i = 0; i < users.length; i++){
                        const recommendedUsers = []
                        if(recommendedUserNicks['followMe'].indexOf(users[i].nick) !== -1){
                            users[i]['recommendedReason'] = '회원님을 팔로우중입니다'
                        } else {
                            users[i]['recommendedReason'] = '알수도 있는 사람'
                        }
                    }
                    const dummy = {
                        nick : 'dummy11',
                        id : 'dummny111',
                        name : 'dummny111',
                    }
                    const dummy1 = {
                        nick : 'dummy222',
                        id : 'dummny222',
                        name : 'dummny222',
                    }
                    const dummy2 = {
                        nick : 'dummy33',
                        id : 'dummny333',
                        name : 'dummny333',
                    }
                    const dummy3 = {
                        nick : 'dummyENd',
                        id : 'dummnyENd',
                        name : 'dummnyENd',
                    }
                    const dummy4 = {
                        nick : 'dummyENdRead',
                        id : 'dummnyENdREal',
                        name : 'dummnyENdREal',
                    }
                    users.push(dummy)
                    users.push(dummy1)
                    users.push(dummy2)
                    users.push(dummy3)
                    users.push(dummy4)
                    const response = {
                        users
                    }
                    res.json(JSON.stringify(response))
                })
            })
        })
    })

    users.get('/post/flaged', (req, res) => {
        conn((err, db, mongo) => {
            console.log('ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ드러옴')
            if(err){ return console.log(err) }
            const nick = req.session.passport.user.nick
            console.log(nick)
            const field = { flags : nick }
            db.collection('posts')
            .find(field)
            .toArray()
            .then(posts => {
                const response = {
                    posts
                }
                res.json(JSON.stringify(response))
            })
        })
    })

    users.post('/add/follow', (req, res) => {
        const myNick = req.session.passport.user.nick
        const followNick = req.body.followNick
        
        //나
        conn((err, db, mongo) => {
            const field = { nick : myNick }
            const query = { $addToSet : { followings : followNick }}
            db.collection('users')
            .update(field, query)
            .then(results => {
                if(results.result.ok === 1){
                    const response = {
                        isSuccess : true
                    }
                    res.json(JSON.stringify(response))
                }
            })
        })
        //상대
        conn((err, db, mongo) => {
            if(err){return console.log(err)}
            const field = { nick : followNick }
            const newNews = {
                nick : req.session.passport.user.nick,
                type : 'follow',
                date : new Date().toISOString()
            }
            const query1 = { $addToSet : { followers : myNick }}
            db.collection('users')
            .update(field, query1)
            const query2 = { $push : { recentNews : newNews }}
            db.collection('users')
            .update(field, query2)
        })
    })

    users.post('/remove/follow', (req, res) => {
        console.log('여기 들어와지냐?')
        const myNick = req.session.passport.user.nick
        const unFollowNick = req.body.unFollowNick
        
        //나
        conn((err, db, mongo) => {
            const field = { nick : myNick }
            const query = { $pull : { followings : unFollowNick }}
            db.collection('users')
            .update(field, query)
            .then(results => {
                if(results.result.ok === 1){
                    const response = {
                        isSuccess : true
                    }
                    res.json(JSON.stringify(response))
                }
            })
        })

        //상대
        conn((err, db, mongo) => {
            const field = { nick : unFollowNick }
            const query1 = { $pull : { followers : myNick }}
            db.collection('users')
            .update(field, query1)

            const query2 = { $pull : { recentNews : { $and : [
                { nick : myNick },
                { type : 'follow' }
            ]}}}
            db.collection('users')
            .update(field, query2)
        })

    })    

    return users
}


// const field = { nick : req.session.passport.user.nick}
// db.collection('users')
// .find(field)
// .toArray()
// .then(me => {
//     return me[0].followings
// })
// .then(followings => {
//     const field = { nick : { $in : followings }}
//     return db.collection('users')
//     .find(field)
//     .toArray()
// })
// .then(users => {
//     const followingsfollowings = []
//     for(let i = 0; i < users.length; i++){
//         for(let j = 0; j < users[i].followings.length; j++){
//             if(followingsfollowings.indexOf(users[i].followings[j]) == -1){
//                 followingsfollowings.push(users[i].followings[j])
//                 continue
//             } else {
//                 continue
//             }
//         }
//     }
//     return followingsfollowings
// })
// .then(usersArr => {
//     const field = { followings : req.session.passport.user.nick }
//     db.collection('users')
//     .find(field)
//     .toArray()
//     .then(users => {
//         for(let i = 0; i < users.length; i++){
//             if(usersArr.indexOf(users[i].nick) === -1){
//                 usersArr.push(users[i].nick)
//             } else {
//                 continue
//             }
//         }
//     })
// })