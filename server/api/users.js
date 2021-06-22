const router = require("express").Router();
const {
    models: { User, CartItem, Order },
} = require("../db");

const { requireToken } = require("./gatekeepingMiddleware");
module.exports = router;

//api/users/:id/cart
router.post("/:id/cart", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    let order = await Order.findAll({
      where: { userId: id, isFulfilled: false },
    });
    // console.log("got the order-->", order);
    // console.log("got orderId-->", order[0].id);
    // console.log("got order.isFulfilled", order[0].isFulfilled);
    //TODO: still need to figure out adding product detail
    const cartItem = await CartItem.create({
      quantity: 1,
      pastPrice: 300,
      currentPrice: 300,
      orderId: order[0].id,
      productId: 2,
    });
    res.status(200).json(cartItem);
  } catch (error) {
    next(error);
  }

router.get("/", requireToken, async (req, res, next) => {
    try {
        //TODO Only show all users IF req.user is an admin
        // console.log("am i an admin?", req.user.isAdmin);
        if (req.user.isAdmin) {
            const users = await User.findAll({
                // explicitly select only the id and username fields - even though
                // users' passwords are encrypted, it won't help if we just
                // send everything to anyone who asks!
                attributes: ["id", "username"],
            });
            res.json(users);
        } else {
            res.status(403).send("You are not an admin");
        }
    } catch (err) {
        next(err);
    }
});

//Show User Profile
router.get("/:id", async (req, res, next) => {});

router.get("/:id/viewCart", requireToken, async (req, res, next) => {
    const { id } = req.params;
    try {
        console.log("req.user.id", req.user.id);
        console.log("/:id", id);

        if (req.user.id == id) {
            const order = await Order.findAll({
                where: {
                    userId: id,
                    isFulfilled: true,
                },
            });
            console.log(order);
            res.json(order);
        } else {
            res.json("incorrect id");
        }
    } catch (error) {
        next(error);
    }
});
