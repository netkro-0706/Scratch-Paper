const Sequelize = require("sequelize")
const fs = require("fs")
const path = require("path")
// const User = require("./user")
// const Post = require("./post")
// const Hashtag = require("./hashtag")
const env = process.env.NODE_ENV || "development"
const config = require("../config/config")[env]
const db = {}
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)
db.sequelize = sequelize
const basename = path.basename(__filename) // index.js
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    )
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))
    console.log(file, model.name)
    db[model.name] = model
    model.initiate(sequelize)
  })
Object.keys(db).forEach((modelName) => {
  console.log(db, modelName)
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})
// db.User = User
// db.Post = Post
// db.Hashtag = Hashtag
// User.initiate(sequelize)
// Post.initiate(sequelize)
// Hashtag.initiate(sequelize)
// User.associate(db)
// Post.associate(db)
// Hashtag.associate(db)

module.exports = db
