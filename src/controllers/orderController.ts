import { Order } from "./../models/order";
import { Request, Response } from "express";
import { client } from "../config/database";

const order = new Order();

// create order
export const createOrder = async (req: any, res: Response) => {
  try {
    let productId = parseInt(req.body.productId);
    let quantity = parseInt(req.body.quantity);
    let userId = parseInt(req.auth.id) || req.body.userId;

    let orderCreated = await order.createOrder(quantity, productId, userId);
    res.status(201).json(orderCreated);
  } catch (err) {
    res.status(500).send("Something went wrong !");
  }
};

// complete order
export const complteOrder = async (req: Request, res: Response) => {
  try {
    let orderId = parseInt(req.params.id);

    let orderUpdated = await order.update(orderId);

    res.json(orderUpdated);
  } catch (err) {
    res.status(500).send("Something went wrong !");
  }
};

// delete orders
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    let orderId = parseInt(req.params.id);

    let orderDeleted = await order.delete(orderId);
    res.status(204).json({ orderDeleted });
  } catch (err) {
    res.status(500).send("Something went wrong !");
  }
};

// methode pour recuperer tous les ordres
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await order.getOrders();
    res.json(orders);
  } catch (err) {
    res.status(500).send("Something went wrong !");
  }
};
