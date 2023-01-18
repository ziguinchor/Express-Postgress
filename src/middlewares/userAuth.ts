import { NextFunction } from "express";
import { expressjwt } from "express-jwt"
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()



export const requireSignin = expressjwt({
    algorithms:["HS256"],
    secret: "123456789",
    requestProperty:'auth'
})




export const generateToken: Function = (id: string): string => {
  return jwt.sign(id, "123456", { expiresIn: "1h" })
};





