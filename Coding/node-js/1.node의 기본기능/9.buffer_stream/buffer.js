const buffer = Buffer.from("버퍼 입니다.")
console.log(buffer)
console.log(buffer.length)
console.log(buffer.toString())

// 여러개가 들어오면 concat으로 합칠 수 있다.
const array = [
  Buffer.from("띄엄 "),
  Buffer.from("띄엄 "),
  Buffer.from("띄어쓰기"),
]
console.log(Buffer.concat(array).toString())

// 5바이트의 버퍼를 생성, 0으로 초기화
console.log(Buffer.alloc(5))

//fs에서 사용했던 readFile은 통째로 읽는 버퍼와 같은 것이다.
const fs = require("fs")
fs.readFile("./readme.txt")
