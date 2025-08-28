const dotenv = require("dotenv")
const express = require("express")
const path = require("path")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const app = express()

dotenv.config() // .env 파일의 내용을 process.env에 넣어준다.
const indexRouter = require("./routes")
const userRouter = require("./routes/user")
const helloRouter = require("./routes/hello")

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

// 경로 설정 ===================
app.use("/", indexRouter)
app.use("/user", userRouter)
app.use("/hello", helloRouter)

app.post("/", (req, res) => {
  res.send("Hello express post")
})

app.get("/about", (req, res) => {
  res.send("About express")
})

app.listen(app.get("port"), () => {
  console.log(`http://localhost:${app.get("port")}`)
})
