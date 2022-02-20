const ordersRouter = require("express").Router();
const { getAllOrders, getCartByUser, createOrder, updateOrder } = require("../db");
const { isLoggedIn, isAdmin } = require("./util");

ordersRouter.get("/", isAdmin, async (req, res, next) => {
    try {
        const allOrders = await getAllOrders();
        res.send(allOrders);
    } catch (error) {
        throw error;
    };
});

ordersRouter.get("/cart", isLoggedIn, async (req, res, next) => {
    const id = req.user.id
    try {
        const userCart = await getCartByUser({id});
        res.send(userCart);
    } catch(error) {
        throw error;
    }
});

ordersRouter.post("/", isLoggedIn, async (req, res, next) => {
    const { status } = req.body;
    const userId = req.user.id
    try {
        const newOrder = await createOrder({status, userId})
        res.send({
            name: "OrderCreated",
            message: "Your order has been made",
            newOrder,
        });
    } catch(error) {
        throw error;
    }
});

ordersRouter.patch("/:orderId", isLoggedIn, isAdmin, async (req, res, next) => {
    const { orderId } = req.params;
    const { status, userId } = req.body;
    try {
        const updatedOrder = await updateOrder({ orderId, status, userId })
        res.send({
            name: "OrderUpdate",
            message: "The order has been updated"
        }, [updatedOrder]);
    } catch (error) {
        throw error;
    };
});

// ordersRouter.delete("/:orderId", isLoggedIn, isAdmin, async (req, res, next) => {
//     const { orderId } = req.params;
//     const { status, userId } = req.body;
//     try {
//         const deletedOrder = await deletedOrder({orderId, status, userId})
//         res.send({
//             name: "OrderDeleted",
//             message: "The order has been canceled"
//         }, [deletedOrder]);
//     } catch (error) {
//         throw error;
//     };
// });

module.exports = ordersRouter;