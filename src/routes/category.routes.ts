import { Router } from "express";
import {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} from "../services/category/category.controller.js";

const router = Router();

router.post("/", createCategory);
router.get("/", getAllCategories);
router.get("/:id", getSingleCategory);
router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export const categoryRoutes = router;