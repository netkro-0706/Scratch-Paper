const http = require("http")

// 비동기로 돌아간다.
const server = http
  .createServer((req, res) => {
    // 사파리 같은 경우 HTML인지 Text인지 모르기 때문에 명시적으로 제공해 줘야한다.
    res.writeHead(200, { "Content-type": "text/html; charset=utf-8" })
    res.write("<h1>Hello, Node!</h1>")
    res.write("<p>Hello, Server!</p>")
    res.end("<p>Hello, End!</p>")
  })
  .listen(8080)

server.on("listening", () => {
  console.log("8080번 포트에서 서버 대기 중")
})
server.on("error", (error) => {
  console.error(error)
})

// 서버를 2개 돌리고 싶을경우
const server1 = http
  .createServer((req, res) => {
    // 사파리 같은 경우 HTML인지 Text인지 모르기 때문에 명시적으로 제공해 줘야한다.
    res.writeHead(200, { "Content-type": "text/html; charset=utf-8" })
    res.write("<h1>Hello, Node!</h1>")
    res.write("<p>Hello, Server!</p>")
    res.end("<p>Hello, End!</p>")
  })
  .listen(8080)
