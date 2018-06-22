const multer = require('multer')

const upload = {}

upload.profilePhoto = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const _id = req.session._id;
            checkUserDir(_id)
            .then(() => {
                cb(null, __dirname + '/uploads/' + _id)
            })
        },
        filename: function (req, file, cb) {
            const _id = req.session._id;
            // const date = Number(new Date())
            // const fileName = _id + date + file.originalname
            const ext = path.extname(file.originalname).toLowerCase()
            if(
                ext == ".jpeg" ||
                ext == ".jpg" ||
                ext == ".png" ||
                ext == ".svg" 
            ){
                conn((err, db) => {
                    const filed = { _id : _id }

                    const profilePhotoUrl = `/uploads/${_id}/profile${ext}`
                    const query = { $set : { profilePhotoUrl : profilePhotoUrl }}
                    db.collection('users').update(filed, query)
                    .then(result => {
                        if(result.result.ok === 1){
                            req.session.profilePhotoUrl = profilePhotoUrl
                            cb(null, "profile" + ext);
                        }
                    })
                })
            } else {
                //done
            }
        }
    }),
});