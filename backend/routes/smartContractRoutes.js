import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
} from "../controllers/smartContractControllers.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/getById/:id", getProductById);
router.post("/", createProduct);

export default router;
