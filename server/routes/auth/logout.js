module.exports = (express, conn) => {
    const logout = express.Router()
    
    logout.get('/', (req, res) => {
        req.session.passport = undefined
        res.sendStatus(200)
    })

    return logout
}