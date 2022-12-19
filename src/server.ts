import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth";
import userRoute from "./routes/user";
import productRoute from "./routes/product";
import designRoute from "./routes/design";
import orderRoute from "./routes/order";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_URL!)
.then(() => console.log("DB connected successfully"))
.catch(err => console.log(err));

app.use(cookieParser());
app.use(express.json());
app.use(cors());

interface ResponseError extends Error {
    status?: number;
}

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/designs", designRoute);
app.use("/api/orders", orderRoute);

app.use((err: ResponseError, req: Request, res: Response, next: NextFunction) => {
    let errStatus = err.status || 500;
    let errMsg = err.message || "Something went wrong";

    return res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
    });
});

app.listen(process.env.PORT || 5000, () => {
    console.log("server is running...");
});
