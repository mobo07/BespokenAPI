import express from "express";
import { createOrder, deleteOrder, getOrder, getOrders, updateOrder } from "../controllers/order";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../utils/verifyToken";

const router = express.Router();

//CREATE ORDER
router.post("/:reference", verifyToken, createOrder);

//GET USER ORDERS
router.get("/:id", verifyTokenAndAuthorization, getOrder);

//GET ALL ORDERS
router.get("/", verifyTokenAndAdmin, getOrders);

//UPDATE ORDER
router.put("/:id", verifyTokenAndAdmin, updateOrder);

//DELETE ORDER
router.delete("/:id", verifyTokenAndAdmin, deleteOrder);

export default router;