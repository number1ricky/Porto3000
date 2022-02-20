const apiRouter = require('express').Router();

const paymentsRouter = require("./payments");
apiRouter.use("/payments", paymentsRouter);

const productsRouter = require("./products");
apiRouter.use("/products", productsRouter)

const usersRouter = require("./users");
apiRouter.use("/users", usersRouter)

const ordersRouter = require("./orders");
apiRouter.use("/orders", ordersRouter)

const orderProductsRouter = require("./orderProducts");
apiRouter.use("/", orderProductsRouter)

apiRouter.use('*', (req, res, next) =>{
  res.status(404);
  res.send({ error: 'route not found'});
});

apiRouter.use((error, req, res, next) => {
  res.send(error);
});

module.exports = apiRouter;
