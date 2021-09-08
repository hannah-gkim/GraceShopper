const router = require("express").Router();
const {
  models: { User, CartItem, Order, Product },
} = require("../db");

const { requireToken } = require("./gatekeepingMiddleware");
module.exports = router;

/************************* ADD to Cart ************************/
//api/users/:id/addToCart
// needs req.body -> productId,  quantity,  userId
router.post("/:id/addToCart", requireToken, async (req, res, next) => {
  try {
    //if you have the route /student/:id, then the “id” property is available as req.params.id. 
    const { id } = req.params;
    if (req.user.id == id) {
      const product = await Product.findOne({
        where: {
          id: req.body.newCartItem.productId,
        },
      });
      let order = await Order.findOne({
        where: { userId: id, isFulfilled: false },
      });

      let item = await CartItem.findOne({
        where: {
          orderId: order.id,
          productId: req.body.newCartItem.productId,
        },
      });
      // if item is already in the cart, we want to increase quantity on the same item
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
        console.log("first item in cart!");
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

/*************** GET loggedIn users Cart *************/
// GET /api/users/:id/viewCart
router.get("/:id/viewCart", requireToken, async (req, res, next) => {
  try {
    //userId
    //we can only get id from /users...?
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

      // res.json({ order, items });
      res.json({ items: items, products: order.products });
    } else {
      // res.json({ order: {}, items: [] });
      res.json("incorrect id");
    }
  } catch (error) {
    res.json({ items: [], products: [] });
  }
});

/***** DELETE products from loggedIn users Cart ******/
// DELETE /api/users/:id/deleteItem
router.delete("/:id/deleteItem", requireToken, async (req, res, next) => {
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

/*****************TODO: fix update *****************/
router.put("/:id/updateCart", requireToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    let updatedCart;
    //console.log("req.body--->", req.body);
    if (req.user.id == id) {
      //console.log(req.user.id, "---->", id);
      updatedCart = await CartItem.update(
        {
          quantity: req.body.quantity,
          currentPrice: req.body.currentPrice,
        },

        {
          where: {
            orderId: req.body.orderId,
            productId: req.body.productId,
          },
        }
      );
      //console.log("updatedCart-->", updatedCart);
      res.send(updatedCart);
    }
  } catch (error) {
    next(error);
  }
});

// router.put("/:id/updateCart", requireToken, async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     if (req.user.id == id) {
//       const product = await Product.findOne({
//         where: {
//           id: req.body.newCartItem.productId,
//         },
//       });
//       let order = await Order.findOne({
//         where: { userId: id, isFulfilled: false },
//       });

//       let item = await CartItem.findOne({
//         where: {
//           orderId: order.id,
//           productId: req.body.newCartItem.productId,
//         },
//       });
//       if (item) {
//         const newQuantity =
//           parseInt(item.quantity, 10) +
//           parseInt(req.body.newCartItem.quantity, 10);

//         const updatedItem = await CartItem.update(
//           { quantity: newQuantity },
//           {
//             where: {
//               productId: product.id,
//               orderId: order.id,
//             },
//           }
//         );
//         res.status(200).json(updatedItem);
//       } else {
//         console.log("first item in cart!");
//         const cartItem = await CartItem.create({
//           quantity: req.body.newCartItem.quantity,
//           currentPrice: product.price,
//           orderId: order.id,
//           productId: product.id,
//         });
//         res.status(200).json(cartItem);
//       }
//     }
//   } catch (error) {
//     next(error);
//   }
// });

/*************  once checkout, new cart created for loggedIn user  **************/
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
          {
            isFulfilled: true,
            total: req.body.total,
          },

          {
            where: {
              userId: id,
              isFulfilled: false,
            },
          }
        );

        await CartItem.destroy({
          where: {},
        });

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

/******************* Admin users *********************/
// GET /api/users
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
//if Admin, can create product, delete, edit
