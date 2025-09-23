const axios = require("axios")

const URL = process.env.API_URL
axios.defaults.headers.origin = process.env.ORIGIN

const request = async (req, api) => {
  try {
    if (!req.session.jwt) {
      // 세션에 토큰이 없으면
      const tokenResult = await axios.post(`${URL}/token`, {
        clientSecret: process.env.CLIENT_SECRET,
      })
      req.session.jwt = tokenResult.data.token // 세션에 토큰 저장
    }
    return await axios.get(`${URL}${api}`, {
      headers: { authorization: req.session.jwt },
    }) // API 요청
  } catch (error) {
    if (error.response?.status === 419) {
      delete req.session.jwt
      return request(req, api)
    }
    // return은 에러가 없는 것으로 처리, throw는 에러로 판단하여 catch하여 처리
    return error.response
  }
}

exports.getMyPosts = async (req, res, next) => {
  try {
    const result = await request(req, "/posts/my")
    res.json(result.data)
  } catch (error) {
    console.error(error)
    next(error)
  }
}

exports.searchByHashtag = async (req, res, next) => {
  try {
    const result = await request(
      req,
      `/posts/hashtag/${encodeURIComponent(req.params.hashtag)}`
    )
    res.json(result.data)
  } catch (error) {
    console.error(error)
    next(error)
  }
}

exports.renderMain = (req, res) => {
  res.render("main", { key: process.env.CLIENT_SECRET })
}
