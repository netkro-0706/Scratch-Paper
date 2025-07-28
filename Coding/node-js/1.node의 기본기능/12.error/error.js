const fs = require("fs")

setInterval(() => {
  fs.unlink("./asd.js", (err) => {
    if (err) {
      console.error("파일 삭제 중 오류 발생:", err)
    }
  })
}, 1000)
