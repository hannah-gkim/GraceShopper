const router = require("express").Router();
const {
  models: { Product, CartItem, User },
} = require("../db");
module.exports = router;

// GET /products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

// GET /products/:id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    //TODO: get correct quantity
    const cartItem = await CartItem.create({
      quantity: 1,
      // TODO: find a way to preserve past price
      pastPrice: product.price,
      currentPrice: product.price,
      orderId: 1,
      productId: id,
    });
    console.log("Purchased item > ", cartItem);
    res.sendStatus(200).json(cartItem);
  } catch (error) {
    next(error);
  }
});
