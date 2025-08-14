// zhem 301, 302는 리다이렉트이다.

const http = require("http")
const fs = require("fs").promises
const path = require("path")

const parseCookies = (cookie = "") =>
  cookie
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v)
      return acc
    }, {})

http
  .createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie) // { mycookie: 'test' }
    // 쿠키에 따른 분기처리
    // 주소가 /login으로 시작하는 경우
    if (req.url.startsWith("/login")) {
      const url = new URL(req.url, "http://localhost:8084")
      const name = url.searchParams.get("name")
      // name이 없으면 쿠키를 설정하지 않고 로그인 화면을 표시
      if (!name) {
        const data = await fs.readFile(path.join(__dirname, "cookie2.html"))
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
        res.end(data)
        return
      }
      const expires = new Date()
      // 쿠키 유효 시간을 현재시간 + 5분으로 설정
      expires.setMinutes(expires.getMinutes() + 5)
      res.writeHead(302, {
        Location: "/",
        // encodeURIComponent로 인코딩하여 쿠키 값에 특수문자가 포함되어도 안전하게 처리
        "Set-Cookie": `name=${encodeURIComponent(
          name
          // expires로 쿠키 유효 시간을 설정. 안적으면 세션 쿠키가 됨
          // HttpOnly - 로그인을 위한 쿠키는 httpOnly 속성을 주는 것이 좋다.
          // Path - 쿠키가 유효한 경로를 지정. /로 설정하면 모든 경로에서 유효
        )}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
      })
      res.end()
      // name이라는 쿠키가 있는 경우
    } else if (cookies.name) {
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" })
      res.end(`${cookies.name}님 안녕하세요`)
    } else {
      try {
        const data = await fs.readFile(path.join(__dirname, "cookie2.html"))
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
        res.end(data)
      } catch (err) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" })
        res.end(err.message)
      }
    }
  })
  .listen(8084, () => {
    console.log("8084번 포트에서 서버 대기 중입니다!")
  })
