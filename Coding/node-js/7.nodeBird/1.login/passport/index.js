const passport = require("passport")
const local = require("./localStrategy")
const kakao = require("./kakaoStrategy")
const User = require("../models/user")

module.exports = () => {
  // user === exUser
  passport.serializeUser((user, done) => {
    done(null, user.id) // user id 만 추출
  })
  // { 12390123412: 1 } - {세션쿠키: 유저 아이디} -> 메모리 저장

  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } })
      .then((user) => done(null, user)) // req.user, req.session
      .catch((err) => done(err))
  })

  local()
  kakao()
}
