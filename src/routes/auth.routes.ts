import { Router } from "express";
import { registerUser, loginUser } from "../services/user/user.controller.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export const authRoutes = router;