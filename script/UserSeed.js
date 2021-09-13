var faker = require("faker");
const users = [];

// // name, description, price, quantity, imageUrl
for (let i = 0; i < 10; i++) {
  let newUser = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: "123", // faker.internet.password(),
  };
  users.push(newUser);
}

module.exports = users;
