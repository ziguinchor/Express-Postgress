import supertest from "supertest";
import { client } from "../../config/database";

// import app
import { app, server } from "../../index";

const request = supertest(app);

type User = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

describe("Users Endpoint test", () => {
  afterAll(() => {
    server.close();
    client.end();
  });

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

  it("Get All Users", async () => {
    const res = await request
      .get("/api/users/all")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  it("Get Sing User", async () => {
    const res = await request
      .get("/api/users/1")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  // it("Update user", async () => {
  //   const res = await request
  //     .patch("/api/users/ " + userId)
  //     .send({
  //       firstName: "chris",
  //       lastName: "dioe",
  //       email: "chris@gmail.com",
  //       password: "98766545",
  //     })
  //     .set("Authorization", `Bearer ${token}`);
  //   expect(res.status).toBe(200);
  // });

  it("Delete User", async () => {
    const res = await request
      .delete("/api/users/delete/" + userId)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(204);
  });
});
