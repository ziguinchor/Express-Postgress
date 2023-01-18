import { Product } from './../models/product';
import { client } from "../config/database";
import { Request, Response } from "express";

const product = new Product()

// methode pour creer un produit 
export const createProduct = async (req: Request, res: Response) => {

    
      let productCreate = await product.create(req.body)
      res.json(productCreate)
    
}

// methode pour recuperer la liste des produit 
export const getAllProduct = async (req: Request, res: Response) => {

    let products = await product.getProducts()
    res.json(products)
}

// recuperer un produit par id
export const showProduct = async (req: Request, res: Response) => {

      let productId = parseInt(req.params.id)
      let oneProduct = await product.getProductById(productId)
       res.json(oneProduct)
}

export const updateProduct = async (req: Request, res: Response) => {

      let productId = parseInt(req.params.id)

      let productUpdated = await product.update(req.body,productId)
      res.json(productUpdated)
} 

export const deleteProduct = async (req: Request, res:Response) => {

     let productId = parseInt(req.params.id)
     let productDeleted = await product.delete(productId)
      res.json(productDeleted)

}

