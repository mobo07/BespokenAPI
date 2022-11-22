import { NextFunction, Request, Response } from "express";
import Design, { IDesign, TDesign } from "../models/Design";

export const createDesign = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {name, img, price} = req.body;
        const design: TDesign = {name, img, price};
        const newDesign = await new Design(design).save();
        res.status(201).json(newDesign);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getDesigns = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // const category = req.query.category;
        // const sort = req.query.sort;

        // let Designs;
        // if(category) {
        //     Designs = await Design.find({ type: category});
        // } else if(sort) {
        //     Designs = await Design.find().sort({createdAt: -1});
        // }
        // else 
            const designs = await Design.find();
        res.status(200).json(designs);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getDesign = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const design = await Design.findById(id);
        res.status(200).json(design);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const updateDesign = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const updatedDesign = await Design.findByIdAndUpdate(id, req.body, {new: true});
        res.status(201).json(updatedDesign);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteDesign = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        await Design.findByIdAndDelete(id);
        res.status(201).json(`design-${id} has been removed successfully.`);
    } catch (error) {
        res.status(500).json(error);
    }
};