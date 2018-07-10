module.exports = (express, conn) => {
    const kakao = express.Router()

    const passport = require('passport')

    kakao.get('/', passport.authenticate('kakao-login'))
    kakao.get('/callback', (req, res) => {
        passport.authenticate('kakao-login', (err, user, info) => {
            if(user){
                req.logIn(user, (err) => {
                    if (err) { return console.log(err) }
                    res.redirect('/dothis')
                })
            } else {
                const unAuthUser = {
                    id : info.profile.id,
                    name : info.profile.username,
                    profilePhotoUrl : info.profile._json.properties.profile_image
                }
                req.session.passport = {
                    unAuthUser
                }
                res.redirect('/socialLogin/kakao')
            }
        })(req, res)
    })



    // kakao.get('/callback', passport.authenticate('kakao-login',{
    //     successRedirect : '/socialLogin/kakao',
    //     failureRedirect : '/fail'
    // }));
    kakao.get('/info', (req, res) => {
        const response = {
            user : req.session.passport.unAuthUser
        }
        res.json(JSON.stringify(response))
    })

    kakao.post('/new', (req, res) => {
        const user = {
            id : req.session.passport.unAuthUser.id,
            memberType : 'kakao',
            nick : req.body.nick,
            name : req.session.passport.unAuthUser.name,
            profilePhotoUrl : req.session.passport.unAuthUser.profilePhotoUrl,
            followings : [],
            followers : [],  ///여기 고치면되 이제 팔로우테스트 하면덴다
            flaged : [],
            recentNews : []
        }        
        conn((err, db, mongo) => {
            db.collection('users').insert(user)
            .then(results => {
                if(results.result.ok === 1){
                    const response = {
                        user : {
                            id : req.session.passport.unAuthUser.id,
                            nick : req.body.nick,
                            name : req.session.passport.unAuthUser.name,
                            profilePhotoUrl : req.session.passport.unAuthUser.profilePhotoUrl
                        }
                    }
                    req.session.passport = {
                        user
                    }
                    res.json(JSON.stringify(response))
                }
            })
        })
        
    })


    kakao.get('/dothis', (req, res) => {
        const user = req.session.passport.user
        res.json(JSON.stringify(user))
    })

    return kakao
}