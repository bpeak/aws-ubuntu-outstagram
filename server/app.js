const express = require('express');
const app = express();

//module
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const mongo = require('./modules/mongo.js')
const conn = mongo()
const encryption = require('./modules/encryption.js')
const multer = require('multer');
const cookieParser = require('cookie-parser')
const session = require('express-session')

const auth = require('./routes/auth.js')(express, conn)

const checkUserDir = (_id) => {
    return new Promise((resolve, reject) => {
        if(fs.existsSync('./server/uploads/' + _id) === true){
            return resolve()
        } else {
            fs.mkdir('./server/uploads/' + _id, (err) => {
                if (err) {
                    return reject(new Error('err'))
                }
                return resolve()
            });
        }
    })
}

const uploadProfilePhoto = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
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

//middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
  secret: '@!@$$%&$@$TFGHJGJ&^%U$T',
  resave: false, //변경사항없을시에도 언제나 재저장여부 => 권장값 false
  saveUninitialized: true,
  cookie: {
    maxAge: ( 1000 * 60 * 60 ) * 12
  }
}))
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use('/public', express.static(path.join(__dirname, '../react/public')));
//routes
app.use('/auth', auth)

app.use(['/profile', '/ex여기도거처가고'], (req, res, next) => {
    if(req.session && req.session._id){
        //로긴O
        next()
    } else {
        //로긴X 세션만료
        const response = {
            redirect : true
        }
        res.json(JSON.stringify(response))
    }
})

app.post('/profile/photo', uploadProfilePhoto.single('profilePhoto'), (req, res) => {
    const response = {
        profilePhotoUrl : req.session.profilePhotoUrl
    }
    res.json(JSON.stringify(response))
})

app.get('/*', (req, res) => {
    console.log(req.session._id)
    console.log(req.session.name)
    console.log(req.session.nick)
    res.sendFile(path.join(__dirname, '../react/public/index.html'))
})

const PORT = 80;
app.listen(PORT, () => {
    console.log(`PORT ${PORT} CONNECTED`)
})