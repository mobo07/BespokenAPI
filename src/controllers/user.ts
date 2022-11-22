import {Request, Response, NextFunction} from "express"
import User, { IUser } from "../models/User";
import bcrypt from "bcrypt";

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
   
        if(req.body.password) {
            const salt = bcrypt.genSaltSync(10);
            req.body.password = bcrypt.hashSync(req.body.password, salt);
        }
        const updatedUser: IUser | null = await User.findByIdAndUpdate(id, req.body, {new: true});
        const {password, ...otherDetails} = (updatedUser as any)._doc;
        return res.status(201).json(otherDetails);
    } catch (err) {
        return res.status(500).json(err);
    }
};