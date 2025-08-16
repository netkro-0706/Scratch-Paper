const express = require("express")
const path = require("path")
const app = express()

// 값 설정 ==================
app.set("port", process.env.PORT || 3000)

// 미들웨어 설정 =============
app.use(
  (req, res, next) => {
    console.log("모든 요청에 실행 가능")
    // next()를 호출해야 다음 미들웨어로 넘어간다.
    next()
  },
  // 여러개도 가능하다.
  (req, res, next) => {
    console.log("모든 요청에 실행 가능2")
    next()
  },
  (req, res, next) => {
    console.log("모든 요청에 실행 가능3")
    next()
  }
)

app.use("/error", (req, res, next) => {
  try {
    // 일부러 에러 발생
    console.log(errorrorororor)
  } catch (err) {
    next(err)
  }
})

// 경로 설정 ===================
app.get(
  "/",
  (req, res, next) => {
    res.send("Hello express")
    if (true) {
      next("route")
    } else {
      next()
    }
  },
  (req, res) => {
    console.log("첫번째 라우터")
  }
)

app.get("/", (req, res) => {
  console.log("두번째 라우터")
})

app.get("/error", (req, res) => {
  res.send("에러 페이지")
})

app.get("/hello", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"))
})

// 문자를 여러번 쓰고 싶을 때
app.get("/category/:name", (req, res) => {
  let message = ""

  if (req.params.name === "cat") {
    message += "cat page"
  }
  if (req.params.name === "dog") {
    message += "dog page"
  }
  message += `hello ${req.params.name}`

  res.send(message)
})

app.post("/", (req, res) => {
  res.send("Hello express post")
})

app.get("/about", (req, res) => {
  res.send("About express")
})

// 모든 경로 설정은 정규식 표현으로 설정 /.*/
app.get(/.*/, (req, res) => {
  if (req.path === "/secret") {
    return res.send("Secret page")
  }

  res.send("all page")
})

// 에러 설정 ================
// 에러 미들웨어는 반드시 요소 4개를 다 받아야 한다.
app.use((err, req, res, next) => {
  console.error(err)
  res.send("에러 발생함")
})

// 404 에러 설정 ==============
app.use((req, res, next) => {
  // 400번대와 500번대 에러는 보안상 실무에서 잘 사용하지 않는다.
  res.status(404).send("404입니다.")
})

app.listen(app.get("port"), () => {
  console.log(`http://localhost:${app.get("port")}`)
})
