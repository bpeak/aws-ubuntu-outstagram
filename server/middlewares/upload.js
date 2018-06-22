const multer = require('multer')
const path = require('path')
const uploadSystem = require(path.join(__rootDir, '/server/modules/uploadSystem.js'))

const upload = {}
upload.profilePhoto = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const id = req.session.user.id
            const userDir = path.join(__rootDir, '/server/uploads/', id)
            uploadSystem.checkAndMakeDir(userDir)
            cb(null, userDir)
        },
        filename: function (req, file, cb) {
            const id = req.session.user.id
            const ext = path.extname(file.originalname).toLowerCase()
            const fileName = 'profile' + ext
            req.body.profilePhotoUrl = `/uploads/${id}/${fileName}`
            cb(null, fileName)
        }
    }),
    fileFilter : (req, file, cb) => {
        const fileType = uploadSystem.getFileType(file.originalname)
        if(fileType === false){
            cb(null, false)
        } else {
            cb(null, true)
        }
    }
});

upload.postFile = multer({
    storage : multer.diskStorage({
        destination: (req, file, cb) => {
            const id = req.session.user.id
            const fileType = uploadSystem.getFileType(file.originalname)
            const userDir = path.join(__rootDir, '/server/uploads/', id)
            const postFileDir = path.join(userDir, fileType)
            uploadSystem.checkAndMakeDir(userDir)
            uploadSystem.checkAndMakeDir(postFileDir)
            cb(null, postFileDir)
        },
        filename: (req, file, cb) => {
            const date = new Date()
            const uniqueFileName = Number(date) + file.originalname
            

            //req body 로 fileUrlForDB 값 pass
            const id = req.session.user.id
            const fileType = uploadSystem.getFileType(file.originalname)
            const fileUrlForDB = `/uploads/${id}/${fileType}/${uniqueFileName}`
            const content = {
                type : fileType,
                url : fileUrlForDB
            }
            if(req.body.contents){
                req.body.contents.push(content)
            } else {
                req.body.contents = [content]
            }
            cb(null, uniqueFileName)
        }
    }),
    fileFilter : (req, file, cb) => {
        const fileType = uploadSystem.getFileType(file.originalname)
        if(fileType === false){
            cb(null, false)
        } else {
            cb(null, true)
        }
    }
})

module.exports = upload