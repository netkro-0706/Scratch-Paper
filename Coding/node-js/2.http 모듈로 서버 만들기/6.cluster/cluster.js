const cluster = require("cluster")
const http = require("http")
// cpu 개수만큼 생성
const numCPUs = require("os").cpus().length

if (cluster.isMaster) {
  console.log(`마스터 프로세스 아이디: ${process.pid}`)
  // CPU 개수만큼 워커를 생산
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork()
  }
  // 워커가 종료되었을 때
  cluster.on("exit", (worker, code, signal) => {
    console.log(`${worker.process.pid}번 워커가 종료되었습니다.`)
    console.log("code", code, "signal", signal)
    cluster.fork() // 워커 프로세스가 종료되면 새로운 워커를 생성
  })
} else {
  // 워커 프로세스
  http
    .createServer((req, res) => {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
      res.write("<h1>Hello, Node.js!</h1>")
      res.end("<p>Hello cluster!</p>")
      setTimeout(() => {
        // 워커의 존재를 확인하기 위해 1초 마다 종료.
        process.exit(1)
      }, 1000)
    })
    .listen(8086)

  console.log(`워커 프로세스 아이디: ${process.pid} 실행`) // 워커 프로세스 아이디 출력
}
