import { User } from "../../models/user";
import { app, server } from "../../index";
import { client } from "../../config/database";
import { Product } from "../../models/product";
import { Order } from "../../models/order";

type UserType = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type orderType = {
  id?: string;
  quantity: any;
  id_product: number;
  id_user: number;
};

const orderStore = new Order();
const userStore = new User();
const productStore = new Product();

let createdUser;

const testUser = {
  firstName: "test",
  lastName: "test",
  email: "test@test.com",
  password: "testtest",
};

const testProduct = {
  name: "test",
  price: 14,
  category: "test@test.com",
};

type productType = {
  id?: string;
  name: string;
  price: string;
  category: string | number;
};

// userStore
//   .createUser(testUser)
//   .then((u) => {
//     createdUser = { ...u };
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// const testOrder = {
//   quantity: 50,
//   id_product: 999999999,
//   // @ts-ignore
//   id_user: createdUser.id,
// };

describe("Order Model", () => {
  afterAll(() => {
    server.close();
    client.end();
  });

  it("create method should create an order", async () => {
    const createdUser = userStore.createUser(testUser);
    const createdProduct: any = await productStore.create(testProduct);
    const testOrder = {
      quantity: 50,
      id_product: createdProduct.id,
      // @ts-ignore
      id_user: createdUser.id,
    };
    const createdOrder: any = await orderStore.createOrder(
      testOrder.quantity,
      testOrder.id_product,
      testOrder.id_user
    );

    if (createdOrder) {
      const { id_product, quantity } = createdOrder;
      expect(id_product).toBe(testOrder.id_product);
      expect(quantity).toBe(testOrder.quantity);
    }
    await orderStore.delete(createdOrder.id);
    // @ts-ignore
    userStore.userDelete(createdUser.id);
  });

  it("should return a list of all orders", async () => {
    const ordersList: any = await orderStore.getOrders();
    expect(Array.isArray(ordersList)).toBe(true);
  });

  it("should get a single order", async () => {
    const ordersList: any = await orderStore.getOrders();
    const id = ordersList[0].id;
    if (id) {
      const orderById = await orderStore.getOrderById(id);
      expect(orderById.id).toEqual(id);
    } else {
      return true;
    }
  });

  it("should remove an order", async () => {
    const createdUser = userStore.createUser(testUser);
    const createdProduct: any = await productStore.create(testProduct);
    const testOrder = {
      quantity: 50,
      id_product: createdProduct.id,
      // @ts-ignore
      id_user: createdUser.id,
    };
    const createdOrder: any = await orderStore.createOrder(
      testOrder.quantity,
      testOrder.id_product,
      testOrder.id_user
    );
    const id = createdOrder.id;
    await orderStore.delete(id);
    const orderById = await orderStore.getOrderById(id);
    expect(orderById).toBe(undefined);
    // @ts-ignore
    userStore.userDelete(createdUser.id);
  });
});
