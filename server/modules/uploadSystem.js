const fs = require('fs')
const path = require('path')

const checkAndMakeDir = (checkPath) => {
	if(fs.existsSync(checkPath) === true){
		//done
	} else {
		fs.mkdirSync(checkPath)
	}
}

const getFileType = (fileName) => {
	const ext = path.extname(fileName).toLowerCase()
	if(
		ext === ".png" ||
		ext === ".jpg" ||
		ext === ".svg"
	) {
		return "img"
	} else if (
		ext === ".mp4"
	) {
		return "video"
	} else {
		return false
	}
}

const uploadSystem = {
    checkAndMakeDir,
    getFileType
}

module.exports = uploadSystem