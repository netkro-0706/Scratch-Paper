const fs = require("fs")

// 파일 복사 전 메모리 사용량
console.log("before: ", process.memoryUsage().rss)

const readStream = fs.createReadStream("./big.txt")
const writeStream = fs.createWriteStream("./big3.txt")
readStream.pipe(writeStream)

// 스트림으로 파일 복사 후 메모리 사용량
readStream.on("end", () => {
  console.log("stream: ", process.memoryUsage().rss)
})
