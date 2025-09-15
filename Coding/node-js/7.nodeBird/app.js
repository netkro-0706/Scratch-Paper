const express = require("express")
const cookieParser = require("cookie-parser")
const morgan = require("morgan")
const path = require("path")
const session = require("express-session")
const dotenv = require("dotenv")
// TODO: 넌적스 대신 react, vue로 만들어보기
const nunjucks = require("nunjucks")

// process.env 설정
dotenv.config()

const pageRouter = require("./routes/page")

const app = express()
app.set("port", process.env.PORT || 8001)
app.set("view engine", "html")
app.set("views", path.join(__dirname, "views"))
nunjucks.configure(app.get("views"), {
  express: app,
  watch: true,
})

// 로깅 - 개발모드 dev, 배포후에는 combined로 변경
app.use(morgan("dev"))
// public폴더를 static폴더로 변경
app.use(express.static(path.join(__dirname, "public")))
// bodyParser json과 form을 받을 수 있게 한다.
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// cookieParser 쿠기 받을 수 있게 한다.
app.use(cookieParser(process.env.COOKIE_SECRET))

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      // 보안적으로 자바스크립트에서 접근못하게
      httpOnly: true,
      // https로 적용할 경우 true
      secure: false,
    },
  })
)

app.use("/", pageRouter)
// 404 not found
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} not found router`)
  error.status = 404
  next(error)
})
app.use((err, re, res, next) => {
  res.locals.message = err.message
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {}
  res.status(err.status || 500)
  res.render("error")
})

app.listen(app.get("port"), () => {
  console.log(`http:localhost:${app.get("port")} 번에서 대기중`)
})
