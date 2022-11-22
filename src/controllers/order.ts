import { NextFunction, Request, Response } from "express";
import Order, { TOrder } from "../models/Order";
import axios from "axios";

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {reference} = req.params
        axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
            }
        })
        .then(async (response) => {
            const order: TOrder = {
                userId: req.body.userId,
                products: req.body.products,
                address: req.body.address,
            }
            if(response.data.data.status !== "success") {
                order.status = "abandoned";
                order.amount = response.data.data.amount/100;
                const newOrder = await new Order(order).save();
                return res.status(400).json({status: false, message: "Transaction failed.", order: newOrder});
            }
            order.status = "paid";
            order.amount = response.data.data.amount/100;
            const newOrder = await new Order(order).save();
            return res.status(201).json({status: true, message: "Order placed successfully!", order: newOrder});
        })
        .catch(error => {
            console.log('error', error)
            if(error.response){
              return res.status(400).json({ status: false, message: 'Transaction failed.', error: error.response.data.message || JSON.stringify(error) });
            }
            return res.status(400).json({ status: false, message: 'Transaction failed.', error });
          });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {new: true});
        res.status(201).json(updatedOrder);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        await Order.findByIdAndDelete(id);
        res.status(200).json(`order-${id} has been deleted successfully.`);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const order = await Order.find({userId: id});
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json(error);
    }
}