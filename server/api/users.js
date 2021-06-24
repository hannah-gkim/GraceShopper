const router = require("express").Router();
const {
    models: { User, CartItem, Order, Product },
} = require("../db");

const { requireToken } = require("./gatekeepingMiddleware");
module.exports = router;

//api/users/:id/cart
router.post("/:id/cart", requireToken, async (req, res, next) => {
    try {
        const { id } = req.params;
        if (req.user.id == id) {
            const product = await Product.findOne({
                where: {
                    id: req.body.newCartItem.productId,
                },
            });
            // Check if product exists in order
            let order = await Order.findOne({
                where: { userId: id, isFulfilled: false },
            });

            let item = await CartItem.findOne({
                where: {
                    orderId: order.id,
                    productId: req.body.newCartItem.productId,
                },
            });

            console.log("item>>>>>", item);

            // const index = order.products.findIndex((elem) => {
            //     return elem.id == req.body.newCartItem.productId;
            // });
            // console.log("index>>>>>>", order.CartItems);
            if (item) {
                // console.log("index>>>>", order.products[index]);

                const newQuantity =
                    parseInt(item.quantity, 10) +
                    parseInt(req.body.newCartItem.quantity, 10);

                const updatedItem = await CartItem.update(
                    { quantity: newQuantity },
                    {
                        where: {
                            productId: product.id,
                            orderId: order.id,
                        },
                    }
                );
                res.status(200).json(updatedItem);
            } else {
                console.log("i dont have this item");
                const cartItem = await CartItem.create({
                    quantity: req.body.newCartItem.quantity,
                    pastPrice: product.price,
                    currentPrice: product.price,
                    orderId: order.id,
                    productId: product.id,
                });
                res.status(200).json(cartItem);
            }
        }
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
        console.log(id);
        console.log(req.user.id);
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

//api/users/:id/confirmation
router.put("/:id/confirmation", requireToken, async (req, res, next) => {
    try {
      const { id } = req.params;
      if (req.user.id == id) {
        const order = await Order.findOne({
          where: {
            userId: id,
            isFulfilled: false,
          },
        });
  
        if (order) {
          await Order.update(
            { isFulfilled: true,
            total: req.body.total },
  
            {
              where: {
                userId: id,
                isFulfilled: false,
              },
            }
          );
          res.sendStatus(200);
        }
      }
    } catch (error) {
      next(error);
    }
  });
  