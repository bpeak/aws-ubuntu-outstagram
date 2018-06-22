const express = require('express');
const app = express();

const mongo = require('./server/modules/mongo.js')
const conn = mongo()

const encryption = require('./server/modules/encryption.js')

const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/public', express.static('./react/public'));

const auth = require('./server/routes/auth.js')(express, conn)
app.use('/auth', auth)


app.put('/api/login', (req, res) => {
    const user_input_id = req.body.user_input_id
    const user_input_pw = req.body.user_input_pw
    //아이디존재 => 
        //비번체크 pwSet pwSet(64, (pwSet) => {console.log(pwSet)})
            //로긴
    //아이디미존재 =>
        //...
    
    let response = {
        loginSuccess : true
    }
    let json = JSON.stringify(response)
    res.json(json)
})

const multer = require('multer');
// 기타 express 코드
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/');
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    }),
});
app.post('/test', upload.single('img'), (req, res) => {
    console.log('일단요청이오긴햇음')
    console.log(req.file)
})

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/react/public/index.html')
})

const PORT = 80;
app.listen(PORT, () => {
    console.log(`PORT ${PORT} CONNECTED`)
})