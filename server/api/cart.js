const router = require("express").Router();
const {
  models: { CartItem, Order, Product },
} = require("../db");

const { requireToken, admin } = require("./gatekeepingMiddleware");
module.exports = router;

// GET api/cart
router.get("/", requireToken, async (req, res, next) => {
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

// post rquest is made in /store/cartitem.js
//--> axios.post(`/api/cart/${userId}/cart`)
// but the {userId} come from SingleProduct.js

//api/cart/:id   =>adds product to cart
router.post("/:id", requireToken, async (req, res, next) => {
  try {
    //userId because userId is sent from frontend...
    const { id } = req.params;
    //if frontend id and backend id matches => add product to cart
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

      if (item) {
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
          { isFulfilled: true, total: req.body.total },

          {
            where: {
              userId: id,
              isFulfilled: false,
            },
          }
        );

        await Order.create({
          isFulfilled: false,
          total: 0,
          userId: id,
        });
        res.sendStatus(200);
      }
    }
  } catch (error) {
    next(error);
  }
});
