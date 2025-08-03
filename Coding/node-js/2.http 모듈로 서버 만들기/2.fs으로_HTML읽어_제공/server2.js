const http = require("http")
const fs = require("fs").promises

// 비동기로 돌아간다.
const server = http
  .createServer(async (req, res) => {
    try {
      // 사파리 같은 경우 HTML인지 Text인지 모르기 때문에 명시적으로 제공해 줘야한다.
      res.writeHead(200, { "Content-type": "text/html; charset=utf-8" })
      const data = await fs.readFile("./server2.html")
      res.end(data)
    } catch (err) {
      console.error(err)
      res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" })
      res.end(err.message)
    }
  })
  .listen(8080)

server.on("listening", () => {
  console.log("8080번 포트에서 서버 대기 중")
  console.log("http://localhost:8080")
})
server.on("error", (error) => {
  console.error(error)
})
