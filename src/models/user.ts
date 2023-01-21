import { client } from "../config/database";
import { Request, Response } from "express";
import { PoolClient, QueryResult } from "pg";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

export class User {
  hash_password(passowrd: string) {
    const salt = parseInt(process.env.SALT as string, 10);
    return bcrypt.hashSync(`${passowrd} ${process.env.PEPPER}`, salt);
  }

  async createUser(user: any) {
    let { firstName, lastName, email, password } = user;
    //    const result: QueryResult =  client.query(`INSERT INTO users(firstName,lastName,email,password) VALUES($1,$2,$3,$4)`,
    //    [firstName,lastName,email,password])

    const sql: string = `INSERT INTO users (firstName, lastName, email, password) VALUES($1, $2, $3, $4) RETURNING *`;
    const result: QueryResult = await client.query(sql, [
      firstName,
      lastName,
      email,
      this.hash_password(password),
    ]);
    const id = result.rows[0].id;
    const token = jwt.sign({ id }, process.env.JWT as string, {
      expiresIn: "1h",
    });

    return {
      auth: true,
      token,
    };
  }

  async gestUsers() {
    try {
      return (
        await client.query(`SELECT  id, email, firstName, lastName FROM users`)
      ).rows;
    } catch (error) {
      console.log(error);
    }
  }

  async userById(id: number) {
    try {
      return (await client.query(`SELECT * from users WHERE id = $1`, [id]))
        .rows[0];
    } catch (error) {
      console.log(error);
    }
  }

  async userDelete(id: number) {
    try {
      (await client.query(`DELETE FROM users WHERE id=$1`, [id])).rows[0];
    } catch (error) {
      console.log(error);
    }
  }
}
