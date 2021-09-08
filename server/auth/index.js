const router = require("express").Router();
const {
  models: { User, Order },
} = require("../db");
module.exports = router;

// POST /auth/signup
// returns token
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

// POST /auth/login
router.post("/login", async (req, res, next) => {
  try {
    //postman req.body
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

// GET /auth/me
//req.headers.authorization comes from frontend auth.js
router.get("/me", async (req, res, next) => {
  try {
    //sends a verified user
    //findByToken(token)
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});
