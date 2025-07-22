// 멀티 스레드 방식으로 작업을 처리할 수 있게 해준다.
// 메인 스레드에서 작업을 분리하여 워커 스레드에서 실행할 수 있다.(직접 워커 스레드로 넣어줘야 한다.) - prime_worker.js
// 메인 스레드에서 작업을 워커 스레드로 분배를 해주고 워커 스레드가 작업을 처리한 후 결과를 메인 스레드로 전달하는 방식이다.

// 멀티스레드를 사용해야 하는 경우. nodejs가 아닌 다른언어로 만드는게 좋다.
// child_process모듈을 사용하여 다른 언어를 가져오고 특정 부분만 다른 언어로 작성하여 대응하는 것이 가능하다. - spawn.js

const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads")

// 단순 예제
// if (isMainThread) {
//   // 메인 스레드
//   const worker = new Worker(__filename)
//   worker.on("message", (value) => console.log("워커로 부터", value))
//   worker.on("exit", () => console.log("워커 끝"))
//   worker.postMessage("ping")
// } else {
//   // 워커 스레드
//   parentPort.on("message", (value) => {
//     console.log("부모로 부터", value)
//     parentPort.postMessage("pong")
//     parentPort.close()
//   })
// }

if (isMainThread) {
  // 메인 스레드
  const threads = new Set()
  threads.add(
    new Worker(__filename, {
      workerData: { start: 1 },
    })
  )
  threads.add(
    new Worker(__filename, {
      workerData: { start: 2 },
    })
  )
  for (let worker of threads) {
    worker.on("message", (value) => console.log("워커로 부터", value))
    worker.on("exit", () => {
      threads.delete(worker)
      if (threads.size === 0) {
        console.log("워커 끝")
      }
    })
  }
} else {
  // 워커 스레드
  const data = workerData
  parentPort.postMessage(data.start + 100)
}
