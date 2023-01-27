import { User } from "./../models/user";
import { Request, Response } from "express";
import { client } from "../config/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const user: User = new User();

// creer un user
export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await user.createUser(req.body);
    return res.status(201).json(newUser);
  } catch (err) {
    res.status(500).send("Something went wrong !");
  }
};

// recuperer la liste d'utilisaeurs
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await user.gestUsers();
    return res.json(users);
  } catch (err) {
    res.status(500).send("Something went wrong !");
  }
};

// recuperer un user par id
export const showUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);

    const oneUser = await user.userById(userId);

    return res.json(oneUser);
  } catch (err) {
    res.status(500).send("Something went wrong !");
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);

    const userDeleted = await user.userDelete(userId);

    return res.status(204).json(userDeleted);
  } catch (err) {
    res.status(500).send("Something went wrong !");
  }
};
