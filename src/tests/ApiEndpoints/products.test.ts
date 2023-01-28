import { Jwt } from "jsonwebtoken";
import supertest from "supertest";
import { client } from "../../config/database";
import dotenv, { config } from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
// import app
import { app, server } from "../../index";
import { Product } from "../../models/product";

const request = supertest(app);

type ProductType = {
  id?: string;
  name: string;
  price: number;
  category: string;
};

const token = jwt.sign("1", process.env.JWT as string);
let productId: number;

describe("Product Endpoint test", () => {
  afterAll(() => {
    server.close();
    client.end();
  });

  const testProduct: ProductType = {
    name: "test product",
    price: 10,
    category: "test category",
  };

  it("Create Product", async () => {
    const testProduct: ProductType = {
      name: "test product",
      price: 10,
      category: "test category",
    };

    await request
      .post("/api/products/create")
      .send(testProduct)
      .set("Authorization", `Bearer ${token}`)
      .expect((res) => {
        productId = res.body.id;
        expect(res.status).toBe(201);
      });
  });

  it("Get All Products", async () => {
    const res = await request
      .get("/api/products/all")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  it("Get One Product", async () => {
    const res = await request
      .get("/api/products/" + productId)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  it("Update Product", async () => {
    const testProduct: ProductType = {
      name: "test product",
      price: 10,
      category: "test category",
    };

    const res = await request
      .put("/api/products/update/" + productId)
      .set("Authorization", `Bearer ${token}`)
      .send(testProduct);
    expect(res.status).toBe(200);
  });

  it("Delete Product", async () => {
    const res = await request
      .delete("/api/products/delete/" + productId)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(204);
  });
});
