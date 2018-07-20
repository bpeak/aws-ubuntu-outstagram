module.exports = (express, conn) => {
    const join = express.Router()
    
    const path = require('path')
    const encryption = require(path.join(__rootDir, '/server/modules/encryption.js'))

    join.post('/', (req, res) => {
        const { 
            user_input_id,
            user_input_name,
            user_input_nick,
            user_input_pw
        } = req.body
        conn((err, db, mongo) => {
            if(err){
                console.log(err)
            } else {
                //id, nick 중복여부 재확인
                let field = { $or : [{ id : user_input_id }, { nick : user_input_nick }]}
                db.collection('users')
                .find(field)
                .toArray()
                .then(users => {
                    if(users.length === 0){
                        console.log('미존재')
                        encryption.getPwSet(user_input_pw, (pwSet) => {
                            const user = {
                                id : user_input_id,
                                nick : user_input_nick,
                                name : user_input_name,
                                salt : pwSet.salt,
                                key : pwSet.key,
                                followings : ['admin'],
                                followers : [],  ///여기 고치면되 이제 팔로우테스트 하면덴다
                                flaged : [],
                                recentNews : []
                            }
                            db.collection('users').insert(user)
                            .then(() => {
                                const user = {
                                    id : user_input_id,
                                    nick : user_input_nick,
                                    name : user_input_name,
                                    profilePhotoUrl : null
                                }
                                req.session.passport = {
                                    user
                                }
                                const response = {
                                    isSuccess : true,
                                    user
                                }
                                res.json(JSON.stringify(response)) 
                                const field3 = { nick : 'admin' }
                                const query3 = { $addToSet: { followers : user_input_nick }}
                                db.collection('users')
                                .update(field3, query3)
                                const query4 = { $addToSet: { followings : user_input_nick }}
                                db.collection('users')
                                .update(field3, query4)
                                
                                    const field0 = { nick : user_input_nick }
                                    const newNews = {
                                        nick : 'admin',
                                        type : 'follow',
                                        date : new Date().toISOString()
                                    }
                                    const query0 = { $push : { recentNews : newNews }}
                                    db.collection('users')
                                    .update(field0, query0)
                                
                            })                
                        })
                    } else {
                        console.log('존재')
                    }
                })
            }
        })
    })

    return join
}