var faker = require("faker");
const products = [];

// name, description, price, quantity, imageUrl
for (let i = 0; i < 50; i++) {
    let newProduct = {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: Math.floor(faker.commerce.price() * 100),
        quantity: Math.floor(Math.random(0, 200) * 200),
        imageUrl: faker.image.food(),
    };
    products.push(newProduct);
}
/*
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
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  */
module.exports = products;
