const url = require("url")

const { URL } = url
const myURL = new URL(
  "https://www.example.com:8080/thePath/theName?queryPage=333&category=nodejs#theHash"
)
console.log("new URL(): ", myURL) // url주소가 부분별로 나뉘어져 출력됨
console.log("url.format(): ", url.format(myURL)) // url주소를 문자열로 출력
console.log("searchParams: ", myURL.searchParams) // URLSearchParams 객체로 쿼리 파라미터를 출력
console.log("searchParams.getAll(): ", myURL.searchParams.getAll("queryPage")) // 쿼리 파라미터의 값들을 배열로 출력
console.log("searchParams.get(): ", myURL.searchParams.get("queryPage")) // 쿼리 파라미터의 첫번째 값만 출력
console.log("searchParams.has(): ", myURL.searchParams.has("queryPage")) // 쿼리 파라미터가 있는지 확인
console.log("searchParams.set(): ", myURL.searchParams.set("queryPage", "444")) // 쿼리 파라미터의 값을 변경

myURL.searchParams.append("queryPage", "555") // 쿼리 파라미터에 값을 추가
console.log("searchParams.append(): ", myURL.searchParams.getAll("queryPage"))

myURL.searchParams.delete("queryPage") // 쿼리 파라미터를 삭제
console.log("searchParams.delete(): ", myURL.searchParams.getAll("queryPage"))

console.log("searchParams.keys(): ", myURL.searchParams.keys()) // 쿼리 파라미터의 키들을 출력
console.log("searchParams.values(): ", myURL.searchParams.values()) // 쿼리 파라미터의 값들을 출력
