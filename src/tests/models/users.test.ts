import { User } from "../../models/user";
import { app, server } from "../../index";
import { client } from "../../config/database";

type UserType = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const testUser = {
  firstName: "test",
  lastName: "test",
  email: "test@test.com",
  password: "testtest",
};

const userStore = new User();

describe("User Model", () => {
  afterAll(() => {
    server.close();
    client.end();
  });

  it("create method should create a user", async () => {
    const createdUser: any = await userStore.createUser(testUser);

    if (createdUser) {
      const { firstName, lastName } = createdUser;
      expect(firstName).toBe(testUser.firstName);
      expect(lastName).toBe(testUser.lastName);
    }
    await userStore.userDelete(createdUser.id);
  });

  it("should return a list of all users", async () => {
    const usersList: any = await userStore.gestUsers();
    expect(Array.isArray(usersList)).toBe(true);
  });

  it("should get a single user", async () => {
    const usersList: any = await userStore.gestUsers();
    const id = usersList[0].id;
    if (id) {
      const userById = await userStore.userById(id);
      expect(userById.id).toEqual(id);
    } else {
      return true;
    }
  });

  it("remove method should remove the user", async () => {
    const createdUser: any = await userStore.createUser(testUser);
    const id = createdUser.id;
    await userStore.userDelete(id);
    const userById = await userStore.userById(id);
    expect(userById).toBe(undefined);
  });
});
