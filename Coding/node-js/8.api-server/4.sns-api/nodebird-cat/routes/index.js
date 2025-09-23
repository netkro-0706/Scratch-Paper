const express = require("express")
const router = express.Router()
const { getMyPosts, searchByHashtag } = require("../controllers")

router.get("/myposts", getMyPosts)
router.get("/search/:hashtag", searchByHashtag)

module.exports = router
