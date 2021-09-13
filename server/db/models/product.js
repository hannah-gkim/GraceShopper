const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    //type: Sequelize.DECIMAL,
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  // inventory: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  //   defaultValue: 0,
  // },
});

module.exports = Product;
