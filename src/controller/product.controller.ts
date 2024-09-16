import { Request, Response } from "express";
import * as productService from "../services/product.service";
import { CreateProductDTO } from "../dto/create-product.dto";
import { UpdateProductDTO } from "../dto/update-product.dto";


export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, category } = req.body;
  const productData = new CreateProductDTO(name, description, price, category);

  const response = await productService.createProduct(productData);
  res.status(response.status === "success" ? 201 : 500).json(response);
};

export const getProduct = async (req: Request, res: Response) => {
  const response = await productService.getProduct(req.params.productId);
  res.status(200).json(response);
};

export const getAllProducts = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 10;

  const response = await productService.getAllProducts(page, limit);

  res.status(response.statusCode).json(response);
};


export const updateProduct = async (req: Request, res: Response) => {
  const { name, description, price, category } = req.body;
  const productData = new UpdateProductDTO(name, description, price, category);

  const response = await productService.updateProduct(
    req.params.productId,
    productData
  );
  res.status(201).json(response);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const response = await productService.deleteProduct(req.params.productId);
  res.status(200).json(response);
};
