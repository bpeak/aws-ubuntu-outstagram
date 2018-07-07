module.exports = (express, conn) => {
    const kakao = express.Router()

    const passport = require('passport')

    kakao.get('/', passport.authenticate('kakao-login'))
    kakao.get('/callback', passport.authenticate('kakao-login',{
        successRedirect : '/socialLogin/kakao',
        failureRedirect : '/fail'
    }));
    kakao.get('/info', (req, res) => {
        console.log('유저 기존 가입여부 체크 후에 db에서 카톡true 부분의 아이디만 체크')
        const response = {
            user : req.session.passport.user
        }
        res.json(JSON.stringify(response))
    })

    return kakao
}