const http = require("http")

http
  .createServer((req, res) => {
    console.log(req.url, req.headers.cookie)
    res.writeHead(200, { "Set-cookie": "mycookie=test" })
    res.end("Hello Cooke")
  })
  .listen(8083, () => {
    console.log("http://localhost:8083 에서 서버 대기중")
  })
