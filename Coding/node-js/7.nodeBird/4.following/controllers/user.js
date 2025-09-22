const User = require("../models/user")

exports.follow = async (req, res, next) => {
  // req.user.id req.params.id
  try {
    const user = await User.findOne({ where: { id: req.user.id } })
    // DB에 없을 경우 안전장치
    if (user) {
      await user.addFollowing(parseInt(req.params.id, 10))
      res.send("success")
    } else {
      res.status(404).send("no user")
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
}
