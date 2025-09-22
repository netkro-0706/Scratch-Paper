const express = require("express")
const router = express.Router()
const { isLoggedIn, isNotLoggedIn } = require("../middlewares")
const fs = require("fs")
const multer = require("multer")
const path = require("path")
const { afterUploadImage, uploadPost } = require("../controllers/post")

try {
  fs.readdirSync("uploads")
} catch (error) {
  fs.mkdirSync("uploads")
}

// img올리는 upload
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/")
    },
    filename(req, file, cb) {
      console.log(file)
      // 확장자 추출
      const ext = path.extname(file.originalname) // 이미지.png -> 이미지123123.png 파일명의 중복방지
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext)
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
})

router.post("/img", isLoggedIn, upload.single("img"), afterUploadImage)

// 게시글 올리는 upload
const upload2 = multer()
router.post("/", isLoggedIn, upload2.none(), uploadPost)

module.exports = router
