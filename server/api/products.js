const router = require("express").Router();
const {
  models: { Product },
} = require("../db");
module.exports = router;


router.get('/products',(req, res, next)=>{

  try {
    const products = await Product.findAll()
    res.status(200).json(products)
  } catch (error) {
    next(error)
  }
  
})