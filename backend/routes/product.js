import express from "express";
import * as ProductController from "../controllers/product";

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   Product:
 *    type: object
 *    properties:
 *      id:
 *        type: string
 *        description: The auto-generated id of the product
 *      title:
 *        type: string
 *        description: the name of product
 *      desc:
 *        type: string
 *        description: the description
 *      price:
 *        type: number
 *        description: the price
 *      category:
 *          type: string
 *          description: the category
 *    example:
 *      id: _fdakfakhfa
 *      name: Product A
 *      description: Mo ta san pham
 *      price: 200
 */

router.get("/products", ProductController.getAllProduct);
router.post("/product", ProductController.createProduct);
router.delete("/product/:id", ProductController.deleteProduct);

export default router;
