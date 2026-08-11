import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { createProduct, deleteProduct, getAllProducts, getHomeProducts, getSingleProduct, updateProduct } from "../services/product/product.controller.js";

const router = Router();

// Home page dedicated route
router.get("/home", getHomeProducts);

router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);

// private route
router.post("/", createProduct);
router.patch("/:id", auth("ADMIN"), updateProduct);
router.delete("/:id", auth("ADMIN"), deleteProduct);

export const productRoutes = router;