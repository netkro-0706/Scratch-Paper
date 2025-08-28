const dotenv = require("dotenv")
const express = require("express")
const path = require("path")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const app = express()

dotenv.config() // .env 파일의 내용을 process.env에 넣어준다.

// 값 설정 ==================
app.set("port", process.env.PORT || 3000)

// 미들웨어 설정 =============
app.use(morgan("dev"))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      httpOnly: true,
    },
    name: "connect.sid",
  })
)
app.use(express.json()) // JSON 데이터 파싱
app.use(express.urlencoded({ extended: true })) // URL 인코딩된 데이터 파싱

const multer = require("multer")
const fs = require("fs")

// uploads 폴더가 없으면 생성
// multer를 사용하기 전에 uploads 폴더가 존재하는지 확인하고, 없으면 생성.
try {
  fs.readdirSync("uploads")
} catch (error) {
  console.log("uploads 폴더가 없어 uploads 폴더를 생성합니다.")
  fs.mkdirSync("uploads")
}

// multer 설정 =================
// 만들어진 객체는 라우터에 장착하여 사용한다.
const upload = multer({
  storage: multer.diskStorage({
    // 파일 저장 위치와 파일 이름 설정
    destination(req, file, done) {
      done(null, "uploads/")
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname)
      done(null, path.basename(file.originalname, ext) + "-" + Date.now() + ext)
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  }),
})

// 경로 설정 ===================
app.get("/", (req, res, next) => {
  req.session.id = "hello"

  res.send("Hello express")
})

app.get("/upload", (req, res) => {
  res.sendFile(path.join(__dirname, "multer.html"))
})

// single은 파일을 하나만 업로드 할 때
// "image"는 HTML에서 지정한 name 속성 값 - 일치해야한다.
// 2개 이상의 경우에는 upload.array("image", 2)와 같이 사용
app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file) // 업로드된 파일 정보
  res.send("파일 업로드 완료")
})

app.get("/hello", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"))
})

app.post("/", (req, res) => {
  res.send("Hello express post")
})

app.get("/about", (req, res) => {
  res.send("About express")
})

app.listen(app.get("port"), () => {
  console.log(`http://localhost:${app.get("port")}`)
})
