const os = require("os")

// 운영체제

console.log("os.arch(): ", os.arch())
// x64
console.log("os.platform(): ", os.platform())
// win32
console.log("os.type(): ", os.type())
// Windows_NT
console.log("os.hostname(): ", os.hostname())
// DESKTOP-123ABC
console.log("os.release(): ", os.release())
// 10.0.19045

// 경로

console.log("os.homedir(): ", os.homedir())
// C:\Users\username
console.log("os.tmpdir(): ", os.tmpdir())
// C:\Users\username\AppData\Local\Temp

// cpu정보
console.log("os.cpus(): ", os.cpus())
// [
//   {
//     model: 'Intel(R) Core(TM) i7-9700 CPU @ 3.00GHz',
//     speed: 3000,
//     times: { user: ..., nice: ..., sys: ..., idle: ..., irq: ... }
//   },
//   ...
// ]

// 메모리 정보

console.log("os.freemem(): ", os.freemem())
// 8500000000
console.log("os.totalmem(): ", os.totalmem())
// 17000000000
