const orderProductsRouter = require("express").Router();
const { addProductToOrder, updateOrderProduct, destroyOrderProduct} = require("../db")

orderProductsRouter.post("/orders/:orderId/products",  async (req, res, next) => {
    const { orderId } = req.params;
    const { productId, price, quantity } = req.body;
    try {
        const order_product = await addProductToOrder({orderId, productId, price, quantity})
        res.send({
            name: "Select item",
            message: "Your item is added to cart.",
            order_product
          })
    } catch(error) {
        throw error;
    };
});

orderProductsRouter.patch("/:orderProductId", async (req, res, next) => {
    const { orderProductId } = req.params;
    const { productId, price, quantity } = req.body;
    try {
        const updatedOrderProduct = await updateOrderProduct({ id: orderProductId, productId, price, quantity })
        res.send({
            name: "Order Product Update",
            message: "The order product has been updated.",
            updatedOrderProduct
        });
    } catch (error) {
        throw error;
    };
});

orderProductsRouter.delete("/:orderProductId", async (req, res, next) => {
    const { orderProductId } = req.params;
    try {
        const destroyedOrderProduct = await destroyOrderProduct({orderProductId})
        res.send({
            name: "Order Product Deleted",
            message: "That order product is now removed.",
            destroyedOrderProduct
        });
    } catch (error) {
        throw error;
    };
});

module.exports = orderProductsRouter;