const sequelize = require("../config/db");

const User = require("./userModel");
const Article = require("./articleModel");
const Feedback = require("./feedbackModel");

const db = {};

db.sequelize = sequelize;

db.User = User;
db.Article = Article;
db.Feedback = Feedback;

//  Associations between tables

// User ↔ Feedback
db.User.hasMany(db.Feedback, {
  foreignKey: "userId",
  as: "feedbacks",
});
db.Feedback.belongsTo(db.User, {
  foreignKey: "userId",
  as: "users",
});

// Article ↔ Feedback
db.Article.hasMany(db.Feedback, {
  foreignKey: "articleId",
  as: "feedbacks",
});
db.Feedback.belongsTo(db.Article, {
  foreignKey: "articleId",
  as: "articles",
});

module.exports = db;
