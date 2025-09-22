const express = require("express")
const router = express.Router()
const { isLoggedIn, isNotLoggedIn } = require("../middlewares")
const { follow } = require("../controllers/user")

router.post("/:id/follow", isLoggedIn, follow)

module.exports = router
