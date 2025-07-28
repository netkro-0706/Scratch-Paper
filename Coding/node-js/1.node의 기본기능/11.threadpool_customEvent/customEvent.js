const EventEmitter = require("events")

// 사용법은 자바스크립트와 동일하다.
const myEvent = new EventEmitter()
myEvent.addListener("event1", () => {
  console.log("이벤트1")
})
myEvent.on("event2", () => {
  console.log("이벤트2")
})
myEvent.once("event3", () => {
  console.log("이벤트3")
})
myEvent.emit("event1") // 이벤트 호출
myEvent.emit("event2")
myEvent.emit("event3") // 한번만 실행됨
myEvent.emit("event3") // 1번 실행 했으므로 실행 안됨
myEvent.removeAllListeners("event1")
myEvent.emit("event1") // 이벤트1이 제거되었으므로 실행 안됨
myEvent.emit("event2") // 이벤트2는 남아있으므로 실행됨
