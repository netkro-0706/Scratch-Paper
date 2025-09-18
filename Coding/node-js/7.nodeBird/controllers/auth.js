const User = require("../models/user")
const bcrypt = require("bcrypt")

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

exports.login = () => {}

exports.logout = () => {}
