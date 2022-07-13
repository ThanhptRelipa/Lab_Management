const express = require("express");
const {
  getAllUsers,
  createUser,
  loginAuthen,
  logoutAuthen,
  authenToken,
} = require("../controllers/users");
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
router.route("/users").get(authenToken, getAllUsers);

router.route("/users").post(createUser);

router.route("/login").post(loginAuthen);

router.route("/logout").post(logoutAuthen);

module.exports = router;