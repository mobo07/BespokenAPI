import { Request } from "express";
import { Token } from "./Token";


export interface ReqUser extends Request {
    user: Token;
}