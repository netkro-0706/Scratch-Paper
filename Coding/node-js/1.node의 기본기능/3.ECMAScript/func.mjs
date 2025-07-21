import * as text from "./var.mjs"

export function addText() {
  console.log(`addText console : ${text.b} ${text.a}`)
  return `${text.b} ${text.a}`
}

export const addedText = addText()
