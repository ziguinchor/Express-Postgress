import { client } from "../config/database";

export class Order {
  async createOrder(quantity: any, id_product: number, id_user: number) {
    try {
      client.query(
        `INSERT INTO orders (quantity,id_product,id_user) VALUES($1,$2,$3)`,
        [quantity, id_product, id_user]
      );
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number) {
    try {
      return (
        await client.query(`UPDATE orders SET status=true WHERE id=$1`, [id])
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

  async getOrders() {
    try {
      return (
        await client.query(
          `SELECT orders.id,quantity,id_product,id_user,status,name as Product_name,price,category,email,firstname as customer_firstName,lastname as customer_lastName
          FROM orders LEFT JOIN products ON orders.id_product = products.id LEFT JOIN users ON orders.id_user = users.id`
        )
      ).rows;
    } catch (error) {
      console.log(error);
    }
  }
}
