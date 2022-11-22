import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ReqUser } from "../types/Request";
import { Token } from "../types/Token";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.token as string;
    if(!authHeader)
        return res.status(401).json("Not Authenticated!");
    if(authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
            if(err) res.status(403).json("Invalid Token, please login again.");
            else {
                (req as ReqUser).user = user as Token;
                next();
            }
        });
    }
    
}

export const verifyTokenAndAuthorization = (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, () => {
        if(req.params.id === (req as ReqUser).user.id) next(); 
        else
            res.status(403).json("Invalid Query");
    });
};

export const verifyTokenAndAdmin = (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, () => {
        if((req as ReqUser).user.isAdmin) next();
        else res.status(403).json("Not Authorized");
    });
};