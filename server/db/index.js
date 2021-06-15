//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/product");
const Cart = require("./models/cart");
const CartItem = require("./models/cart_item");

//associations could go here!
User.hasOne(Cart);
Cart.belongsTo(User);

Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);

Product.hasMany(CartItem);
CartItem.belongsTo(Product);

module.exports = {
  db,
  models: {
    User,
    Product,
    Cart,
    CartItem,
  },
};
