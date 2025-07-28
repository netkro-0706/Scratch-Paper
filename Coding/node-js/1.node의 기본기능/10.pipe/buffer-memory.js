const fs = require("fs")

// 파일 복사 전 메모리 사용량
console.log("before: ", process.memoryUsage().rss)

const data1 = fs.readFileSync("./big.txt")
fs.writeFileSync("./big2.txt", data1)

// 버퍼로 파일 복사 후 메모리 사용량
console.log("buffer: ", process.memoryUsage().rss)
