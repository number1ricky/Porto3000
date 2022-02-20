const paymentsRouter = require("express").Router();
require('dotenv').config();
const { STRIPE_PRIVATE_API_KEY = "missing_key", DOMAIN_URL = 'http://porto3000.herokuapp.com/' } = process.env;
const stripe = require('stripe')(STRIPE_PRIVATE_API_KEY);
const { isLoggedIn } = require("./util");
const { getCartByUser } = require("../db");

paymentsRouter.post('/create-checkout-session', isLoggedIn, async (req, res, next) => {
  const id = req.user.id
  const cart = await getCartByUser({id});
  console.log(cart);
  const line_items = cart.products.map(product => {
    return { price: product.stripe_price_id, quantity: product.quantity }
  })
  console.log(line_items);
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    success_url: `${DOMAIN_URL}/cart/?success=true`,
    cancel_url: `${DOMAIN_URL}/cart/?canceled=true`,
  });
  res.send({url: session.url});
});

module.exports = paymentsRouter;