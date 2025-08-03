const http = require("http")

// 비동기로 돌아간다.
const server = http
  .createServer((req, res) => {
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
