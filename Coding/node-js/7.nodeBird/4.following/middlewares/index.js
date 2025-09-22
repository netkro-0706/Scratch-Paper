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
