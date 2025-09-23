const jwt = require("jsonwebtoken")
const rateLimit = require("express-rate-limit")
const cors = require("cors")
const { Domain } = require("../models")

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

exports.apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1분
  max: 10,
  handler(req, res) {
    res.status(this.statusCode).json({
      code: this.statusCode, // 기본값 429
      message: "1분에 열 번만 요청할 수 있습니다.",
    })
  },
})

exports.deprecated = (req, res) => {
  res.status(410).json({
    code: 410,
    message: "새로운 버전이 나왔습니다. 새로운 버전을 사용하여 주십시오.",
  })
}

exports.corsWhenDomainMatches = async (req, res, next) => {
  const domain = await Domain.findOne({
    where: { host: new URL(req.get("origin")).host },
  })
  if (domain) {
    cors({
      origin: req.get("origin"),
      credentials: true,
    })(req, res, next)
  } else {
    next()
  }
}
