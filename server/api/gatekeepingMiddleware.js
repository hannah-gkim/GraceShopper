const User = require("../db/models/user");

const requireToken = async (req, res, next) => {
    try {
        console.log("requiretoken headers>>>", req.headers);
        console.log("requiretoken headers>>>", req.body);
        const token = req.headers.authorization;
        // if (token == localStorage.getItem("token")) {
        //     console.log("correct token");
        // }
        console.log("token>>>>>>", token);
        const user = await User.findByToken(token);
        req.user = user;
        // console.log(user);
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    requireToken,
};
