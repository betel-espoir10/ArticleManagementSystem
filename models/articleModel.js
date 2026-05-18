const Sequelize = require("sequelize");
const db = require("../config/db");

const Article = db.define("articles", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  brand: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  content: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  picture: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Article;
