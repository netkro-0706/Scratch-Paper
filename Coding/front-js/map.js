// 객체 대신 사용
const m = new Map()

m.set("a", "b")
m.set(3, "c")

console.log("m", m)
console.log("m get a", m.get("a"))

const m2 = new Map()
// 이렇게 하면 값을 가져오기가 어려워짐
// m2.set({ a: "b" }, { c: "d" })

// 같은 참조값을 가져올 수 있게 지정
const obj = { key: "key" }
m2.set(obj, 123)
console.log("m2", m2)
console.log("m2 obj", m2.get(obj))

console.log("size", m2.size)

console.log("has", m2.has(obj))
m2.clear()
console.log("after clear", m2.size)
