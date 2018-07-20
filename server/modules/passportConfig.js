const passport = require('passport')

//strategys
const LocalStrategy = require('passport-local').Strategy
const KakaoStrategy = require('passport-kakao').Strategy
const FacebookStrategy = require('passport-facebook').Strategy

const path = require('path')
const conn = require(path.join(__rootDir, '/server/modules/conn.js'))
const encryption = require(path.join(__rootDir, '/server/modules/encryption.js'))
module.exports = () => {
    passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
        done(null, user) // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
    })

    passport.deserializeUser((user, done) => { // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
        done(null, user) // 여기의 user가 req.user가 됨
    })

    passport.use('local-login', new LocalStrategy({
        usernameField: 'id',
        passwordField: 'pw',
    }, (id, pw, done) => {
        conn((err, db, mongo) => {
            if(err){
                console.log(err)
            } else {
                const query = { id }
                db.collection('users')
                .find(query)
                .toArray()
                .then(results => {
                    if(results.length === 0){
                        //아이디 존재X
                        done(null, false, { errorMsg: '입력한 사용자 이름을 사용하는 계정을 찾을 수 없습니다. 사용자 이름을 확인하고 다시 시도하세요.' })
                    } else {
                        //아이디 존재O
                        const db_salt = results[0].salt
                        const db_key = results[0].key
                        encryption.getKey(pw, db_salt, (key) => {
                            if(key === db_key){
                                const user = {
                                    id,
                                    nick : results[0].nick,
                                    name : results[0].name,
                                    profilePhotoUrl : results[0].profilePhotoUrl
                                }
                                return done(null, user)
                            } else {
                                console.log('비번불일치')
                                return done(null, false, { errorMsg: '잘못된 비밀번호입니다. 다시 확인하세요.' })
                            }
                        })
                    }
                })
            }
        })
    }))

    passport.use('kakao-login', new KakaoStrategy({
        clientID: '5396e78d8ee5a2b0216be81bdd5e200a',
        clientSecret: 'fKh2HduI3eVkmoYF5ORLAgUyrtsCTZmt',
        callbackURL: 'http://18.182.55.45:80/auth/login/kakao/callback'
    }, (accessToken, refreshToken, profile, done) => {
        conn((err, db, mongo) => {
            const field = { $and : [{ id : profile.id }, { memberType : 'kakao' }]}
            db.collection('users')
            .find(field)
            .toArray()
            .then(results => {
                if(results.length === 1){
                    //가입멤버
                    const user = {
                        id : profile.id,
                        nick : results[0].nick,
                        name : results[0].name,
                        profilePhotoUrl : results[0].profilePhotoUrl
                    }
                    done(null, user)
                } else {
                    //미가입멤버
                    done(null, false, { profile })
                }
            })
        }) 
        // const user = {
        //     unqueId : profile.id,
        //     name : profile.username,
        //     profilePhotoUrl : profile._json.properties.profile_image
        // }
        // return done(null, user)
    }))

    passport.use('facebook-login', new FacebookStrategy({
        clientID: '1727973423984604',
        clientSecret: 'e9e488bcb5624392c89a4e41ca59e89e',
        callbackURL: '/auth/login/facebook/callback',
        passReqToCallback: true
    }, (req, accessToken, refreshToken, profile, done) => {
        // console.log('profile 찍어봄')
        // console.log(profile)
        // console.log('이거 찌것음')
        console.log(profile)
        return done(null, profile)
    }))
}