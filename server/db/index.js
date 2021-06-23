//this is the access point for all things database related!
const Sequelize = require("sequelize");
const db = require("./db");

const User = require("./models/user");
const Product = require("./models/product");
const Order = require("./models/order");
const CartItem = require("./models/cart_item");

//associations could go here!
// User.hasOne(Cart);
// Cart.belongsTo(User);

// Product.hasMany(CartItem);
// CartItem.belongsTo(Product);

User.hasMany(Order);

Order.belongsTo(User);

Order.belongsToMany(Product, {
    through: CartItem,
});

Product.belongsToMany(Order, {
    through: CartItem,
});

// CartItem.belongsTo(Order);
// Order.hasMany(CartItem);

// Product.hasMany(CartItem);
// CartItem.belongsTo(Product);

// CartItem.hasOne(Product);
// CartItem.belongsTo(Order);

// const user = await User.create({username:'cal', password:'123', email:'haikyu@msn.com'})
// const product = await Product.create({})

// const userCity = await UserCity.create({
//   userId: user.userId,
//   cityId: city.cityId,
// })
module.exports = {
    db,
    models: {
        User,
        Product,
        Order,
        CartItem,
    },
};




