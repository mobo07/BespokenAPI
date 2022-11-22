import { Schema, model, Document } from "mongoose";

export type TProduct = {
    name: string,
    type: string,
    desc: string,
    color: string[],
    img: string,
    customizable: boolean,
    size: string[],
    price: number,
    inStock?: boolean,
};

export interface IProduct extends Document {};

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    }, 
    type: {
        type: String,
        required: true,
    }, 
    desc: {type: String},
    color: {
        type: Array,
        required: true,
    },
    img: {
        type: String,
        required: true,
    }, 
    customizable: {
        type: Boolean,
        required: true,
    },
    size: {
        type: Array,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    inStock: {
        type: Boolean,
        default: true,
    } 
});

export default model<IProduct>("Product", ProductSchema);