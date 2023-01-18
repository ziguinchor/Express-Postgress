import { Order } from './../models/order';
import { Request, Response } from "express";
import { client } from "../config/database";


const order = new Order()

// create order
export const createOrder = async (req: any, res: Response) => {

   let productId = parseInt(req.params.productId)
   let userId = parseInt(req.auth.id)

   let orderCreated = await  order.createOrder(req.body.quantity,productId,userId)
       res.json(orderCreated)
}

// complete order 
export const complteOrder = async (req: Request, res: Response) => {

   let orderId = parseInt(req.params.id)

   let orderUpdated = await order.update(orderId)

       res.json(orderUpdated)
}

// delete orders 
export const deleteOrder = async (req: Request, res: Response) => {

      let orderId = parseInt(req.params.id)

      let orderDeleted = await order.delete(orderId)
          res.json({orderDeleted})
}

// methode pour recuperer tous les ordres
export const getAllOrders = async (req: Request, res: Response) => {

      const orders = await order.getOrders()
          res.json(orders)
}