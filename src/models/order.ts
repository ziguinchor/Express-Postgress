import { client } from "../config/database";

export class Order {
  async createOrder(quantity: any, id_product: number, id_user: number) {
    try {
      // const sql = "INSERT INTO orders (id_user) VALUES($1, $2) RETURNING *"

      const order = (
        await client.query(
          `INSERT INTO orders (id_user) VALUES($1) RETURNING *`,
          [id_user]
        )
      ).rows[0];
      const orderId: number = order.id;

      return (
        await client.query(
          `INSERT INTO order_products (id_order, id_product, quantity) VALUES($1, $2, $3)  RETURNING id_order, id_product, quantity`,
          [orderId, id_product, quantity]
        )
      ).rows[0];
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number) {
    try {
      return (
        await client.query(
          `UPDATE orders SET status=true WHERE id=$1 RETURNING *`,
          [id]
        )
      ).rows[0];
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id: number) {
    try {
      return (await client.query(`DELETE FROM orders WHERE id=$1`, [id]))
        .rows[0];
    } catch (error) {
      console.log(error);
    }
  }

  async getOrderById(id: number) {
    try {
      return (
        await client.query(`SELECT * FROM orders WHERE id = $1  LIMIT 1`, [id])
      ).rows[0];
    } catch (error) {
      console.log(error);
    }
  }

  async getOrders() {
    try {
      // -- SELECT orders.id,quantity,id_product,id_user,status,name as Product_name,price,category,email,firstname as customer_firstName,lastname as customer_lastName
      // -- FROM orders LEFT JOIN products ON orders.id_product = products.id LEFT JOIN users ON orders.id_user = users.id
      return (
        await client.query(
          `SELECT * FROM order_products 
          LEFT JOIN orders
            ON order_products.id_order = orders.id
          LEFT JOIN products
            ON order_products.id_product = products.id
          LEFT JOIN users
            ON orders.id_user = users.id
            `
        )
      ).rows;
    } catch (error) {
      console.log(error);
    }
  }
}
