const path = require('path')

const getFileType = (fileOriginalName) => {
    const ext = path.extname(fileOriginalName).toLowerCase()
    let type
    if(
        ext === ".png" ||
        ext === ".jpg" ||
        ext === ".svg"
    ) {
        return "img"
    } else if ( ext === ".mp4"){
        return"video"
    } else {
        return false
    }
}

export default getFileType