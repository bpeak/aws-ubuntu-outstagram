module.exports = (express, conn) => {
    const check = express.Router()

    check.get('/id/:id', (req, res) => {
        conn((err, db, mongo) => {
            if(err){
                console.log(err)
            } else {
                const id = req.params.id
                const field = { id }
                db.collection('users')
                .find()
                .toArray()
                .then(results => {
                    let isAvailable
                    if(results.length === 0){
                        isAvailable = true
                    } else {
                        isAvailable = true
                    }
                    const response = {
                        isAvailable
                    }
                    res.json(JSON.stringify(response))
                })
            }
        })
    })

    check.get('/nick/:nick', (req, res) => {
        console.log(req.params.nick, '검사')
        conn((err, db, mongo) => {
            if(err){
                console.log(err)
            } else {
                const nick = req.params.nick
                const field = { nick }
                db.collection('users')
                .find(field)
                .toArray()
                .then(results => {
                    let isAvailable
                    if(results.length === 0){
                        isAvailable = true
                    } else {
                        isAvailable = false
                    }
                    const response = {
                        isAvailable
                    }
                    res.json(JSON.stringify(response))
                })
            }
        })
    })

    return check
}