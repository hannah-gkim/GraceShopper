const router = require("express").Router();
const {
    models: { User, Order },
} = require("../db");
module.exports = router;

// GET /auth/me  
//req.headers.authorization comes from frontend auth.js
router.get("/me", async (req, res, next) => {
    try {
        //sends a verified user
        res.send(await User.findByToken(req.headers.authorization));
    } catch (ex) {
        next(ex);
    }
});

// POST /auth/login
router.post("/login", async (req, res, next) => {
    try {
        res.send({ token: await User.authenticate(req.body) });
    } catch (err) {
        next(err);
    }
});

router.post("/signup", async (req, res, next) => {
    try {
        const { username, password, email } = req.body;

        const user = await User.create({ username, password, email });
        const order = await Order.create({ userId: user.id });
        res.send({ token: await user.generateToken() });
    } catch (err) {
        if (err.name === "SequelizeUniqueConstraintError") {
            res.status(401).send("User already exists");
        } else {
            next(err);
        }
    }
});

