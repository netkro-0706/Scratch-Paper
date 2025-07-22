const exec = require("child_process").exec

// var process = exec("dir") - windows
var process = exec("ls")

process.stdout.on("data", function (data) {
  console.log(data.toString("utf-8"))
})

process.stderr.on("data", function (data) {
  console.error(data.toString("utf-8"))
})
