module.exports = (express, conn) => {
    const local = express.Router()

    const passport = require('passport')

    local.post('/', (req, res) => {
        passport.authenticate('local-login', (err, user, info) => {
            if(err){ return console.log(err) }
            const response = {}
            if(user){
                req.logIn(user, (err) => {
                    if (err) { return console.log(err) }
                    response.isSuccess = true
                    response.user = user
                });                
            } else {
                response.isSuccess = false
                response.errorMsg = info.errorMsg
            }
            return res.json(JSON.stringify(response))
        })(req, res);        
    })

    return local
}