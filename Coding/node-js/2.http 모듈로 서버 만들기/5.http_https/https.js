const https = require("https")
const fs = require("fs")

// HTTPS 서버를 만들기 위해서는 인증서가 필요하다.
// 인증서는 유료로 구매하거나, 무료로 발급받을 수 있다.
// 무료로 발급받는 방법은 Let's Encrypt를 이용해 무료로 SSL 인증서를 발급해주는 서비스이다.
// 인증서를 발급받으면, 인증서 파일과 비밀키 파일을 받게 된다.
// 이 파일들을 서버에 저장하고, 서버를 실행할 때 이 파일들을 읽어서
// HTTPS 서버를 만들 수 있다.
// 인증서 파일은 .crt 확장자를 가지고, 비밀키 파일은 .key 확장자를 가진다.
https
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
