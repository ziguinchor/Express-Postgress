import { Product } from "./../models/product";
import { client } from "../config/database";
import { Request, Response } from "express";

const product = new Product();

// methode pour creer un produit
export const createProduct = async (req: Request, res: Response) => {
  try {
    let productCreate = await product.create(req.body);
    res.status(201).json(productCreate);
  } catch (err) {
    res.status(500).send("Something went wrong !");
  }
};

// methode pour recuperer la liste des produit
export const getAllProduct = async (req: Request, res: Response) => {
  try {
    let products = await product.getProducts();
    res.json(products);
  } catch (err) {
    res.status(500).send("Something went wrong !");
  }
};

// recuperer un produit par id
export const showProduct = async (req: Request, res: Response) => {
  try {
    let productId = parseInt(req.params.id);
    let oneProduct = await product.getProductById(productId);
    res.json(oneProduct);
  } catch (err) {
    res.status(500).send("Something went wrong !");
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    let productId = parseInt(req.params.id);

    let productUpdated = await product.update(req.body, productId);
    res.status(200).json(productUpdated);
  } catch (err) {
    res.status(500).send("Something went wrong !");
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    let productId = parseInt(req.params.id);
    let productDeleted = await product.delete(productId);
    res.status(204).json(productDeleted);
  } catch (err) {
    res.status(500).send("Something went wrong !");
  }
};
