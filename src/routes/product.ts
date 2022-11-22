import express from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/product";
import { verifyTokenAndAdmin } from "../utils/verifyToken";
const router = express.Router();

// CREATE PRODUCT
router.post("/", verifyTokenAndAdmin, createProduct);

// GET ALL PRODUCT
router.get("/", getProducts);

// GET A SINGLE PRODUCT
router.get("/:id", getProduct);

//UPDATE PRODUCT
router.put("/:id", verifyTokenAndAdmin, updateProduct);

//DELETE PRODUCT
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);

export default router;