import express from "express";
import { login, register } from "../controllers/auth";
const router = express.Router();

// CREATE USER
router.post("/register", register);
router.post("/login", login);

export default router;