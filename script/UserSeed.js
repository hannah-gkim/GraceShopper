var faker = require("faker");
const users = [];

// // name, description, price, quantity, imageUrl
for (let i = 0; i < 50; i++) {
    let newUser = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        //TODO: Give everyone a faker password
        // password: faker.internet.password(),
        password: "123",
    };
    users.push(newUser);
}

module.exports = users;
