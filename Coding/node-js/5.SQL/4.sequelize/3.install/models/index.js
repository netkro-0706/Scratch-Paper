const Sequelize = require("sequelize")
require("dotenv").config()
const User = require("./user")
const Comment = require("./comment")

const env = process.env.NODE_ENV || "development"
const config = require("../config/config.json")[env]
const db = {}

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

db.sequelize = sequelize
db.User = User
db.Comment = Comment

User.initiate(sequelize)
Comment.initiate(sequelize)

// User.associate(db)
// Comment.associate(db)

module.exports = db
