import express from "express";
import { createDesign, deleteDesign, getDesign, getDesigns, updateDesign } from "../controllers/design";
import { verifyTokenAndAdmin } from "../utils/verifyToken";
const router = express.Router();

// CREATE DESIGN
router.post("/", verifyTokenAndAdmin, createDesign);

// GET ALL DESIGNS
router.get("/", getDesigns);

// GET A SINGLE DESIGN
router.get("/:id", getDesign);

//UPDATE DESIGN
router.put("/:id", verifyTokenAndAdmin, updateDesign);

//DELETE DESIGN
router.delete("/:id", verifyTokenAndAdmin, deleteDesign);

export default router;