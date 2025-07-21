const crypto = require("crypto")

crypto.randomBytes(64, (err, buf) => {
  const salt = buf.toString("base64") // 해독을 더 어렵게 하기위한 변수
  console.log("salt", salt)
  crypto.pbkdf2("password", salt, 100000, 64, "sha512", (err, key) => {
    console.log("key", key.toString("base64"))
  })
})
