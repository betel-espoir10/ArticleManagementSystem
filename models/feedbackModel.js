const Sequelize = require("sequelize");
const db = require("../config/db");

const Feedback = db.define(
  "feedbacks",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    rating: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    comment: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    articleId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "feedbacks",
    timestamps: true,
  },
);

module.exports = Feedback;
