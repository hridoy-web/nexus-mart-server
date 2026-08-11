import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../services/product/product.controller.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);

// private route
router.post("/", createProduct);
router.patch("/:id", auth("ADMIN"), updateProduct);
router.delete("/:id", auth("ADMIN"), deleteProduct);

export const productRoutes = router;