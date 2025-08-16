const http2 = require("http2")
const fs = require("fs")

http2
  .createServer(
    {
      // sync를 써야하는 경우는 딱 한번만 실행하거나, 서버를 초기화 할 때
      cert: fs.readFileSync("도메인 인증서 경로"),
      key: fs.readFileSync("도메인 비밀키 경로"),
      ca: [
        fs.readFileSync("상위 인증서 경로"),
        fs.readFileSync("상위 인증서 경로"),
      ],
    },
    (req, res) => {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
      res.write("<h1>HTTPS 서버입니다!</h1>")
      res.end("<p>HTTPS 서버로 접속하셨습니다.</p>")
    }
  )
  // HTTPS 서버는 443 포트에서 실행하는 것이 일반적이다.
  .listen(443, () => {
    console.log("https://localhost:443 번 포트에서 서버 대기 중입니다!")
  })
