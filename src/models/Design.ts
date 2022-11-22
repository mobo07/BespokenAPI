import { model, Schema, Document } from "mongoose";

export type TDesign = {
    name: string,
    img: string,
    price: number,
}

export interface IDesign extends Document {};

const DesignSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
}, {timestamps: true});

export default model<IDesign>("Design", DesignSchema);