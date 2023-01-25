import { Client, Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const prodClient = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432,
});

const testClient = new Client({
  user: process.env.TEST_DB_USER,
  host: process.env.TEST_DB_HOST,
  database: process.env.TEST_DB,
  password: process.env.TEST_DB_PASSWORD,
  port: 5432,
});

export const client = process.env.NODE_ENV === "test" ? testClient : prodClient;
