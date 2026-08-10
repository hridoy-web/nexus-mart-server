import { Router } from "express";
import {
  createReview,
  getReviewsByProduct,
  deleteReview,
} from "../services/review/review.controller.js";

const router = Router();

router.post("/", createReview);
router.get("/product/:productId", getReviewsByProduct);
router.delete("/:id", deleteReview);

export const reviewRoutes = router;