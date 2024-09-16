import { Router } from "express";
import * as productController from "../controller/product.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

router.post("/", authMiddleware, productController.createProduct);

router.get("/:productId", productController.getProduct);

router.get("/", productController.getAllProducts);

router.put("/:productId", authMiddleware, productController.updateProduct);

router.delete("/:productId", authMiddleware, productController.deleteProduct);

export default router;
