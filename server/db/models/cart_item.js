const Sequelize = require("sequelize");
const db = require("../db");

//both product and order has access to this table through
//carItem has orderId and productId
const CartItem = db.define("CartItem", {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  currentPrice: {
    type: Sequelize.DECIMAL,
    //  type: Sequelize.DECIMAL(10, 2),
  },
});

module.exports = CartItem;
