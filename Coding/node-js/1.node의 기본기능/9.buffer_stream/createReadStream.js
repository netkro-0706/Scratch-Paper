const fs = require("fs")
// createReadStream은 64kb씩 읽어온다. 그러므로 현재 학습환경에서는 읽어오는 크기를 더 적게 설정 할 필요가 있다.
const readStream = fs.createReadStream("./readme.txt", { highWaterMark: 16 })

const data = []
readStream.on("data", (chunk) => {
  data.push(chunk)
  console.log("data:", chunk, chunk.length)
})

readStream.on("end", () => {
  console.log("end:", Buffer.concat(data).toString())
})

// 비동기 처리이기 떄문에 에러처리를 해주는 편이 좋다.
readStream.on("error", (err) => {
  console.error("error:", err)
})
