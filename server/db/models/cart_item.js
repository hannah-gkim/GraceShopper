const Sequelize = require("sequelize");
const db = require("../db");

const CartItem = db.define("CartItem", {
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
    },
    pastPrice: {
        type: Sequelize.INTEGER,
    },
    currentPrice: {
        type: Sequelize.INTEGER,
    },
});

module.exports = CartItem;
