const text = require("./var")

function addText() {
  console.log(`addText console : ${text.b} ${text.a}`)
  return `${text.b} ${text.a}`
}

const addedText = addText()

module.exports = { addedText }
