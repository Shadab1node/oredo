const multer = require('multer')
const path = require('path')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/image')
    },
    filename: function (req, file, cb) {
        cb(null, 'image' + '-' + Date.now() + path.extname(file.originalname))
    }
})

module.exports = {
    upload_image:multer({ storage: storage })
}