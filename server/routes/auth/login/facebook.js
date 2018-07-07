module.exports = (express, conn) => {
    const facebook = express.Router()

    const passport = require('passport')

    facebook.get('/', passport.authenticate('facebook-login', {
        authType: 'rerequest'
    }))
    facebook.get('/callback', passport.authenticate('facebook-login', {
        successRedirect : '/socialLogin',
        failureRedirect: '/' 
    }), (req, res) => {
        console.log('응')
        console.log(req.user)
        res.redirect('/ffd');
    });
    facebook.get('/info', (req, res) => {
        console.log('여기 들어오긴하냐 ?')
        setTimeout(() => {
            console.log(req.session.passport)
            res.json(JSON.stringify(req.session.passport.user))
        }, 3000)      
    })

    return facebook
}