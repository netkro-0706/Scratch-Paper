// 비동기 방식이지만 순서를 지키면서 전체가 백그라운드에서 동시에 처리되므로 이 방식이 좋다.
const fs = require("fs")

fs.readFile("./readme.txt", (err, data) => {
  if (err) {
    throw err
  }

  console.log("1번", data.toString())
  fs.readFile("./readme.txt", (err, data) => {
    if (err) {
      throw err
    }

    console.log("2번", data.toString())
    fs.readFile("./readme.txt", (err, data) => {
      if (err) {
        throw err
      }

      console.log("3번", data.toString())
      fs.readFile("./readme.txt", (err, data) => {
        if (err) {
          throw err
        }

        console.log("4번", data.toString())
      })
    })
  })
})
