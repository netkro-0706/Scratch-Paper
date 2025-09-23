const bcrypt = require("bcrypt")
const passport = require("passport")
const User = require("../models/user")

exports.join = async (req, res, next) => {
  const { nick, email, password } = req.body
  try {
    const exUser = await User.findOne({ where: { email } })
    if (exUser) {
      return res.redirect("/join?error=exist")
    }
    // 비밀번호를 암호화
    const hash = await bcrypt.hash(password, 12)
    await User.create({
      email,
      nick,
      password: hash,
    })

    // redirect로 302 반환
    return res.redirect("/")
  } catch (error) {
    console.error(error)
    next(error)
  }
}

// 미들웨어 확장패턴
// POST /auth/login
exports.login = (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError)
      return next(authError)
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`)
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError)
        return next(loginError)
      }
      return res.redirect("/")
    })
  })(req, res, next)
}

// // 기본적으로 사용
// app.use(passport.authenticate("kakao"))
// // 확장해서 사용
// app.use((req, res, next) => passport.authenticate("kakao")(req, res, next))

exports.logout = (req, res, next) => {
  // {} 로 만들어버림. 브라우저 connect.sid가 남아있어도
  req.logout(() => {
    res.redirect("/")
  })
}
