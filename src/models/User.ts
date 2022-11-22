import { Document, model, Schema } from "mongoose";

export type TUser = {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    isAdmin?: boolean,
}

export interface IUser extends TUser, Document {};

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true});

const User = model<IUser>("User", UserSchema);

export default User;