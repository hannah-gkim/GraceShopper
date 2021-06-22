const router = require("express").Router();
const {
  models: { User, CartItem, Order },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//api/users/:id/cart
router.post("/:id/cart", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    let order = await Order.findAll({
      where: { userId: id },
    });

    console.log("got the order-->", order);
    console.log("got orderId-->", order[0].id);
    console.log("got order.isFulfilled", order[0].isFulfilled);

    if (order[0].isFulfilled === false) {
      const cartItem = await CartItem.create({
        quantity: 1,
        pastPrice: 300,
        currentPrice: 300,
        orderId: order[0].id,
        productId: 2,
      });
      return cartItem;
    }
    console.log("cartItem--->", cartItem);
    res.sendStatus(200).json(cartItem);
  } catch (error) {
    next(error);
  }
});

// //api/users/:userId/:productId
// router.post("/:userId/:productId", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findByPk(id);
//     //TODO: get correct quantity
//     const cartItem = await CartItem.create({
//       quantity: 1,
//       // TODO: find a way to preserve past price
//       pastPrice: product.price,
//       currentPrice: product.price,
//       orderId: 1, //user.id??
//       productId: id,
//     });
//     // console.log("Purchased item > ", cartItem);
//     res.sendStatus(200).json(cartItem);
//   } catch (error) {
//     next(error);
//   }
// });
