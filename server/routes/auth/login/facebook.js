module.exports = (express, conn) => {
    const facebook = express.Router()

    facebook.post('/', (req, res) => {
        console.log('/auth/login/facebook')
    })

    return facebook
}