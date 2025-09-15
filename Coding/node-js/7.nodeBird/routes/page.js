const express = require("express")
const router = express.Router()

const { renderJoin, renderMain, renderProfile } = require("../controllers/page")

// 공통으로 사용하는 것은 res.locals로 선언
router.use((req, res, next) => {
  res.locals.user = null
  res.locals.followerCount = 0
  res.locals.followingCount = 0
  res.locals.followingIdList = []
  next()
})

router.get("/profile", renderProfile)
router.get("/join", renderJoin)
router.get("/", renderMain)

module.exports = router
