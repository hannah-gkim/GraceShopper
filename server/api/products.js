const router = require("express").Router();
const {
  models: { Product },
} = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    console.log("these are the", products);
    res.json(products);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
