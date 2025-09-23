const express = require("express")
const { verifyToken } = require("../middlewares")
const { createToken, tokenTest } = require("../controllers/v1")
const router = express.Router()

// /v1/token
router.post("/token", createToken)
router.get("/test", verifyToken, tokenTest)

module.exports = router
