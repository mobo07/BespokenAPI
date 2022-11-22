import { model, Schema, Document } from "mongoose";

export interface IProduct {
    productId: string;
    designImg?: string;
    customizedOutfitImg?: string;
    quantity: number;
};

export type TOrder = {
    userId: string,
    products: IProduct,
    amount?: number,
    status?: string,
    address: string, 
}

export interface IOrder extends Document {};

const OrderSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    products: [
        {
            productId: String,
            designImg: String,
            customizedOutfitImg: String,
            quantity: {type: Number, default: 1}
        }
    ],
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
    },
    address: {
        type: String,
        required: true
    }
});

export default model<IOrder>("Order", OrderSchema);