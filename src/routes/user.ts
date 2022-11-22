import express from "express";
import { updateUser } from "../controllers/user";
import { verifyTokenAndAuthorization } from "../utils/verifyToken";
const router = express.Router();

router.put("/:id", verifyTokenAndAuthorization, updateUser);

export default router;