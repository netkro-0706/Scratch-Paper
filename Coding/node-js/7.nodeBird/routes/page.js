const express = require("express")
const router = express.Router()

const { renderJoin, renderMain, renderProfile } = require("../controllers/page")
const { isLoggedIn, isNotLoggedIn } = require("../middlewares")

// 공통으로 사용하는 것은 res.locals로 선언
router.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.followerCount = 0
  res.locals.followingCount = 0
  res.locals.followingIdList = []
  next()
})

// 로그인 한사람은 프로필 화면을 볼 수 있다.
router.get("/profile", isLoggedIn, renderProfile)
// 로그인 안된 사람은 회원가입 화면을 볼 수 있다.
router.get("/join", isNotLoggedIn, renderJoin)
router.get("/", renderMain)

module.exports = router
