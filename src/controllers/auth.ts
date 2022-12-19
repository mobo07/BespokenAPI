import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser, TUser } from "../models/User";
import { createError } from "../utils/createError";
import bcrypt from "bcrypt";
import { Token } from "../types/Token";
import cookieParser from "cookie-parser";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { firstname, lastname, password, email, isAdmin } = req.body;
        let existingUser = await User.findOne({email});
        if(existingUser) 
            return next(createError(403, "User with the given email already exists!"));

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const user: TUser = { firstname, lastname, email, password: hashedPassword, isAdmin: !isAdmin ? false : true };
        const newUser = await new User(user).save();
        return res.status(201).json(newUser);

    } catch (err) {
        return res.status(500).json(err);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user: IUser | null = await User.findOne({email});
        if(!user || !bcrypt.compareSync(password, user.password)) 
            return next(createError(401, "Wrong Credentials"));
        
        const cred: Token = {id: user._id, isAdmin: user.isAdmin!};
        const token = jwt.sign(cred, process.env.JWT_SECRET!, {expiresIn: "1d"});
        const {password: userPassword, ...otherDetails} = (user as any)._doc;
        return res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({...otherDetails, token});
    } catch (err) {
        return res.status(500).json(err);
    }
};