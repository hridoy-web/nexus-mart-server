import { Router } from "express";
import {
  addToCart,
  getUserCart,
  removeFromCart,
  updateCartQuantity,
} from "../services/cart/cart.controller.js";

const router = Router();

router.post("/", addToCart);
router.get("/user/:userId", getUserCart);
router.patch("/:id", updateCartQuantity);
router.delete("/:id", removeFromCart);

export const cartRoutes = router;