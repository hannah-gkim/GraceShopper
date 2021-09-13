const router = require("express").Router();
const {
  models: { Product },
} = require("../db");
module.exports = router;
const { requireToken } = require("./gatekeepingMiddleware");

// GET /products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

// GET /products/:id  <- this /id is req.params
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// POST api/products/
//TODO: adding products to shopt
router.post("/", requireToken, async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const product = await Product.create(req.body);
      res.json(product);
    } else {
      res.status(403).send("You are not an admin");
    }
  } catch (err) {
    next(err);
  }
});

// DELETE /products/id
//TODO: delete products from shop
router.delete("/:id", requireToken, async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.sendStatus(404);
      res.json(product).status(204);
      product.destroy();
    } else {
      res.status(403).send("You are not an admin");
    }
  } catch (err) {
    next(err);
  }
});

// PUT /products/id
//TODO: edit prodcuts as a admin
router.put("/:id", requireToken, async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.sendStatus(404);
      //Form used for put update request should validate for all fields
      product.update(req.body)
      res.json(product);
    } else {
      res.status(403).send("You are not an admin");
    }
  } catch (err) {
    next(err);
  }
});

