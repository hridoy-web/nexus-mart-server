import { Router } from "express";
import { addToCart, getUserCart, removeFromCart } from "../services/cart/cart.controller.js";

const router = Router();

router.post("/", addToCart);
router.get("/user/:userId", getUserCart);
router.delete("/:id", removeFromCart);

export const cartRoutes = router;