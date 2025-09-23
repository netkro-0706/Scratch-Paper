const express = require("express")
const router = express.Router()
const { getMyPosts, searchByHashtag, renderMain } = require("../controllers")

router.get("/myposts", getMyPosts)
router.get("/search/:hashtag", searchByHashtag)
router.get("/", renderMain)

module.exports = router
