const Sequelize = require("sequelize")

class Domain extends Sequelize.Model {
  static initiate(sequelize) {
    Domain.init(
      {
        host: {
          type: Sequelize.STRING(80),
          allowNull: false,
        },
        type: {
          type: Sequelize.ENUM("free", "premium"),
          allowNull: false,
        },
        clientSecret: {
          // 사용자마다 값을 다르게 하기 위해서 UUID를 사용
          type: Sequelize.UUID,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        paranoid: true,
        modelName: "Domain",
        tableName: "domains",
      }
    )
  }

  static associate(db) {
    db.Domain.belongsTo(db.User)
  }
}

module.exports = Domain
