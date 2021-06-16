const router = require("express").Router();
const {
  models: { Product },
} = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    console.log(products);
    res.send(products);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
