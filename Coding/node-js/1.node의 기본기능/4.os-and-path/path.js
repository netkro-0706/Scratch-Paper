const path = require("path")
// OS에 따른 "/", "¥" 같은 경로의 구분자를 자동으로 잡아준다.
// C:¥user¥username¥
// C:/user/username/

// 앞의 경로를 전부 표시
console.log(path.join(__dirname, "..", "/var.js"))
// /Scratch-paper/Coding/node-js/var.js

// 앞의 경로를 무시
console.log(path.resolve(__dirname, "..", "/var.js"))
// /var.js

// OS의 경로 구분자
console.log("path.sep: ", path.sep)
// /

// OS의 경로 구분자
console.log("path.delimiter: ", path.delimiter)
// ;

// 폴더 경로
console.log(
  "path.dirname: ",
  path.dirname("/Scratch-paper/Coding/node-js/4.os-and-path/path.js")
)
// /Scratch-paper/Coding/node-js/4.os-and-path

// 확장자
console.log(
  "path.extname: ",
  path.extname("/Scratch-paper/Coding/node-js/4.os-and-path/path.js")
)
// .js

// 파일명
console.log(
  "path.basename: ",
  path.basename("/Scratch-paper/Coding/node-js/4.os-and-path/path.js")
)
// path.js

// 파일명과 확장자
console.log(
  "path.parse: ",
  path.parse("/Scratch-paper/Coding/node-js/4.os-and-path/path.js")
)
// path.js

// 폴더 경로와 파일명, 확장자 합치기
console.log(
  "path.format: ",
  path.format({
    dir: "/Scratch-paper/Coding/node-js",
    name: "path",
    ext: ".js",
  })
)
// /Scratch-paper/Coding/node-js/path.js

// 경로가 /나 ¥등 여러개로 사용시 정상적인 경로로 변환
console.log(
  "path.normalize: ",
  path.normalize("/Scratch-paper//Coding¥node-js/4.os-and-path/./path.js")
)
// /Scratch-paper/Coding/node-js/4.os-and-path/path.js

// 경로가 절대경로인지 상대경로인지 확인
console.log("path.isAbsolute: ", path.isAbsolute("/var.js"))
// true

// 경로를 2개 넣으면 첫번째 경로를 기준으로 두번째 경로로 가는 법을 알려줌
console.log(
  "path.relative: ",
  path.relative(
    "/Scratch-paper/Coding/node-js/4.os-and-path/path.js",
    "/Scratch-paper/Coding/node-js/4.os-and-path/os.js"
  )
)
// ../os.js

// 여러 인자를 넣으면 하나로 합쳐준다.
console.log(
  "path.join: ",
  path.join(
    "/Scratch-paper/Coding/node-js/4.os-and-path",
    "path.js",
    "../os.js"
  )
)
// /Scratch-paper/Coding/node-js/4.os-and-path/os.js
