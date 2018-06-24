module.exports = (express, conn, path) => {
    const profile = express.Router()

    const upload = require(path.join(__rootDir, '/server/middlewares/upload.js'))
    
    profile.post('/photo', upload.profilePhoto.single('profilePhoto'), (req, res) => {
        const profilePhotoUrl = req.body.profilePhotoUrl
        //db update
        conn((err, db) => {
            const field = { id : req.session.user.id }
            const query = { $set : { profilePhotoUrl }}
            db.collection('users').update(field, query)
            .then(result => console.log(result))
        })
        //client update
        const response = {
            profilePhotoUrl
        }
        res.json(JSON.stringify(response))
    })
    return profile
}