module.exports = (express) => {
    const auth = express.Router()
    const passport = require('passport')

    auth.post /login
              /login/local
              /login/kakao
              /login/facebook
    auth.post /join
    auth.post /check/nick
              /check/id


    auth.post('/local/login', (req, res, next) => {
        passport.authenticate('local-login', (err, user, info) => {
            return res.json(JSON.stringify({ a: 1 }))
        })(req, res, next)
    })

    auth.get('/kakao', passport.authenticate('kakao-login'))
    auth.get('/kakao/callback', passport.authenticate('kakao-login',{
        successRedirect : '/socialLogin/kakao',
        failureRedirect : '/fail'
    }));
    auth.get('/kakao/info', (req, res) => {
        console.log('유저 기존 가입여부 체크 후에 db에서 카톡true 부분의 아이디만 체크')
        const response = {
            user : req.session.passport.user
        }
        res.json(JSON.stringify(response))
    })

    auth.get('/facebook', passport.authenticate('facebook-login', {
        authType: 'rerequest', 
        scope: ['public_profile', 'email', 'user_photos']
    }))
    auth.get('/facebook/callback', passport.authenticate('facebook-login', {
        successRedirect : '/socialLogin',
        failureRedirect: '/' 
    }), (req, res) => {
        console.log('응')
        console.log(req.user)
        res.redirect('/ffd');
    });
    auth.get('/facebook/info', (req, res) => {
        console.log('여기 들어오긴하냐 ?')
        setTimeout(() => {
            console.log(req.session.passport)
            res.json(JSON.stringify(req.session.passport.user))
        }, 3000)      
    })

    return auth
}