const Sequelize = require("sequelize");
const db = require("../config/db");

const Category = db.define("category", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  token: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Category;
