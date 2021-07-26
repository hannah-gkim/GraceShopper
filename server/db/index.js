//this is the access point for all things database related!
const db = require("./db");
const User = require("./models/user");
const Product = require("./models/product");
const Order = require("./models/order");
const CartItem = require("./models/cart_item");

User.hasMany(Order);
Order.belongsTo(User);

//many products can have many orders
Order.belongsToMany(Product, {
    through: CartItem,
});
Product.belongsToMany(Order, {
    through: CartItem,
});

module.exports = {
    db,
    models: {
        User,
        Product,
        Order,
        CartItem,
    },
};




