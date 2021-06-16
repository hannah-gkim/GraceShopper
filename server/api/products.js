const router = require("express").Router();
const {
    models: { Product },
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
        const { id } = req.body;
        const product = await Campus.findByPk(id);
        res.json(product);
    } catch (error) {
        next(error);
    }
});
