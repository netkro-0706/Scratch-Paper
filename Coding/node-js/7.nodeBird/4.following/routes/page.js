const express = require("express")
const router = express.Router()

const {
  renderJoin,
  renderMain,
  renderProfile,
  renderHashtag,
} = require("../controllers/page")
const { isLoggedIn, isNotLoggedIn } = require("../middlewares")

// 공통으로 사용하는 것은 res.locals로 선언
router.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.followerCount = req.user?.Followers?.length || 0
  res.locals.followingCount = req.user?.Followings?.length || 0
  res.locals.followingIdList = req.user?.Followings?.map((f) => f.id) || []
  next()
})

// 로그인 한사람은 프로필 화면을 볼 수 있다.
router.get("/profile", isLoggedIn, renderProfile)
// 로그인 안된 사람은 회원가입 화면을 볼 수 있다.
router.get("/join", isNotLoggedIn, renderJoin)
router.get("/", renderMain)
router.get("/hashtag", renderHashtag) // hashtag?hashtag=고양이

module.exports = router
