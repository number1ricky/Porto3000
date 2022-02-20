const client = require("./client");
const { getProductById } = require('./products')
const { getOrderById } = require("./orders")

async function getOrderProductById (id) {
    try{
        const {rows: [order_product]} = await client.query(`
            SELECT * FROM order_products
            WHERE id=$1
        `, [id]);
        return order_product
    } catch (error) {
        throw error;
    };
};

async function addProductToOrder ({orderId, productId, price, quantity}) {
  try {
    const product = await getProductById(productId)
    const order = await getOrderById(orderId)
    if (!product || !order) return;
    const {rows: [order_product]} = await client.query(`
      SELECT * FROM order_products
      WHERE "orderId"=$1 AND "productId"=$2
  `, [orderId, productId]);

    if (order_product){
      const totalPrice = order_product.price + (price * quantity)
      const totalQuantity= order_product.quantity + quantity
      const updated_order_product= await updateOrderProduct({id: order_product.id, price: totalPrice, quantity:totalQuantity})
      return updated_order_product;
    } else{
      const { rows: [new_order_product] } = await client.query(`
      INSERT INTO order_products ("orderId", "productId", price, quantity) 
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `, [orderId, productId, price, quantity]);
      return new_order_product;
    }
    
  } catch (error){
    throw error;
  }
} 

async function updateOrderProduct({ id, ...fields }) {
    try {
        const toUpdate = {};
        let setStrings = [];
        let count = 1;
        for(let column in fields) {
          if(fields[column] !== undefined) {
            toUpdate[column] = fields[column];
            setStrings.push(`"${column}"=$${count}`)
            count++;
          };
        };
        const setStr = setStrings.join(',');
        const {rows: [order_product]} = await client.query(`
            UPDATE order_products
            SET ${setStr}
            WHERE id=${ id }
            RETURNING *;
        `, Object.values(toUpdate));
          return order_product;
      } catch (error) {
        throw error;
      };
  };

  async function destroyOrderProduct(id) {
    try {
      const { rows: [order_product]} = await client.query(`
      DELETE FROM order_products
      WHERE id=$1
      RETURNING *;
  `, [id]);
    return order_product
    } catch (error) {
      console.error("Error with destroyOrderProduct in db/users.");
      throw error;
    }
}

module.exports = {
    getOrderProductById,
    addProductToOrder,
    updateOrderProduct,
    destroyOrderProduct
}