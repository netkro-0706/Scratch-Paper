// 로그인을 시켜도 되는지 안되는지 판단
const passport = require("passport")
const { Strategy: LocalStrategy } = require("passport-local")
const bcrypt = require("bcrypt")
const User = require("../models/user")

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email", //req.body.email
        passwordField: "password", // req.body.password
        passReqToCallback: false,
      },
      // done(서버실패, 성공유저, 로직실패)
      async (email, password, done) => {
        try {
          const exUser = await User.findOne({ where: { email } })
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password)
            if (result) {
              done(null, exUser)
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다." })
            }
          } else {
            done(null, false, { message: "가입되지 않은 회원입니다." })
          }
        } catch (error) {
          console.error(error)
          done(error)
        }
      }
    )
  )
}
