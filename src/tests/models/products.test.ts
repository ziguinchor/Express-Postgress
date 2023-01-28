import { User } from "../../models/user";
import { app, server } from "../../index";
import { client } from "../../config/database";
import { Product } from "../../models/product";

type UserType = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type productType = {
  id?: string;
  name: string;
  price: string;
  category: string | number;
};

const testProduct = {
  name: "test",
  price: 14,
  category: "test@test.com",
};

const productStore = new Product();

describe("Product Model", () => {
  afterAll(() => {
    server.close();
    client.end();
  });

  it("create method should create a product", async () => {
    const createdProduct: any = await productStore.create(testProduct);

    if (createdProduct) {
      const { name, price } = createdProduct;
      expect(name).toBe(testProduct.name);
      expect(price).toBe("" + testProduct.price);
    }
    await productStore.delete(createdProduct.id);
  });

  it("should return a list of all products", async () => {
    const productsList: any = await productStore.getProducts();
    expect(Array.isArray(productsList)).toBe(true);
  });

  it("should get a single product", async () => {
    const productsList: any = await productStore.getProducts();
    const id = productsList[0].id;
    if (id) {
      const productById = await productStore.getProductById(id);
      expect(productById.id).toEqual(id);
    } else {
      return true;
    }
  });

  it("should remove a product", async () => {
    const createdProduct: any = await productStore.create(testProduct);
    const id = createdProduct.id;
    await productStore.delete(id);
    const productById = await productStore.getProductById(id);
    expect(productById).toBe(undefined);
  });
});
