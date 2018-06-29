module.exports = (express, conn) => {
    const kakao = express.Router()

    kakao.post('/', (req, res) => {
        console.log('/auth/login/kakao')
    })

    return kakao
}