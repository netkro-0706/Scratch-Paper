const express = require("express")
const path = require("path")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const app = express()

// 값 설정 ==================
app.set("port", process.env.PORT || 3000)

// 미들웨어 설정 =============
app.use(morgan("dev"))
app.use(cookieParser("Kpassword"))
app.use(express.json()) // JSON 데이터 파싱
app.use(express.urlencoded({ extended: true })) // URL 인코딩된 데이터 파싱

// 경로 설정 ===================
app.get("/", (req, res, next) => {
  req.cookies
  req.signedCookies // 서명된 쿠키
  // 쿠키 설정
  // "Set-Cookie": `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
  res.cookie("name", encodeURIComponent(name), {
    expires: new Date(),
    httpOnly: true,
    path: "/",
  })

  // 쿠키 삭제
  res.clearCookie("name", encodeURIComponent(name), {
    httpOnly: true,
    path: "/",
  })
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
