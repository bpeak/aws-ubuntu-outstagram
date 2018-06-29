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
                                followings : ['bpeak', 'kihyun'],
                                followers : []
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