const router = require("express").Router();
const {
  models: { User, CartItem, Order, Product },
} = require("../db");

const { requireToken } = require("./gatekeepingMiddleware");
module.exports = router;

//api/users/:id/cart
router.post("/:id/cart", async (req, res, next) => {
  try {
    const { id } = req.params;
    //const product=?
    const user = await User.findByPk(id);
    let order = await Order.findAll({
      where: { userId: id, isFulfilled: false },
    });
    
    console.log("this is req.body", req.body)
    const product = await Product.findOne({
      where: {
        id: req.body.productId
      }
    })
    // console.log("got the order-->", order);
    // console.log("got orderId-->", order[0].id);
    // console.log("got order.isFulfilled", order[0].isFulfilled);
    //TODO: still need to figure out adding product detail
    const cartItem = await CartItem.create({
      quantity: req.body.quantity,
      pastPrice: product.price,
      currentPrice: product.price,
      orderId: order[0].id,
      productId: product.id
    });
    res.status(200).json(cartItem);
  } catch (error) {
    next(error);
  }
});
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
//TODO: Proctect against user error
router.delete("/:id/viewCart", requireToken, async (req, res, next) => {
    try {
        if (req.user.id == req.params.id) {
            const removedItem = await CartItem.destroy({
                where: {
                    orderId: req.body.orderId,
                    productId: req.body.productId,
                },
            });
            res.json(removedItem);
        } else {
            res.json("Can't delete item");
        }
    } catch (error) {
        next(error);
    }
});

router.put("/:id/viewCart", requireToken, async (req, res, next) => {
    try {
        const { id } = req.params;
        if (req.user.id == id) {
            await CartItem.update(
                {
                    currentPrice: req.body.currentPrice,
                    quantity: req.body.quantity,
                    pastPrice: req.body.pastPrice,
                },
                {
                    where: {
                        orderId: req.body.orderId,
                        productId: req.body.productId,
                    },
                }
            );
            res.sendStatus(200);
        }
    } catch (error) {
        next(error);
    }
});

router.get("/:id/viewCart", requireToken, async (req, res, next) => {
    try {
        const { id } = req.params;
        if (req.user.id == id) {
            const order = await Order.findOne({
                where: {
                    userId: id,
                    isFulfilled: false,
                },
                include: [
                    {
                        model: Product,
                    },
                ],
            });

            const items = await CartItem.findAll({
                where: {
                    orderId: order.id,
                },
            });

            const bulk = { items: items, products: order.products };
            res.json(bulk);
        } else {
            res.json("incorrect id");
        }
    } catch (error) {
        next(error);
    }
});
