const jwt = require("jsonwebtoken")
const rateLimit = require("express-rate-limit")

// 로그인 했는지 판단하는 미들웨어
exports.isLoggedIn = (req, res, next) => {
  // passport를 통해서 로그인을 하였는가
  if (req.isAuthenticated()) {
    next()
  } else {
    res.status(403).send("로그인 필요")
  }
}

//로그인 안되어있는지 판단하는 미들웨어
exports.isNotLoggedIn = (req, res, next) => {
  // passport를 통해서 로그인을 안하였는가
  if (!req.isAuthenticated()) {
    next()
  } else {
    const message = endcodeURIComponent("로그인한 상태입니다.")
    // localhost:8001?error=메시지
    res.redirect(`/?error=${message}`)
  }
}

exports.verifyToken = (req, res, next) => {
  try {
    res.locals.decoded = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    )
    return next()
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(419).json({
        code: 419,
        message: "토큰이 만료되었습니다.",
      })
    }
    return res.status(401).json({
      code: 401,
      message: "유효하지 않은 토큰입니다.",
    })
  }
}

exports.apiLimiter = async (req, res, next) => {
  let user
  if (res.locals.decoded.id) {
    user = await User.findOne({ where: { id: res.locals.decode.id } })
  }
  rateLimit({
    windowMs: 60 * 1000,
    max: user.type === "premium" ? 1000 : 10,
    handler(req, res) {
      res.status(this.statusCode).json({
        code: this.statusCode,
        message: "1분에 한번만 요청 가능합니다.",
      })
    },
  })(req, res, next)
}

exports.deprecated = (req, res) => {
  res.status(410).json({
    code: 410,
    message: "새로운 버전이 나왔습니다. 새로운 버전을 사용하여 주십시오.",
  })
}
