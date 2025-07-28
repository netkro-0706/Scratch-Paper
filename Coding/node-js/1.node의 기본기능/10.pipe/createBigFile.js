const fs = require("fs")
const file = fs.createWriteStream("./big.txt")

for (let i = 0; i < 10_000_000; i++) {
  file.write("안녕하세요. 파이프와 스트림을 이용한 파일 쓰기 연습입니다.\n")
}
file.end()
