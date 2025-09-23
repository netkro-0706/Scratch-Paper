const axios = require("axios")

exports.test = async (req, res, next) => {
  try {
    // session에 토큰이 있는지 확인
    if (!req.session.jwt) {
      // 토큰 발급
      const tokenResult = await axios.post("http://localhost:8002/v1/token", {
        clientSecret: process.env.CLIENT_SECRET,
      })
      // session에 토큰 저장
      if (tokenResult.data?.code === 200) {
        req.session.jwt = tokenResult.data.token
      } else {
        return res.json(tokenResult.data) // 발급 실패 사유 응답
      }
    }
    const result = await axios.get("http://localhost:8002/v1/test", {
      headers: { authorization: req.session.jwt },
    })
    return res.json(result.data)
  } catch (error) {
    console.error(error)
    console.log("status", error.response?.status)
    if (error.response?.status === 419) {
      return res.json(error.response.data)
    }
    next(error)
  }
}
