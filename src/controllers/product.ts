import { NextFunction, Request, Response } from "express";
import Product, { IProduct, TProduct } from "../models/Product";

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {name, type, desc, color, img, size, price, customizable} = req.body;
        const product: TProduct = {name, type, desc, color, img, size, price, customizable};
        const newProduct = await new Product(product).save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = req.query.category;
        const sort = req.query.sort;
        const customizable = req.query.custom;

        let products;
        if(category) {
            products = await Product.find({ type: category});
        } else if(sort) {
            products = await Product.find().sort({createdAt: -1});
        } else if(customizable) {
            if(customizable === "true")
                products = await Product.find({customizable: true});
            else if(customizable === "false")
                products = await Product.find({customizable: false});
        }
        else 
            products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {new: true});
        res.status(201).json(updatedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        await Product.findByIdAndDelete(id);
        res.status(201).json(`product-${id} has been removed successfully.`);
    } catch (error) {
        res.status(500).json(error);
    }
};