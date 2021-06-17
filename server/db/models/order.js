const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  total: {
    type: Sequelize.DECIMAL,
    defaultValue: 0,
  },
});

module.exports = Order;
