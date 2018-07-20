const path = require('path')
const encryption = require(path.join(__rootDir, '/server/modules/encryption.js'))

module.exports = (express, conn, path) => {
    const profile = express.Router()

    const upload = require(path.join(__rootDir, '/server/middlewares/upload.js'))
    
    profile.post('/photo', upload.profilePhoto.single('profilePhoto'), (req, res) => {
        const profilePhotoUrl = req.body.profilePhotoUrl
        //db update
        conn((err, db) => {
            const field = { nick : req.session.passport.user.nick }
            const query = { $set : { profilePhotoUrl }}
            db.collection('users').update(field, query)
        })
        //client update
        const response = {
            profilePhotoUrl
        }
        res.json(JSON.stringify(response))
    })

    profile.post('/edit', (req, res) => {
        const nick_new = req.body.nick
        const name_new = req.body.name

        conn((err, db, mongo) => {
            if(err){ return console.log(err)}
            
            const field = { nick : req.session.passport.user.nick }
            const query = { $set : { name : name_new }}
            db.collection('users')
            .update(field, query)
            .then(results => {
                const response = {
                    isSuccess : true,
                    name : name_new
                }
                res.json(JSON.stringify(response))
            })
        })
    })

    profile.post('/changePw', (req, res) => {
        const { pw, pw_new }  = req.body
        conn((err, db, mongo) => {
            if(err){ return console.log(err)}
            const field = { nick : req.session.passport.user.nick }
            db.collection('users')
            .find(field)
            .toArray()
            .then(results => {
                const user = results[0]
                const db_salt = user.salt
                const db_key = user.key
                encryption.getKey(pw, db_salt, (key) => {
                    if(key === db_key){
                        //비번일치 => 변경
                        encryption.getPwSet(pw_new, (pwSet) => {
                            const salt_new = pwSet.salt
                            const key_new = pwSet.key
                            
                            const field = { nick : req.session.passport.user.nick }
                            const query = { $set : {
                                salt : salt_new,
                                key : key_new
                            }}
                            db.collection('users')
                            .update(field, query)
                            .then(results => {
                                const response = {
                                    isSuccess : true
                                }
                                res.json(JSON.stringify(response))
                            })
                        })
                    } else {
                        const response = {
                            isSuccess : false,
                            errorMsg : '이전 비밀번호가 잘못 입력되었습니다. 다시 입력해주세요.'
                        }
                        res.json(JSON.stringify(response))
                    }
                })
            })
        })
    })

    return profile
}