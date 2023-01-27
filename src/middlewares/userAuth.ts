import { NextFunction } from "express";
import { expressjwt } from "express-jwt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwtSecret: string = process.env.JWT_SECRET as string;
console.log(jwtSecret);

export const requireSignin = expressjwt({
  algorithms: ["HS256"],
  secret: jwtSecret,
  requestProperty: "auth",
});

export const generateToken: Function = (id: string): string => {
  return jwt.sign(id, "123456", { expiresIn: "1h" });
};
