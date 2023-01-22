import supertest from "supertest";
import { client } from "../../config/database";
import dotenv, { config } from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
// import app
import { app } from "../../index";
import { Order } from "../../models/order";

const request = supertest(app);

type OrderType = {
  id?: string;
  productId: number;
  quantity: number;
  userId: number;
};

const token = jwt.sign("1", process.env.JWT as string);

let orderId: number;

type User = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

describe("Orders Endpoint test", () => {
  let token: string;
  let userId: number;

  it("Sign up", async () => {
    const newUser: User = {
      firstName: "Mohammed",
      lastName: "Ezzouhri",
      email: "moez@gmail.com",
      password: "12345667",
    };

    await request
      .post("/api/users/create")
      .send(newUser)
      .expect((res) => {
        expect(res.status).toBe(201);
        token = res.body.token;
        userId = parseInt(res.body.id);
      });
  });

  it("Create Order", async () => {
    const testOrder: OrderType = {
      productId: 1,
      quantity: 2,
      userId: userId,
    };

    await request
      .post("/api/orders")
      .send(testOrder)
      .set("Authorization", `Bearer ${token}`)
      .expect((res) => {
        orderId = parseInt(res.body.id_order);
        expect(res.status).toBe(201);
      });
  });

  it("Get All Orders", async () => {
    const res = await request
      .get("/api/orders/all")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  it("Complete Order", async () => {
    const testOrder: OrderType = {
      productId: 1,
      quantity: 2,
      userId: userId,
    };

    const res = await request
      .patch("/api/orders/completed/" + orderId)
      .set("Authorization", `Bearer ${token}`)
      .send(testOrder);
    expect(res.status).toBe(200);
  });

  it("Delete Order", async () => {
    const res = await request
      .delete("/api/orders/delete/" + orderId)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(204);
  });
});
