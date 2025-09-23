const express = require("express")
const { verifyToken, apiLimiter } = require("../middlewares")
const {
  createToken,
  tokenTest,
  getMyPosts,
  getPostsByHashtag,
} = require("../controllers/v2")

const router = express.Router()

// /v1/token
router.post("/token", apiLimiter, createToken)
router.get("/test", verifyToken, apiLimiter, tokenTest)

router.get("/posts/my", verifyToken, apiLimiter, getMyPosts)
router.get("/posts/hashtag/:title", verifyToken, apiLimiter, getPostsByHashtag)

module.exports = router
