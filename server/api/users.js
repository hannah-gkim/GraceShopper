const router = require("express").Router();
const {
    models: { User, Order },
} = require("../db");
const { requireToken } = require("./gatekeepingMiddleware");
module.exports = router;

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
