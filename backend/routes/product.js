const express = require('express');
const { getAllProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/product');

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


router.route('/products').get(getAllProduct)
router.route('/product').post(createProduct)
router.route('/product/:id').put(updateProduct).delete(deleteProduct)




module.exports = router