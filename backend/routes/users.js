import express from "express";
import * as UserController from "../controllers/users";

const router = express.Router();

router.route("/users").get(UserController.getAllUsers);

router.route("/userInfo").get(UserController.getUserInfo);

router.route("/login").post(UserController.loginAuthen);

router.route("/register").post(UserController.registerAuthen);

export default router;
