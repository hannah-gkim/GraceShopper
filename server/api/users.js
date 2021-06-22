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
//Show User Profile
router.get("/:id", async (req, res, next) => {});

router.delete("/:id/viewCart", requireToken, async (req, res, next) => {
  console.log(req.body);
  try {
    if (req.user.id == req.params.id) {
      await CartItem.destroy({
        where: {
          orderId: req.body.orderId,
          productId: req.body.productId,
        },
      });
      res.json("hello");
    }
    res.json("world");
  } catch (error) {
    next(error);
  }
});

router.put("/:id/viewCart", requireToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.user.id == id) {
      console.log(req.body);
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
      });
      const items = await CartItem.findAll({
        where: {
          orderId: order.id,
        },
      });
      res.json(items);
    } else {
      res.json("incorrect id");
    }
  } catch (error) {
    next(error);
  }
});
