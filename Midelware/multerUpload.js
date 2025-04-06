const multer = require("multer")

const maxSize = 3 * 1024 * 1024; // 3MB (7,340,032 bytes)


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/tmp")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ 
  storage,
  limits: { fileSize: maxSize /* bytes */ }
 })
module.exports = upload