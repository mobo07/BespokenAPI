import { JwtPayload } from "jsonwebtoken";

export interface Token extends JwtPayload {
    id: string;
    isAdmin: boolean;
};