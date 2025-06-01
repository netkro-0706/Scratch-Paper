// 배열대신 사용.
// 중복을 허용하지 않는다.
// 자료형이 다르면 상관없다.

const s = new Set()

s.add(false)
s.add(1)
s.add("1")
s.add(1)
s.add(2)

console.log("s.size", s.size)
console.log("s", s)
