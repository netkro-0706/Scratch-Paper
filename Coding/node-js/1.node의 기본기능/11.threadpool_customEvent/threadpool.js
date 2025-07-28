const crypto = require("crypto")

const pass = "pass"
const salt = "salt"
const start = Date.now()

// 8개의 스레드를 만들었지만 4개씩 동작됨
crypto.pbkdf2(pass, salt, 1_000_000, 128, "sha512", () => {
  console.log("1", Date.now() - start)
})
crypto.pbkdf2(pass, salt, 1_000_000, 128, "sha512", () => {
  console.log("2", Date.now() - start)
})
crypto.pbkdf2(pass, salt, 1_000_000, 128, "sha512", () => {
  console.log("3", Date.now() - start)
})
crypto.pbkdf2(pass, salt, 1_000_000, 128, "sha512", () => {
  console.log("4", Date.now() - start)
})
crypto.pbkdf2(pass, salt, 1_000_000, 128, "sha512", () => {
  console.log("5", Date.now() - start)
})
crypto.pbkdf2(pass, salt, 1_000_000, 128, "sha512", () => {
  console.log("6", Date.now() - start)
})
crypto.pbkdf2(pass, salt, 1_000_000, 128, "sha512", () => {
  console.log("7", Date.now() - start)
})
crypto.pbkdf2(pass, salt, 1_000_000, 128, "sha512", () => {
  console.log("8", Date.now() - start)
})
