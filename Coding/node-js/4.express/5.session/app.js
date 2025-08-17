const express = require("express")
const path = require("path")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const app = express()

// 값 설정 ==================
app.set("port", process.env.PORT || 3000)

// 미들웨어 설정 =============
app.use(morgan("dev"))
app.use(cookieParser("Kpassword"))
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "Kpassword",
    cookie: {
      httpOnly: true,
    },
    name: "connect.sid",
  })
)
// 미들웨어 확장법
app.use("/", (req, res, next) => {
  if (req.session.id) {
    express.static(path.join(__dirname, "public"))(req, res, next)
  } else {
    next()
  }
})
app.use(express.json()) // JSON 데이터 파싱
app.use(express.urlencoded({ extended: true })) // URL 인코딩된 데이터 파싱

// 경로 설정 ===================
app.get("/", (req, res, next) => {
  req.session.id = "hello"

  res.send("Hello express")
})

app.get("/", (req, res) => {
  console.log("두번째 라우터")
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
