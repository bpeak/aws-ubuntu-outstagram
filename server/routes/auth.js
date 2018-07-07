module.exports = (express, conn, path) => {
    const auth = express.Router()

    const encryption = require(path.join(__rootDir, '/server/modules/encryption.js'))

    auth.post('/join', (req, res) => {
        const user_input_id = req.body.user_input_id
        const user_input_name = req.body.user_input_name
        const user_input_nick = req.body.user_input_nick
        const user_input_pw = req.body.user_input_pw
        conn((err, db) => {
            //check id, nick
            let query = { $or : [{ _id : user_input_id }, { nick : user_input_nick }]}
            let cursor = db.collection('users').find(query)
            cursor.toArray()
            .then(result => {
                if(result.length === 0){
                    //id && nick 미존재 ( 조인가능 )
                    encryption.getPwSet(user_input_pw, (pwSet) => {
                        const user = {
                            id : user_input_id,
                            nick : user_input_nick,
                            name : user_input_name,
                            salt : pwSet.salt,
                            key : pwSet.key,
                            followings : ['wlgud'],
                            followers : ['rlgus', 'kihyun']
                        }
                        conn((err, db) => {
                            db.collection('users').insert(user)
                            .then(result => {
                                if(result.result.ok === 1){
                                    //insert success => session 발급
                                    const user = {
                                        id : user_input_id,
                                        nick : user_input_nick,
                                        name : user_input_name
                                    }
                                    req.session.user = user
                                    const response = {
                                        isSuccess : true,
                                        user
                                    }
                                    res.json(JSON.stringify(response))
                                }
                            })
                        })
                    })
                } else {
                    console.log('아이디 or 닉 이미 존재한다고 답해줘야함')
                }
            })
        })
    })

    auth.post('/join/id', (req, res) => {
        const user_input_id = req.body.user_input_id
        conn((err, db) => {
            let query = {id : user_input_id}
            let cursor = db.collection('users').find(query)
            let result = cursor.toArray()
            .then(result => {
                let response
                if(result.length === 0){
                    //id 존재 X
                    response = {
                        isAvailable : true
                    }
                    res.json(JSON.stringify(response))
                } else {
                    //id 존재 O
                    response = {
                        isAvailable : false
                    }
                    res.json(JSON.stringify(response))                    
                }
            })
        })
    })
    auth.post('/join/nick', (req, res) => {
        const user_input_nick = req.body.user_input_nick
        conn((err, db) => {
            let query = { nick : user_input_nick }
            let cursor = db.collection('users').find(query)
            cursor.toArray()
            .then(result => {
                let response
                if(result.length === 0){
                    //nick 존재X
                    response = {
                        isAvailable : true
                    }
                } else {
                    //nick 존재O
                    response = {
                        isAvailable : false
                    }
                }
                res.json(JSON.stringify(response))
            })
        })
    })

    auth.post('/login', (req, res) => {
        const user_input_id = req.body.user_input_id
        const user_input_pw = req.body.user_input_pw
        conn((err, db) => {
            //checkid
            let query = { id : user_input_id }
            let cursor = db.collection('users').find(query)
            cursor.toArray()
            .then(result => {
                if(result.length === 0){
                    //id 미존재
                    const response = {
                        isSuccess : false,
                        errorMsg : '입력한 사용자 이름을 사용하는 계정을 찾을 수 없습니다. 사용자 이름을 확인하고 다시 시도하세요.'
                    }
                    res.json(JSON.stringify(response))
                } else {
                    //id 존재
                    encryption.getKey(user_input_pw, result[0].salt, (key) => {
                        let response
                        if(key === result[0].key){
                            //key 일치 => 성공
                            //session 발급
                            const user = {
                                id : result[0].id,
                                name : result[0].name,
                                nick : result[0].nick                          
                            }
                            req.session.user = user
                            response = {
                                isSuccess : true,
                                user : {
                                    ...user,
                                    profilePhotoUrl : result[0].profilePhotoUrl
                                }
                            }
                        } else {
                            //key 불일치 => 실패
                            response = {
                                isSuccess : false,
                                errorMsg : '잘못된 비밀번호입니다. 다시 확인하세요.'
                            }
                        }
                        res.json(JSON.stringify(response))
                    })
                }
            })
        })
    })
    return auth
}
