const Post = require("../models/post")
const Hashtag = require("../models/hashtag")

exports.afterUploadImage = (req, res) => {
  console.log(req.file)
  res.json({ url: `/img/${req.file.filename}` })
}

exports.uploadPost = async (req, res, next) => {
  // main.html에서 form에서 보내는 text와 img의 name값 content, url을 참조해야 한다.
  // req.body.content, req.body.url
  try {
    // 노드교과서 재미있어요. #노드교과서 #익스프레스
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      UserId: req.user.id,
    })
    // 이렇게도 가능
    // await post.addUser(req.user.id)
    // 해쉬태그 정규표현식 - /#[^¥s#]*/g
    const hashtags = req.body.content.match(/#[^\s#]*/g)
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) => {
          // findOrCreate - 기존에 있으면 찾고 없으면 만들어서 찾고
          return Hashtag.findOrCreate({
            where: { title: tag.slice(1).toLowerCase() },
          })
        })
      )
      console.log("result", result)
      await post.addHashtags(result.map((r) => r[0]))
    }
    res.redirect("/")
  } catch (error) {
    console.error(error)
    next(error)
  }
}
