const Post = require("../models/post")
const User = require("../models/user")

exports.renderProfile = (req, res, next) => {
  // 서비스를 호출
  // 라우터 -> 컨트롤러 -> 서비스(요청, 응답 모른다.)
  res.render("profile", { title: "내 정보 - NodeBird" })
}

exports.renderJoin = (req, res, next) => {
  res.render("join", { title: "회원 가입 - NodeBird" })
}

exports.renderMain = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        // 프론트로 보낼 때는 유저의 비밀번호를 보내지 않는다.
        attributes: ["id", "nick"],
      },
      order: [["createdAt", "DESC"]],
    })
    res.render("main", { title: "NodeBird", twits: posts })
  } catch (error) {
    console.error(error)
    next(error)
  }
}
