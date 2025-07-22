const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads")

const min = 2
let primes = []

function findPrimes(start, range) {
  let isPrime = true
  const end = start + range
  for (let i = start; i < end; i++) {
    for (let j = min; j <= Math.sqrt(i); j++) {
      if (i !== j && i % j === 0) {
        isPrime = false
        break
      }
    }
    if (isPrime) {
      primes.push(i)
    }
    isPrime = true
  }
}

if (isMainThread) {
  const max = 10_000_000
  const threadCount = 8 // 스레드 개수
  const threads = new Set()
  const range = Math.floor((max - min) / threadCount)
  let start = min
  console.time("prime")
  // 워커 스레드로 작업 분배
  for (let i = 0; i < threadCount - 1; i++) {
    const wStart = start
    threads.add(
      new Worker(__filename, { workerData: { start: wStart, range } })
    )
    start += range
  }
  // 마지막 스레드에 남은 범위 추가
  threads.add(
    new Worker(__filename, {
      workerData: {
        start: start,
        range: range + ((max - min + 1) % threadCount),
      },
    })
  )
  for (let worker of threads) {
    // 워커 스레드에서 에러 발생시 처리
    worker.on("error", (err) => {
      throw err
    })
    // 워커 스레드가 종료된 후의 작업
    worker.on("exit", () => {
      threads.delete(worker)
      if (threads.size === 0) {
        console.timeEnd("prime")
        console.log(primes.length, "개의 소수를 찾았습니다.")
      }
    })
    // 워커 스레드로부터 결과 받기
    worker.on("message", (msg) => {
      primes = primes.concat(msg)
    })
  }
} else {
  findPrimes(workerData.start, workerData.range)
  parentPort.postMessage(primes)
}
