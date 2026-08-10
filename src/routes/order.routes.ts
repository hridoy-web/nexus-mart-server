import { Router } from "express";
import {
  createOrder,
  getUserOrders,
} from "../services/order/order.controller.js";

const router = Router();

router.post("/", createOrder);
router.get("/user/:userId", getUserOrders);

export const orderRoutes = router;