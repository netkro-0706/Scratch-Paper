const express = require("express")
const path = require("path")
const app = express()

app.set("port", process.env.PORT || 3000)

app.get("/", (req, res) => {
  res.send("Hello express")
})

app.get("/hello", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"))
})

app.post("/", (req, res) => {
  res.send("Hello express post")
})

app.get("/about", (req, res) => {
  res.send("About express")
})

app.listen(app.get("port"), () => {
  console.log(`http://localhost:${app.get("port")}`)
})
