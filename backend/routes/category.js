import express from "express";
import * as CategoryController from "../controllers/category";

const router = express.Router();

// /**
//  * @swagger
//  * components:
//  *  schemas:
//  *   Category:
//  *    type: object
//  *    properties:
//  *      id:
//  *        type: string
//  *        description: The auto-generated id of the product
//  *      name:
//  *        type: string
//  *        description: the name of product
//  *    example:
//  *      id: _fdakfakhfa
//  *      name: Category A
//  */
// /**
//  * @swagger
//  *  /category:
//  *  get:
//  *   description:get all category
//  *      response:
//  *      '200':
//  *      description:Sucsessfully response
//  *
//  */
router.get("/category", CategoryController.getAllCategory);

router.post("/category", CategoryController.createCategory);

export default router;
