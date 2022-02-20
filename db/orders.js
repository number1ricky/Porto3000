const client = require("./client");

async function handleSelectAllFromOrders() {
    try {
        const {rows: orders} = await client.query(`
            SELECT * 
            FROM orders
        `)
        return orders
    } catch (error) {
        throw error;
    };
};

async function getOrderById (id) {
    try{
        const {rows: [order]} = await client.query(`
            SELECT * 
            FROM orders
            WHERE id=$1
        `, [id])

        const {rows: orderProducts} = await client.query(`
            SELECT op."orderId", p.name
            FROM order_products AS op
            INNER JOIN products AS p ON op. "productId" = p.id
            WHERE "orderId"=$1;
        `, [id]);

        order.products = orderProducts ? orderProducts.map((op) => op.name) : [];

        return order;
    } catch (error) {
        throw error;
    };
};

async function getAllOrders() {
    try {
        const orders = await handleSelectAllFromOrders()
        const {rows: orderProducts} = await client.query(`
            SELECT op."orderId", p.name
            FROM order_products AS op
            INNER JOIN products AS p ON op."productId" = p.id;
        `);
        orders.forEach((order) => {
            const productsForOrder = orderProducts.filter((orderProduct) => orderProduct.orderId === order.id)
            order.products = productsForOrder.map((op) => op.name)
        })
        return orders;
    } catch (error) {
        throw error;
    };
};

async function getOrdersByUser({id}) {
    try {
        const {rows: orders} = await client.query(`
            SELECT * 
            FROM orders
            WHERE "userId"=$1
        `, [id])

        const {rows: [orderProducts]} = await client.query(`
            SELECT op."orderId", p.name
            FROM order_products AS op
            INNER JOIN products AS p ON op. "productId" = p.id
            WHERE "userId" = $1
        `, [id]);

        orders.forEach((order) => {
            const productsForOrder = orderProducts.filter((orderProduct) => orderProduct.orderId === order.id)
            order.products = productsForOrder.map((op) => op.name)
        });

        return orders;
    } catch (error) {
        throw error;
    };
};

async function getOrdersByProduct({id}) {
    try {
        const {rows: orders} = await client.query(`
            SELECT o.* 
            FROM orders as o
            INNER JOIN order_products AS op ON op."orderId" = o.id
            WHERE "productId"=$1
        `, [id])

        const {rows: [orderProducts]} = await client.query(`
            SELECT op."orderId", p.name
            FROM order_products AS op
            INNER JOIN products AS p ON op."productId" = p.id
            WHERE "productId" = $1;
        `, [id]);

        orders.forEach((order) => {
            const productsForOrder = orderProducts.filter((orderProduct) => orderProduct.orderId === order.id)
            order.products = productsForOrder.map((op) => op.name)
        });

        return orders;
    } catch (error) {
        throw error;
    }
};

async function getCartByUser({id}) {
    try {
        const {rows: [order]} = await client.query(`
            SELECT * 
            FROM orders
            WHERE "userId"=$1
            AND status = 'created';
        `, [id])

        if(!order) return null;
        const {rows: orderProducts } = await client.query(`
            SELECT op."orderId", p.name, op.quantity, p.stripe_price_id
            FROM order_products AS op
            INNER JOIN products AS p ON op. "productId" = p.id
            WHERE "orderId" = $1;
        `, [order.id]);
        
        order.products = orderProducts ? orderProducts.map((op) => {
            return { name: op.name, quantity: op.quantity, stripe_price_id: op.stripe_price_id }
        }) : [];

        return order;
    } catch (error) {
        throw error;
    };
};

async function createOrder({status, userId}) {
    try {
        const {rows: [order]} = await client.query(`
            INSERT INTO orders(status, "userId")
            VALUES ($1, $2)
            RETURNING *
        `, [status, userId]);
        return order;
    } catch (error) {
        throw error;
    }
};

async function updateOrder({ id, ...fields }) {
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
        const {rows: [order]} = await client.query(`
            UPDATE orders 
            SET ${setStr}
            WHERE id=${ id }
            RETURNING *;
        `, Object.values(toUpdate));
          return order;
      } catch (error) {
        throw error;
      };
  };

async function completeOrder({ id }) {
    try {
        const {rows: [order]} = await client.query(`
            UPDATE orders
            SET status = 'completed'
            WHERE id=$1
            RETURNING *
        `, [id]);
        return order;
    } catch (error){
        throw error;
    };
};

async function cancelOrder({ id }) {
    try {
        const {rows: [order]} = await client.query(`
            Update orders
            SET status = 'canceled'
            WHERE id=$1
            RETURNING *
        `, [id]);
    } catch (error) {
        throw error;
    };
};

module.exports = {
    getOrderById,
    getAllOrders,
    getOrdersByUser,
    getOrdersByProduct,
    getCartByUser,
    createOrder,
    updateOrder,
    completeOrder,
    cancelOrder
}